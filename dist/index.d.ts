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
 * - 20 tasks registered programmatically (Daily×8, Weekly×8, Monthly×4)
 * - Tasks are suspended automatically by OpenClaw when Bootstrap Mode is active
 * - api.registerSchedule() is idempotent — safe to call on every gateway_start
 */
declare const _default: unknown;
export default _default;
