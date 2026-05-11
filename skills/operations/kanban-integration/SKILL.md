---
name: kanban-integration
description: "AMC Kanban integration logic for openclaw agents"
plugin: git-plugin-amc
---

# Skill · Kanban Integration
# F&B Content Engine · operations/kanban-integration.md
# ────────────────────────────────────────────────────────

## Purpose

All openclaw agents running this plugin are members of the AMC (Agent-Machine Collaboration) ecosystem. They must register themselves with the central AMC Kanban board and log all their daily content management activities (excluding the initial setup/bootstrap phase) as Kanban tasks.

This ensures full transparency and traceability of the agent's work for the human team.

## Kanban AMC Identity

You are an AI employee in the AMC Kanban system.
Your access is governed by the `{{AMC_KANBAN_API_KEY}}` configured in your `SOUL.md`.

### Kanban API & SOP Discovery

Before interacting with the Kanban, you must always read the latest API specifications and operational guidelines using your standard fetch tool (e.g. `mcp.bash` using `curl` or `fetch`):
- API Specification: `GET https://amc-kanban.immedi.ai/api/meta/openapi`
- SOP Guidelines: `GET https://amc-kanban.immedi.ai/api/meta/sop`

**Authentication:** 
All API calls to the Kanban (except the meta endpoints above) require your identity key in the header:
```
Authorization: Bearer {{AMC_KANBAN_API_KEY}}
```

## Agent Registration (Profile Sync)

Whenever you start up (e.g., `on_startup` hook), and **ONLY AFTER** the Bootstrap phase is complete (no `{{PLACEHOLDER}}` strings in config), you must register or update your profile on the Kanban board.

1. Call `POST https://amc-kanban.immedi.ai/api/agents/profile`
2. Provide the following JSON payload:
   - `agentId`: `{{BRAND_SLUG}}-content-manager` (A stable, reusable ID)
   - `nickname`: `{{BRAND_NAME}} 内容官` (Your identity name)
   - `introduction`: "Responsible for F&B content creation, publishing, and engagement across social platforms."
   - `workflow`: "F&B Content Engine"
   - `themeColor`: "#FF5733" (Or any brand-appropriate color)
   - `insights`: "Fully automated operation from 06:30 to 23:45."

## Task Logging Rules (The Loop)

Any meaningful, traceable, or deliverable content management work **must** be logged to the Kanban.
Invisible work is not allowed.

This applies to all jobs in `cron-jobs.md` (e.g., Topic Discovery, Publish Windows, Google Maps replies), **EXCEPT** the setup/bootstrap flow itself.

When executing an operational job:
1. **Create Task**: Create a new task via the Kanban API assigned to your `agentId`. Set the status to `in_progress`.
2. **Execute**: Do your actual work (e.g., generate posts, reply to comments).
3. **Update Progress**: If the task has multiple steps, update the task `description` via the API with your progress.
4. **Pending/Blocked**: If you encounter an issue that requires human approval (like Crisis Mode), set the status to `pending` and write what you need in `requiredInput`. Once cleared, set it back to `in_progress`.
5. **Complete Task**: When the job finishes, set the status to `done` and submit a summary of the results.

Report any API errors (status code, error message) back to the Lark channel so the team can troubleshoot.
