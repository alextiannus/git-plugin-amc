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
declare const _default: unknown;
export default _default;
