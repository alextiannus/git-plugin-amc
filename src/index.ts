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
 * - before_prompt_build → inject onboarding-flow context when Bootstrap is active
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
const PLACEHOLDER_REGEX = /\{\{[A-Z_]+\}\}/g;

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

    // ── session_start: Detect Bootstrap Mode ─────────────────────────────
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
        console.log(`[${PLUGIN_ID}] ✅ Brand config complete — normal operations mode`);
      }
    });

    // ── before_prompt_build: Inject onboarding context when Bootstrap active
    api.on("before_prompt_build", async (_event, ctx) => {
      const workspaceDir = ctx.workspaceDir || process.cwd();
      const soulPath = resolveSoulPath(workspaceDir);

      if (!existsSync(soulPath)) return;

      const soulContent = readFileSync(soulPath, "utf-8");
      if (!hasPluginBlock(soulContent)) return;
      if (!hasPlaceholders(soulContent)) return;

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
        console.log(`[${PLUGIN_ID}] ✅ Bootstrap complete — all placeholders filled`);
      }
    });
  },
});
