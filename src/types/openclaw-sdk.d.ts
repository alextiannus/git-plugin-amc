/**
 * Type stub for openclaw/plugin-sdk/plugin-entry
 *
 * The real implementation is provided by the OpenClaw runtime at execution time.
 * This file exists only to satisfy the TypeScript compiler during `npm run build`.
 * It is NOT included in the published package — OpenClaw injects the real module.
 */
declare module "openclaw/plugin-sdk/plugin-entry" {
  /** Context object passed to every hook handler */
  export interface PluginContext {
    /** Absolute path to the active OpenClaw workspace directory */
    workspaceDir?: string;
  }

  /** Opaque event payload — hook handlers should not depend on its shape */
  export type HookEvent = Record<string, unknown>;

  /**
   * Return value from a hook handler.
   * - `void` → no system-prompt injection
   * - `{ appendSystemContext }` → text is appended to the current system prompt
   */
  export type HookResult = void | { appendSystemContext: string };

  export type HookName =
    | "post_install"
    | "gateway_start"
    | "session_start"
    | "before_prompt_build"
    | "agent_end";

  /**
   * A scheduled task registered with the OpenClaw scheduler.
   *
   * @param cron     - Standard 5-field cron expression (minute hour dom month dow)
   * @param task     - Unique task identifier — used as the directive sent to the agent
   * @param prompt   - Natural-language directive injected into the agent session at trigger time
   * @param timezone - IANA timezone (default: "UTC")
   * @param enabled  - Whether the task is active; can be toggled at runtime (default: true)
   */
  export interface ScheduleEntry {
    cron: string;
    task: string;
    prompt: string;
    timezone?: string;
    enabled?: boolean;
  }

  /** The api object injected into register() */
  export interface PluginAPI {
    on(
      event: HookName,
      handler: (event: HookEvent, ctx: PluginContext) => Promise<HookResult>
    ): void;

    /**
     * Register scheduled tasks with the OpenClaw scheduler.
     * - Idempotent: calling multiple times with the same task ID updates in place.
     * - Tasks are suspended automatically if Bootstrap Mode is active ({{PLACEHOLDER}} in SOUL.md).
     * - All tasks registered by a plugin are cleared when the plugin is disabled.
     *
     * @param entries - Array of ScheduleEntry definitions
     */
    registerSchedule(entries: ScheduleEntry[]): void;
  }

  /** Shape passed to definePluginEntry() */
  export interface PluginDefinition {
    id: string;
    name: string;
    description: string;
    register(api: PluginAPI): void;
  }

  /**
   * Define and export a plugin entry point.
   * The returned value is consumed by the OpenClaw runtime — treat it as opaque.
   */
  export function definePluginEntry(definition: PluginDefinition): unknown;
}
