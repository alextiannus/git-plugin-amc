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
declare const _default: unknown;
export default _default;
