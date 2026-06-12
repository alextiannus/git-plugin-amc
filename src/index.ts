/**
 * F&B Content Engine — OpenClaw Plugin Entry
 *
 * This is the runtime entry point that makes git-plugin-amc work
 * as a native OpenClaw plugin. It replaces the declarative HOOK.md
 * approach with programmatic hooks that OpenClaw can actually execute.
 *
 * Key hooks:
 * - gateway_start       → merge SOUL.md.template + register all 20 cron schedules
 * - before_prompt_build → check Kanban API key & inject kanban-integration skills
 * - post_update         → send update notification via Lark
 *
 * Schedule registration:
 * - 20 tasks registered programmatically (Daily×8, Weekly×8, Monthly×4)
 * - api.registerSchedule() is idempotent — safe to call on every gateway_start
 */

import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";
import { readFileSync, writeFileSync, existsSync, appendFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// ── Constants ──────────────────────────────────
const PLUGIN_ID = "git-plugin-amc";
const SOUL_TEMPLATE_FILE = "SOUL.md.template";
const KANBAN_SKILL_PATH = "skills/operations/kanban-integration/SKILL.md";
const API_KEY_PLACEHOLDER = "{{AMC_KANBAN_API_KEY}}";

// Mandatory runtime fallback rule appended to execution prompts.
const FALLBACK_RULE_PROMPT =
  " 如遇 API 调用无法完成任务，必须立即调用 skills/operations/fallback-execution/SKILL.md，切换到其他 skill（含浏览器自动化/RPA）继续执行，并把失败原因、切换路径和结果证据写回 Kanban 任务。";

function withFallback(prompt: string): string {
  return prompt + FALLBACK_RULE_PROMPT;
}

// ── Cron Schedule Definitions ──────────────────────────────────
// Source of truth: skills/operations/cron-jobs.md
// Cron format: minute hour dom month dow (standard 5-field, UTC)
// Registered programmatically — no manual setup required.
// Total: 20 tasks (Daily×8, Weekly×8, Monthly×4)
const SCHEDULE = [
  // ── Daily ──────────────────────────────────────────────────
  {
    cron: "0 7 * * *",
    task: "daily-kanban-sync",
    prompt:
      withFallback(
        "执行 daily-kanban-sync：首先调用 get_brand_config 获取关联的所有品牌。对每个品牌，调用 list_tasks(status: 'todo', assignedToMe: true) 获取指派给你的当日任务，梳理今日工作流程，并在对应的 Kanban 任务中更新状态为 in_progress。"
      ),
  },
  {
    cron: "0 8 * * *",
    task: "topic-discovery",
    prompt:
      withFallback(
        "执行 topic-discovery：遍历所有关联品牌，获取其定位与上下文。调用 board_list_topics 获取今日热点话题推荐，并为每个品牌选出最契合的话题方向，调用 board_save_topic 保存话题，起草内容大纲并保存为看板草稿。"
      ),
  },
  {
    cron: "0 10 * * *",
    task: "google-maps-actions",
    prompt:
      withFallback(
        "执行 google-maps-actions：遍历所有品牌，调用 google_get_reviews 获取最新的 Google 评论，按品牌 voice 回复所有未回复的评论。如遇恶意/紧急差评，在看板中创建待办任务并标记为 pending 状态。"
      ),
  },
  {
    cron: "0 11 * * *",
    task: "lunch-publish-window",
    prompt:
      withFallback(
        "执行 lunch-publish-window：发布今日午餐时段内容。遍历关联品牌，调用 board_list_drafts 获取当前时段已排期的草稿。开始执行时，先将对应的 Kanban 任务状态更新为 in_progress。调用 publish / board_publish_content 提交发布。确认发布成功后，将对应的 Kanban 任务状态更新为 done。"
      ),
  },
  {
    cron: "0 13 * * *",
    task: "lunch-snapshot",
    prompt:
      withFallback(
        "执行 lunch-snapshot：回采集度数据。遍历所有品牌，抓取今日午餐帖子发布后 2 小时的初始数据（likes、reach、comments），并更新到看板内容草稿对应的指标记录中。"
      ),
  },
  {
    cron: "0 17 * * *",
    task: "dinner-publish-window",
    prompt:
      withFallback(
        "执行 dinner-publish-window：发布今日晚餐时段内容。遍历关联品牌，调用 board_list_drafts 获取当前时段已排期的草稿。开始执行时，先将对应的 Kanban 任务状态更新为 in_progress。调用 publish / board_publish_content 提交发布。确认发布成功后，将对应的 Kanban 任务状态更新为 done。"
      ),
  },
  {
    cron: "0 19 * * *",
    task: "dinner-snapshot",
    prompt:
      withFallback(
        "执行 dinner-snapshot：回采集度数据。遍历所有品牌，抓取今日晚餐帖子发布后 2 小时的初始数据，更新至看板指标元数据。"
      ),
  },
  {
    cron: "0 20 * * *",
    task: "comment-dm-reply",
    prompt:
      withFallback(
        "执行 comment-dm-reply：遍历所有品牌账号，检查各平台的新评论和私信，按品牌 voice 回复。重点处理带问题或投诉的评论，如无法处理则自动在看板创建待人类介入的 pending 任务。"
      ),
  },
  // ── Weekly ─────────────────────────────────────────────────
  {
    cron: "30 6 * * 1,4",
    task: "trending-radar-refresh",
    prompt:
      withFallback(
        "执行 trending-radar-refresh：遍历所有品牌，通过 board_list_topics 搜索行业近期热门话题（美食、餐厅、本地生活），为内容生产和话题雷达做好素材积累。"
      ),
  },
  {
    cron: "0 8 * * 1",
    task: "self-improvement-report",
    prompt:
      withFallback(
        "执行 self-improvement-report：遍历所有品牌，回顾上周内容表现，并对本周 AI 运营质量做自我评估，总结学习点，撰写自我评估总结并上传至该品牌 Lark 云盘下的 report 文件夹。"
      ),
  },
  {
    cron: "0 9 * * 1",
    task: "plugin-version-check",
    prompt:
      withFallback(
        "执行 plugin-version-check：检查 git-plugin-amc 是否有新版本可用（openclaw plugins check git-plugin-amc），如有新版本通过 Lark 通知各品牌团队。"
      ),
  },
  {
    cron: "5 9 * * 1",
    task: "pending-platform-reminder",
    prompt:
      withFallback(
        "执行 pending-platform-reminder：遍历所有品牌，检查其账号列表中尚未授权/连接的渠道。通过 Lark 发送卡片提醒品牌团队连接剩余平台账号。"
      ),
  },
  {
    cron: "10 9 * * 1",
    task: "allergen-pending-check",
    prompt:
      withFallback(
        "执行 allergen-pending-check：检查各品牌在看板里的过敏原对照清单，如果存在未确认的菜品，通过 Lark 请品牌所有者予以确认。"
      ),
  },
  {
    cron: "0 10 * * 1",
    task: "weekly-report",
    prompt:
      withFallback(
        "执行 weekly-report：遍历所有品牌，汇总上周运营表现数据，自动排版为周报 markdown 报告，调用 lark_upload_file 保存到品牌的 Lark Drive，并通过 Lark 消息通知各团队。"
      ),
  },
  {
    cron: "0 18 * * 5",
    task: "weekly-performance-review",
    prompt:
      withFallback(
        "执行 weekly-performance-review：遍历所有品牌，复盘本周所有帖子的绩效指标，提取 Top 与 Bottom 案例，将结果总结存入看板归档。"
      ),
  },
  {
    cron: "0 20 * * 0",
    task: "weekly-content-batch",
    prompt:
      withFallback(
        "执行 weekly-content-batch：遍历所有品牌，为其生成下一周的内容草稿批次（7天内容日历，涵盖所有 active 平台）。调用 board_save_draft 保存为草稿并调用 board_submit_draft 提交，然后通过 Lark 通知各品牌团队进行审阅。"
      ),
  },
  // ── Monthly ────────────────────────────────────────────────
  {
    cron: "0 10 1 * *",
    task: "monthly-report",
    prompt:
      withFallback(
        "执行 monthly-report：遍历所有品牌，生成上月完整运营月报（包括各平台表现、最佳内容分析），排版为报告文档并调用 lark_upload_file 保存到品牌云盘，并发送 Lark 消息给各团队。"
      ),
  },
  {
    cron: "5 10 1 * *",
    task: "compliance-review",
    prompt:
      withFallback(
        "执行 compliance-review：遍历品牌，审查上月所有发布的内容是否出现合规漏洞或侵权指控风险，整理合规报告保存至品牌云盘。"
      ),
  },
  {
    cron: "10 10 1 * *",
    task: "voice-drift-check",
    prompt:
      withFallback(
        "执行 voice-drift-check：遍历品牌，抽取部分已发布内容比对看板中定义的 brand-voice，检测是否偏离品牌调性，形成月度语气漂移分析并记录。"
      ),
  },
  {
    cron: "15 10 1 * *",
    task: "kpi-reset",
    prompt:
      withFallback(
        "执行 kpi-reset：遍历所有品牌，重置本月的 KPI 基础追踪指标，准备新月份的数据分析与跟踪框架。"
      ),
  },
] as const;

const PLUGIN_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// ── Helpers ────────────────────────────────────────────────────
function resolveSoulPath(workspaceDir: string): string {
  const candidates = [
    join(workspaceDir, "SOUL.md"),
    process.env.OPENCLAW_SOUL_PATH ? join(process.env.OPENCLAW_SOUL_PATH, "SOUL.md") : "",
    join(process.env.HOME || "/", ".openclaw", "workspace", "SOUL.md"),
  ].filter(Boolean);

  for (const p of candidates) {
    if (existsSync(p as string)) return p as string;
  }

  const defaultPath = join(workspaceDir, "SOUL.md");
  writeFileSync(defaultPath, "# SOUL.md\n", "utf-8");
  return defaultPath;
}

function hasPluginBlock(soulContent: string): boolean {
  return (
    soulContent.includes("PLUGIN · git-plugin-amc") ||
    soulContent.includes("plugins.git-plugin-amc:")
  );
}

function hasUnconfiguredApiKey(soulContent: string): boolean {
  return soulContent.includes(API_KEY_PLACEHOLDER);
}

function extractPluginBlock(pluginDir: string): string {
  const templatePath = join(pluginDir, SOUL_TEMPLATE_FILE);
  if (!existsSync(templatePath)) {
    throw new Error(`SOUL.md.template not found at ${templatePath}`);
  }

  const template = readFileSync(templatePath, "utf-8");

  const startupMarker = "## STARTUP BEHAVIOR — F&B Content Engine";
  const blockMarker = "## PLUGIN · git-plugin-amc";

  const startupStart = template.indexOf(startupMarker);
  const blockStart = template.indexOf(blockMarker);

  if (blockStart === -1) {
    throw new Error("SOUL.md.template missing '## PLUGIN · git-plugin-amc' section");
  }

  const extractFrom =
    startupStart !== -1 && startupStart < blockStart ? startupStart : blockStart;

  return template.slice(extractFrom);
}

function mergeSoulTemplate(
  soulPath: string,
  pluginDir: string
): { merged: boolean; reason: string } {
  const soulContent = readFileSync(soulPath, "utf-8");

  if (hasPluginBlock(soulContent)) {
    return {
      merged: false,
      reason: "Plugin block already exists in SOUL.md — skipped to preserve existing config",
    };
  }

  const pluginBlock = extractPluginBlock(pluginDir);
  const separator = "\n\n---\n\n";
  appendFileSync(soulPath, separator + pluginBlock + "\n", "utf-8");

  return { merged: true, reason: "Plugin block merged into SOUL.md" };
}

function resolvePluginDir(_workspaceDir: string): string {
  if (existsSync(PLUGIN_ROOT)) {
    return PLUGIN_ROOT;
  }
  const fallback = join(process.env.HOME || "/", ".openclaw", "extensions", PLUGIN_ID);
  return fallback;
}

function loadKanbanSkill(pluginDir: string): string | null {
  const skillPath = join(pluginDir, KANBAN_SKILL_PATH);
  if (!existsSync(skillPath)) return null;
  return readFileSync(skillPath, "utf-8");
}

function readPluginVersion(pluginDir: string): string {
  const yamlPath = join(pluginDir, "plugin.yaml");
  if (!existsSync(yamlPath)) return "unknown";
  const content = readFileSync(yamlPath, "utf-8");
  const match = content.match(/^version:\s*"?([^"\n]+)"?/m);
  return match ? match[1].trim() : "unknown";
}

