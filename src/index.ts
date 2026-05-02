/**
 * F&B Content Engine — OpenClaw Plugin Entry
 *
 * This is the runtime entry point that makes git-plugin-amc work
 * as a native OpenClaw plugin. It replaces the declarative HOOK.md
 * approach with programmatic hooks that OpenClaw can actually execute.
 *
 * Key hooks:
 * - gateway_start       → merge SOUL.md.template into workspace SOUL.md (if not already present)
 * - session_start       → detect {{PLACEHOLDER}} → trigger Bootstrap onboarding interview
 * - before_prompt_build → inject onboarding context (Bootstrap) OR credential check (normal ops)
 * - agent_end           → log Bootstrap completion status
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
      if (missing.length === 0) return;

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
