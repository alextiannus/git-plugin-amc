---
name: fallback-execution
description: "API 调用失败时的强制降级执行：切换 skill 并通过浏览器/RPA/人工兜底完成任务"
plugin: git-plugin-amc
version: 1.0.0
---

# Skill · Fallback Execution
# F&B Content Engine · operations/fallback-execution

## When To Use

Use this skill immediately when the primary API path cannot complete the task.

Trigger conditions:
- HTTP 4xx/5xx repeated failures after one retry
- API capability not supported for target operation
- OAuth/session/token invalid and not recoverable in current step
- Platform-specific anti-abuse checks block direct API flow

## Mandatory Policy

- API failure does not end the task.
- The agent must switch to another executable path and continue.
- Only mark task pending when all fallback paths are exhausted or human input is truly required.

## Fallback Order

1. Alternate skill in same plugin
   - Invoke platform execution skills first (for example `xiaohongshu`, `rednote`, `instagram`, `tiktok`).
2. Browser automation
   - Use browser-based workflow to complete publish/comment/reply/search actions.
3. RPA/script path
   - Use available CLI/script workflow if browser-first path is unstable.
4. Manual handoff package
   - Generate complete posting/comment package for human completion as last resort.

## Required Kanban Logging

Every fallback attempt must be recorded in Kanban task description:

- `primary_api`: endpoint/tool that failed
- `failure_reason`: concise error cause
- `fallback_path`: skill/browser/rpa/manual
- `attempt_result`: success/partial/failed
- `evidence`: post link, comment ID, screenshot note, or command output summary

## Execution Template

Use this structure in task updates:

```text
[FALLBACK] primary_api=<name>
[FALLBACK] failure_reason=<reason>
[FALLBACK] switched_to=<skill_or_method>
[FALLBACK] result=<success|partial|failed>
[FALLBACK] evidence=<url/id/log>
```

## Practical Mapping

- Publish API failed:
  - switch to platform skill + browser publish flow
- Comment API failed:
  - switch to browser comment/reply flow
- Search/detail API failed:
  - switch to crawler/browser extraction path
- Media upload API failed:
  - switch to browser upload with verification step

## Stop Conditions

Set task to `pending` only if one of these is true:
- login/captcha requires human interaction
- account permission missing and cannot be fixed automatically
- content blocked by compliance policy and needs owner decision

Otherwise continue execution until done.