// ── Plugin Entry ───────────────────────────────────────────────
export default definePluginEntry({
  id: PLUGIN_ID,
  name: "F&B Content Engine",
  description:
    "Social media operations plugin for F&B brands — multi-brand dynamic kanban-centric integration.",

  register(api) {
    // ── gateway_start: Merge SOUL.md.template on startup ──────────
    api.on("gateway_start", async (_event, ctx) => {
      const workspaceDir = ctx.workspaceDir || process.cwd();
      const pluginDir = resolvePluginDir(workspaceDir);

      if (!existsSync(pluginDir)) {
        console.warn(`[${PLUGIN_ID}] Plugin directory not found: ${pluginDir}`);
        return;
      }

      const soulPath = resolveSoulPath(workspaceDir);

      let mergeResult: { merged: boolean; reason: string };
      try {
        mergeResult = mergeSoulTemplate(soulPath, pluginDir);
      } catch (err) {
        console.error(`[${PLUGIN_ID}] ❌ SOUL.md merge failed:`, err);
        mergeResult = { merged: false, reason: `merge error: ${String(err)}` };
      }
      console.log(`[${PLUGIN_ID}] SOUL.md merge: ${mergeResult.reason}`);

      // ── Register all 20 operational cron schedules ────────────────────
      api.registerSchedule([...SCHEDULE]);
      console.log(`[${PLUGIN_ID}] ✅ Registered ${SCHEDULE.length} scheduled tasks (daily/weekly/monthly)`);
    });

    // ── before_prompt_build: Check API key & Inject kanban-integration skills ───
    api.on("before_prompt_build", async (event: Record<string, unknown>, ctx) => {
      const workspaceDir = ctx.workspaceDir || process.cwd();
      const soulPath = resolveSoulPath(workspaceDir);

      if (!existsSync(soulPath)) return;

      const soulContent = readFileSync(soulPath, "utf-8");
      if (!hasPluginBlock(soulContent)) return;

      const kanbanKeyEnv = process.env.KANBAN_AGENT_API_KEY;
      const keyIsPlaceholder = hasUnconfiguredApiKey(soulContent);

      // If API key is missing both in env and in SOUL.md configuration:
      if (!kanbanKeyEnv && keyIsPlaceholder) {
        return {
          appendSystemContext: [
            "## ⚠️ AMC Content Engine — Config Required ⚠️",
            "",
            "你目前尚未配置 `amc_kanban_api_key`！",
            "无法使用任何 MCP 工具或进行多品牌内容运营。",
            "请立即通过 Lark 消息告知用户：“我需要配置 AMC 看板 API 密钥，请在 SOUL.md 的 amc_kanban_api_key 处填入您的密钥，或者在运行环境中配置 KANBAN_AGENT_API_KEY 环境变量，之后重启网关。”",
            "在收到配置前，拒绝执行任何创作任务。",
          ].join("\n"),
        };
      }

      const pluginDir = resolvePluginDir(workspaceDir);
      const kanbanSkill = loadKanbanSkill(pluginDir);

      return {
        appendSystemContext: [
          "## 🧠 AMC Content Engine — Kanban-Centric Multi-Brand Operating Directives",
          "",
          "所有社交媒体的定位、受众、发布、调度、评论及互动任务，必须通过 AMC 看板执行，且支持同时管理多个品牌。具体工作流与工具使用请严格遵循以下 kanban-integration 技能规范：",
          "",
          kanbanSkill ?? "See: skills/operations/kanban-integration/SKILL.md",
        ].join("\n"),
      };
    });

    // ── post_update: Confirm update via Lark ──────────────
    api.on("post_update", async (event: Record<string, unknown>, ctx) => {
      const workspaceDir = ctx.workspaceDir || process.cwd();
      const pluginDir = resolvePluginDir(workspaceDir);

      const oldVersion = (event["oldVersion"] as string | undefined) ?? "previous";
      const newVersion = (event["newVersion"] as string | undefined) ?? readPluginVersion(pluginDir);
      const changelog  = (event["changelog"]  as string | undefined) ?? "";

      console.log(`[${PLUGIN_ID}] ✅ Updated: ${oldVersion} → ${newVersion}`);

      const changelogSection = changelog
        ? `\n更新内容 / What's new:\n${changelog}\n`
        : "";

      return {
        appendSystemContext: [
          "## ✅ F&B Content Engine — Plugin Updated Successfully",
          "",
          `Plugin has been updated from **${oldVersion}** to **${newVersion}**.`,
          "",
          "Send the following confirmation message via `mcp.lark.message` to all active brand channels:",
          "```",
          `✅ 插件已成功更新至看板直连多品牌版 / Plugin updated successfully`,
          ``,
          `版本 / Version: ${oldVersion} → ${newVersion}`,
          changelogSection,
          `更新内容 / Updated: 技能文件、平台策略、定时任务已全部调整为以 AMC Kanban 为中心的跨品牌运营模式`,
          `All skills and crons updated to Kanban-centric multi-brand operations.`,
          ``,
          `🔒 品牌所有上下文与排期发布均已交由看板托管管理 / All brand context & scheduling managed on Kanban`,
          "```",
          "",
          "After sending: resume normal operations — no restart required.",
        ].join("\n"),
      };
    });
  },
});
