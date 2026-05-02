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
    | "gateway_start"
    | "session_start"
    | "before_prompt_build"
    | "agent_end";

  /** The api object injected into register() */
  export interface PluginAPI {
    on(
      event: HookName,
      handler: (event: HookEvent, ctx: PluginContext) => Promise<HookResult>
    ): void;
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
