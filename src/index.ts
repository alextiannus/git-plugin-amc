/**
 * F&B Content Engine — OpenClaw Plugin Entry
 *
 * This is the runtime entry point that makes git-plugin-amc work
 * as a native OpenClaw plugin. It replaces the declarative HOOK.md
 * approach with programmatic hooks that OpenClaw can actually execute.
 *
 * Key hooks:
 * - gateway_start       → merge SOUL.md.template + register all 22 cron schedules
 * - session_start       → detect {{PLACEHOLDER}} → trigger Bootstrap onboarding interview
 * - before_prompt_build → inject onboarding context (Bootstrap) OR credential check (normal ops)
 * - agent_end           → log Bootstrap / credential completion status
 *
 * Schedule registration:
 * - All 22 tasks from skills/operations/cron-jobs.md are registered programmatically
 * - Tasks are suspended automatically by OpenClaw when Bootstrap Mode is active
 * - api.registerSchedule() is idempotent — safe to call on every gateway_start
 */

import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";
import { readFileSync, writeFileSync, existsSync, appendFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// ── Constants ──────────────────────────────────────────────────
const PLUGIN_ID = "git-plugin-amc";
const SOUL_TEMPLATE_FILE = "SOUL.md.template";
const ONBOARDING_FLOW_FILE = "bootstrap/onboarding-flow/SKILL.md";
const MCP_SETUP_SKILL_FILE = "skills/operations/mcp-setup/SKILL.md";
const PLACEHOLDER_REGEX = /\{\{[A-Z_]+\}\}/g;

// Platforms handled by PostFast MCP (unified publishing)
const POSTFAST_PLATFORMS = new Set([
  "instagram", "facebook", "tiktok", "youtube", "x", "threads", "linkedin",
]);
// Platforms handled by GBP MCP (Google Business Profile)
const GBP_PLATFORMS = new Set(["googlemap"]);

// ── Cron Schedule Definitions ──────────────────────────────────
// Source of truth: skills/operations/cron-jobs.md
// Cron format: minute hour dom month dow (standard 5-field, UTC)
// Registered programmatically — no manual setup required.
// api.registerSchedule() is idempotent: safe to call on every gateway_start.
// Note: three Monday-09:00 tasks are offset by 5 min to avoid collision.
const SCHEDULE = [
  // ── Daily ──────────────────────────────────────────────────
  {
    cron: "0 8 * * *",
    task: "topic-discovery",
    prompt:
      "执行 topic-discovery：基于今日 Trending Radar 结果，为品牌选出 1–2 个最契合的话题，起草今日内容创作方向，记录到 vault postschedule.md。",
  },
  {
    cron: "0 10 * * *",
    task: "google-maps-actions",
    prompt:
      "执行 google-maps-actions：检查 Google Business Profile 新评论，按品牌 voice 回复所有未回复评论（24h SLA），发布今日 GBP 帖子（如有排期）。",
  },
  {
    cron: "0 11 * * *",
    task: "lunch-publish-window",
    prompt:
      "执行 lunch-publish-window：发布今日午餐时段内容（Instagram 主帖 / Stories / Facebook），确认发布成功，记录到 postschedule.md。",
  },
  {
    cron: "0 13 * * *",
    task: "lunch-snapshot",
    prompt:
      "执行 lunch-snapshot：抓取今日午餐帖子发布后 2 小时的初始数据（likes、reach、comments），记录到 vault report 文件夹。",
  },
  {
    cron: "0 17 * * *",
    task: "dinner-publish-window",
    prompt:
      "执行 dinner-publish-window：发布今日晚餐时段内容（Instagram Reels / TikTok / Facebook），确认发布成功，记录到 postschedule.md。",
  },
  {
    cron: "0 19 * * *",
    task: "dinner-snapshot",
    prompt:
      "执行 dinner-snapshot：抓取今日晚餐帖子发布后 2 小时的初始数据，记录到 vault report 文件夹。",
  },
  {
    cron: "0 20 * * *",
    task: "comment-dm-reply",
    prompt:
      "执行 comment-dm-reply：检查所有平台的新评论和私信，按品牌 voice 回复，重点处理带问题或投诉的评论，记录无法处理的问题到 ownerreview.md。",
  },
  // ── Weekly ─────────────────────────────────────────────────
  {
    cron: "30 6 * * 1,4",
    task: "trending-radar-refresh",
    prompt:
      "执行 trending-radar-refresh：打开共享 Trending Radar 文档，搜索近期热门话题（美食、餐厅、本地生活），更新 Top 5 趋势条目，为内容生产做好素材准备。",
  },
  {
    cron: "0 8 * * 1",
    task: "self-improvement-report",
    prompt:
      "执行 self-improvement-report：回顾上周内容表现，并对本周 AI 运营质量做自我评估（准时率、内容质量、合规情况），总结学习点，更新 feedback-loop 文件，提出下周内容优化建议和改进行动项。",
  },
  {
    cron: "0 9 * * 1",
    task: "plugin-version-check",
    prompt:
      "执行 plugin-version-check：检查 git-plugin-amc 是否有新版本可用（openclaw plugins check git-plugin-amc），如有新版本通过 Lark 通知品牌团队。",
  },
  {
    cron: "5 9 * * 1",
    task: "pending-platform-reminder",
    prompt:
      "执行 pending-platform-reminder：检查 SOUL.md 中的 pending_platforms 列表，如非空则通过 Lark 提醒品牌团队连接剩余平台账号。",
  },
  {
    cron: "10 9 * * 1",
    task: "allergen-pending-check",
    prompt:
      "执行 allergen-pending-check：检查 allergen-gate.md 中是否有标记为 PENDING 的菜品，如有则通过 Lark 请品牌确认过敏原信息。",
  },
  {
    cron: "0 10 * * 1",
    task: "weekly-report",
    prompt:
      "执行 weekly-report：生成上周完整运营报告（内容数量、互动率、最佳帖子、平台对比、下周计划），保存到 vault report 文件夹，通过 Lark 发送给品牌团队。",
  },
  {
    cron: "0 18 * * 5",
    task: "weekly-performance-review",
    prompt:
      "执行 weekly-performance-review：对本周所有帖子做绩效复盘，找出 Top 3 和 Bottom 3，分析原因，更新内容策略建议。",
  },
  {
    cron: "0 20 * * 0",
    task: "weekly-content-batch",
    prompt:
      "执行 weekly-content-batch：为下一周生成内容批次草稿（7天内容日历，涵盖所有 active 平台），存入 vault postschedule.md，通过 Lark 通知品牌团队审阅。",
  },
  // ── Monthly ────────────────────────────────────────────────
  {
    cron: "0 10 1 * *",
    task: "monthly-report",
    prompt:
      "执行 monthly-report：生成上月完整运营月报（KPI 达成、内容总量、各平台表现、粉丝增长、最佳内容精选），保存到 vault report，通过 Lark 发送给品牌团队。",
  },
  {
    cron: "5 10 1 * *",
    task: "compliance-review",
    prompt:
      "执行 compliance-review：审查上月所有发布内容是否符合 fda-ftc-rules 和平台政策，记录任何合规风险，建议下月注意事项。",
  },
  {
    cron: "10 10 1 * *",
    task: "voice-drift-check",
    prompt:
      "执行 voice-drift-check：随机抽取 5 篇上月内容，对比 brand-voice.md 定义的品牌声音，检测是否出现语气漂移，提出校正建议，更新品牌声音记录。",
  },
  {
    cron: "15 10 1 * *",
    task: "kpi-reset",
    prompt:
      "执行 kpi-reset：重置本月 KPI 追踪计数器，在 vault report 文件夹创建新月份报告文件，确认本月内容日历和发布计划就位。",
  },
] as const;

// Plugin root = one level above dist/ where this file compiles to
// e.g. ~/.openclaw/extensions/git-plugin-amc/dist/index.js → plugin root is ../
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

function hasPlaceholders(soulContent: string): boolean {
  const blockStart = soulContent.indexOf("PLUGIN · git-plugin-amc");
  if (blockStart === -1) return false;
  const section = soulContent.slice(blockStart);
  PLACEHOLDER_REGEX.lastIndex = 0;
  return PLACEHOLDER_REGEX.test(section);
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

  // Include STARTUP BEHAVIOR section if it comes before the block
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
  // Use __dirname-based path — this is always correct regardless of workspaceDir.
  // When OpenClaw loads dist/index.js, PLUGIN_ROOT resolves to the plugin install dir.
  if (existsSync(PLUGIN_ROOT)) return PLUGIN_ROOT;
  // Fallback: standard install path
  return join(process.env.HOME || "/", ".openclaw", "extensions", PLUGIN_ID);
}

function loadOnboardingFlow(pluginDir: string): string | null {
  const flowPath = join(pluginDir, ONBOARDING_FLOW_FILE);
  if (!existsSync(flowPath)) return null;
  return readFileSync(flowPath, "utf-8");
}

// ── Credential Check Helpers ──────────────────────────────────

function readOpenclawConfig(workspaceDir: string): Record<string, unknown> {
  const candidates = [
    join(workspaceDir, "openclaw.json"),
    join(process.env.HOME || "/", ".openclaw", "openclaw.json"),
  ];
  for (const p of candidates) {
    if (existsSync(p)) {
      try {
        return JSON.parse(readFileSync(p, "utf-8")) as Record<string, unknown>;
      } catch {
        return {};
      }
    }
  }
  return {};
}

function extractActivePlatforms(soulContent: string): string[] {
  // Match: active_platforms:  [instagram, facebook] or ["instagram", "facebook"]
  const match = soulContent.match(/active_platforms:\s*\[([^\]]*)\]/);
  if (!match || !match[1].trim()) return [];
  return match[1]
    .split(",")
    .map((p) => p.trim().replace(/["']/g, ""))
    .filter(Boolean);
}

type MissingCredential = {
  tool: "postfast" | "gbp";
  reason: string;
  platforms: string[];
  hint: string;
};

function checkMissingCredentials(
  workspaceDir: string,
  soulContent: string
): MissingCredential[] {
  const activePlatforms = extractActivePlatforms(soulContent);
  if (activePlatforms.length === 0) return [];

  const config = readOpenclawConfig(workspaceDir);
  const mcp = (config["mcp"] as Record<string, unknown>) || {};
  const missing: MissingCredential[] = [];

  // Check PostFast API key
  const postfastPlatforms = activePlatforms.filter((p) => POSTFAST_PLATFORMS.has(p));
  if (postfastPlatforms.length > 0) {
    const postfastConfig = mcp["postfast"] as Record<string, unknown> | undefined;
    const env = postfastConfig?.["env"] as Record<string, string> | undefined;
    const apiKey = env?.["POSTFAST_API_KEY"];
    if (!apiKey) {
      missing.push({
        tool: "postfast",
        reason: "POSTFAST_API_KEY 未配置 — 这些平台无法自动发布",
        platforms: postfastPlatforms,
        hint: "获取方式：postfa.st → Settings → API Keys（以 pk_ 或 sk_ 开头）\nHow to get: postfa.st → Settings → API Keys (starts with pk_ or sk_)",
      });
    }
  }

  // Check GBP Location ID
  const gbpPlatforms = activePlatforms.filter((p) => GBP_PLATFORMS.has(p));
  if (gbpPlatforms.length > 0) {
    const gbpConfig = mcp["gbp"] as Record<string, unknown> | undefined;
    const env = gbpConfig?.["env"] as Record<string, string> | undefined;
    const locationId = env?.["GBP_LOCATION_ID"];
    if (!locationId) {
      missing.push({
        tool: "gbp",
        reason: "GBP_LOCATION_ID 未配置 — Google Maps 评论回复和发帖无法自动执行",
        platforms: gbpPlatforms,
        hint: "获取方式：Google Business Profile 后台 → 商家资料 URL 中的数字 ID\nFormat: accounts/{accountId}/locations/{locationId}",
      });
    }
  }

  return missing;
}

function buildCredentialCheckMessage(missing: MissingCredential[]): string {
  const postfastMissing = missing.find((m) => m.tool === "postfast");
  const gbpMissing = missing.find((m) => m.tool === "gbp");

  const larkLines: string[] = [
    "⚠️ 发现平台账号未连接 / Platform credentials missing",
    "",
  ];

  if (postfastMissing) {
    larkLines.push(
      `📱 PostFast API Key 缺失`,
      `   影响平台 / Platforms affected: ${postfastMissing.platforms.join(", ")}`,
      `   ${postfastMissing.hint}`,
      ""
    );
  }

  if (gbpMissing) {
    larkLines.push(
      `🗺️ Google Business Profile ID 缺失`,
      `   影响平台 / Platforms affected: Google Maps`,
      `   ${gbpMissing.hint}`,
      ""
    );
  }

  larkLines.push(
    "请把对应的 key / ID 发给我，我来帮你立即配置并重新连接。",
    "Please send me the API key / Location ID and I'll configure it right away."
  );

  return larkLines.join("\n");
}

function loadMcpSetupSkill(pluginDir: string): string | null {
  const skillPath = join(pluginDir, MCP_SETUP_SKILL_FILE);
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

function extractBrandSlug(soulContent: string): string {
  const match = soulContent.match(/brand_slug:\s*"?([^"\n]+)"?/);
  return match ? match[1].trim().replace(/["']/g, "") : "brand";
}

function logUpdateToVault(workspaceDir: string, soulContent: string, entry: string): void {
  const brandSlug = extractBrandSlug(soulContent);
  const candidates = [
    join(workspaceDir, `vault-${brandSlug}`, "brand", "ownerreview.md"),
    join(workspaceDir, "vault", "brand", "ownerreview.md"),
  ];
  for (const p of candidates) {
    if (existsSync(p)) {
      appendFileSync(p, entry, "utf-8");
      return;
    }
  }
  // If vault doesn't exist locally yet, log to workspace root as fallback
  const fallback = join(workspaceDir, "plugin-update.log");
  appendFileSync(fallback, entry, "utf-8");
}

// ── Plugin Entry ───────────────────────────────────────────────
export default definePluginEntry({
  id: PLUGIN_ID,
  name: "F&B Content Engine",
  description:
    "Social media operations plugin for F&B brands — 7 platforms, bilingual, compliance gates, automated reporting, self-configuring onboarding.",

  register(api) {
    // ── gateway_start: Merge SOUL.md.template on first startup ──────────
    api.on("gateway_start", async (_event, ctx) => {
      const workspaceDir = ctx.workspaceDir || process.cwd();
      const pluginDir = resolvePluginDir(workspaceDir);

      if (!existsSync(pluginDir)) {
        console.warn(`[${PLUGIN_ID}] Plugin directory not found: ${pluginDir}`);
        return;
      }

      const soulPath = resolveSoulPath(workspaceDir);
      const result = mergeSoulTemplate(soulPath, pluginDir);
      console.log(`[${PLUGIN_ID}] SOUL.md merge: ${result.reason}`);

      if (result.merged) {
        console.log(
          `[${PLUGIN_ID}] ✅ SOUL.md.template merged. Bootstrap Mode will activate on next session.`
        );
      }

      // ── Register all 22 cron schedules ───────────────────────────────
      // Idempotent — safe to call on every gateway_start.
      // OpenClaw suspends tasks automatically while Bootstrap Mode is active.
      api.registerSchedule([...SCHEDULE]);
      console.log(
        `[${PLUGIN_ID}] ✅ Registered ${SCHEDULE.length} scheduled tasks (daily/weekly/monthly)`
      );
    });

    // ── session_start: Detect Bootstrap Mode or missing credentials ──────
    api.on("session_start", async (_event, ctx) => {
      const workspaceDir = ctx.workspaceDir || process.cwd();
      const soulPath = resolveSoulPath(workspaceDir);

      if (!existsSync(soulPath)) return;

      const soulContent = readFileSync(soulPath, "utf-8");
      if (!hasPluginBlock(soulContent)) return;

      if (hasPlaceholders(soulContent)) {
        console.log(
          `[${PLUGIN_ID}] 🔔 Bootstrap Mode detected — {{PLACEHOLDER}} found in SOUL.md`
        );
      } else {
        // Check for missing MCP credentials in normal ops mode
        const missing = checkMissingCredentials(workspaceDir, soulContent);
        if (missing.length > 0) {
          console.log(
            `[${PLUGIN_ID}] ⚠️ Missing credentials: ${missing.map((m) => m.tool).join(", ")} — agent will request via Lark`
          );
        } else {
          console.log(`[${PLUGIN_ID}] ✅ Brand config complete — all credentials present — normal operations`);
        }
      }
    });

    // ── before_prompt_build: Inject context for Bootstrap OR credential check
    api.on("before_prompt_build", async (_event, ctx) => {
      const workspaceDir = ctx.workspaceDir || process.cwd();
      const soulPath = resolveSoulPath(workspaceDir);

      if (!existsSync(soulPath)) return;

      const soulContent = readFileSync(soulPath, "utf-8");
      if (!hasPluginBlock(soulContent)) return;

      // ── Path A: Bootstrap Mode ──────────────────────────────────────────
      if (hasPlaceholders(soulContent)) {
        const pluginDir = resolvePluginDir(workspaceDir);
        const onboardingFlow = loadOnboardingFlow(pluginDir);
        if (!onboardingFlow) return;

        return {
          appendSystemContext: [
            "## 🔔 F&B Content Engine — Bootstrap Mode Active",
            "",
            "The SOUL.md contains unfilled {{PLACEHOLDER}} values. You MUST conduct the onboarding interview NOW.",
            "Follow the onboarding flow script below EXACTLY. Send the Opening Message + Q1 immediately.",
            "Do NOT summarize the plugin or explain what it does — just start the interview.",
            "",
            "### Onboarding Flow Script",
            onboardingFlow,
          ].join("\n"),
        };
      }

      // ── Path B: Normal Ops — check for missing MCP credentials ─────────
      const missing = checkMissingCredentials(workspaceDir, soulContent);
      if (missing.length === 0) {
        return {
          appendSystemContext: [
            "## 🧠 Core Operational Directive (Never Forget)",
            "",
            "You are operating strictly under the AMC (Agent-Machine Collaboration) framework. You MUST adhere to the following rules in every task:",
            "1. **AMC Kanban Integration**: ALWAYS consult your AMC Kanban board for content management and task assignment. You must log the completion of your operational tasks to the Kanban board.",
            "2. **Skill Execution**: Follow AMC's documented skill procedures precisely. Do not invent your own workflows.",
            "3. **Publishing via PostFast**: ALL cross-platform publishing MUST be executed by calling the `postfast` MCP tool natively. Do not simulate publishing, and do not use generic HTTP requests if the tool is available.",
          ].join("\n"),
        };
      }

      // Load mcp-setup skill for the agent to reference
      const pluginDir = resolvePluginDir(workspaceDir);
      const mcpSetupSkill = loadMcpSetupSkill(pluginDir);

      const larkMessage = buildCredentialCheckMessage(missing);
      const missingList = missing
        .map((m) => `- **${m.tool.toUpperCase()}** (${m.platforms.join(", ")}): ${m.reason}`)
        .join("\n");

      return {
        appendSystemContext: [
          "## ⚠️ F&B Content Engine — Missing Platform Credentials",
          "",
          "The following MCP credentials are not configured in openclaw.json:",
          missingList,
          "",
          "**ACTION REQUIRED (execute immediately):**",
          "1. Send the following message to the brand team via `mcp.lark.message` RIGHT NOW:",
          "2. Wait for the team to reply with the API key / Location ID",
          "3. Once received, follow the mcp-setup skill procedures to configure and reload",
          "4. Do NOT run any cron jobs or platform operations until credentials are configured",
          "",
          "### Lark Message to Send NOW:",
          "```",
          larkMessage,
          "```",
          "",
          "### After receiving credentials — follow these procedures:",
          mcpSetupSkill
            ? mcpSetupSkill
            : "See: skills/operations/mcp-setup/SKILL.md",
        ].join("\n"),
      };
    });

    // ── post_update: Confirm update via Lark + log to vault ──────────────
    // Fired by OpenClaw after `openclaw plugins update` or `./update.sh` succeeds.
    // The event payload contains oldVersion / newVersion injected by OpenClaw.
    api.on("post_update", async (event: Record<string, unknown>, ctx) => {
        const workspaceDir = ctx.workspaceDir || process.cwd();
        const pluginDir = resolvePluginDir(workspaceDir);

        const oldVersion = (event["oldVersion"] as string | undefined) ?? "previous";
        const newVersion = (event["newVersion"] as string | undefined) ?? readPluginVersion(pluginDir);
        const changelog  = (event["changelog"]  as string | undefined) ?? "";

        console.log(`[${PLUGIN_ID}] ✅ Updated: ${oldVersion} → ${newVersion}`);

        // Write to vault log
        const soulPath = resolveSoulPath(workspaceDir);
        const soulContent = existsSync(soulPath) ? readFileSync(soulPath, "utf-8") : "";
        const date = new Date().toISOString().split("T")[0];
        logUpdateToVault(
          workspaceDir,
          soulContent,
          `\n[${date}] Plugin updated: ${oldVersion} → ${newVersion}\n`
        );

        // Inject Lark confirmation context for the agent to send
        const changelogSection = changelog
          ? `\n更新内容 / What's new:\n${changelog}\n`
          : "";

        return {
          appendSystemContext: [
            "## ✅ F&B Content Engine — Plugin Updated Successfully",
            "",
            `Plugin has been updated from **${oldVersion}** to **${newVersion}**.`,
            "",
            "Send the following confirmation message via `mcp.lark.message` immediately:",
            "```",
            `✅ 插件已成功更新 / Plugin updated successfully`,
            ``,
            `版本 / Version: ${oldVersion} → ${newVersion}`,
            changelogSection,
            `更新内容 / Updated: 技能文件、合规规则、平台策略、定时任务`,
            `Skill files, compliance rules, platform policies, cron schedule`,
            ``,
            `🔒 品牌定制文件未变动 / Brand files untouched:`,
            `   brand-voice · allergen-gate · bilingual-gate`,
            ``,
            `✅ 所有定时任务已恢复运行 / All scheduled tasks resumed`,
            "```",
            "",
            "After sending: resume normal operations — no restart required.",
          ].join("\n"),
        };
    });

    // ── agent_end: Log Bootstrap status ──────────────────────────────────
    api.on("agent_end", async (_event, ctx) => {
      const workspaceDir = ctx.workspaceDir || process.cwd();
      const soulPath = resolveSoulPath(workspaceDir);

      if (!existsSync(soulPath)) return;

      const soulContent = readFileSync(soulPath, "utf-8");
      if (!hasPluginBlock(soulContent)) return;

      if (hasPlaceholders(soulContent)) {
        console.log(
          `[${PLUGIN_ID}] ⚠️ Session ended with Bootstrap still incomplete — {{PLACEHOLDER}} remain`
        );
      } else {
        const missing = checkMissingCredentials(workspaceDir, soulContent);
        if (missing.length > 0) {
          console.log(
            `[${PLUGIN_ID}] ⚠️ Session ended with missing credentials: ${missing.map((m) => m.tool).join(", ")}`
          );
        } else {
          console.log(`[${PLUGIN_ID}] ✅ All config complete — Bootstrap done, all credentials present`);
        }
      }
    });
  },
});
