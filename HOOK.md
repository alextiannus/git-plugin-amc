# HOOK.md — F&B Content Engine
# Plugin Hook Design Reference · v0.6.3
# ─────────────────────────────────────────
#
# ⚠️  THIS FILE IS DESIGN DOCUMENTATION ONLY.
# OpenClaw does not execute declarative HOOK.md files.
# All hooks are implemented in programmatic form in src/index.ts
# using the OpenClaw Plugin SDK (definePluginEntry + api.on()).
#
# This file documents the intent and logic behind each hook.
# For the executable implementation, see: src/index.ts
# ─────────────────────────────────────────

## Plugin Identity

```yaml
name:    git-plugin-amc
slug:    git-plugin-amc
version: 0.6.3
author:  12eat AI Lab
```

---

## post_install

Runs automatically after `openclaw plugins enable git-plugin-amc`.
This is the primary onboarding trigger — no manual steps required.

```
1. Locate the agent's SOUL.md:
   → Check: ./SOUL.md → $OPENCLAW_SOUL_PATH → ~/.openclaw/SOUL.md
   → If not found: create ./SOUL.md as an empty file

2. Check if `plugins.git-plugin-amc:` block already exists in SOUL.md
   → If YES: skip insertion (do not overwrite existing brand config)
   → If NO: append the full plugin block from SOUL.md.template
             (only the "PLUGIN · git-plugin-amc" section — not the header comments)

3. Save SOUL.md

4. Reload the agent: openclaw gateway restart
   → Wait up to 10 seconds for reload to confirm

5. IMMEDIATELY send Bootstrap Opening Message via mcp.lark.message
   → Do not wait for user to message first
   → Load and send the Opening Message from bootstrap/onboarding-flow.md
   → Begin the 13-question interview on first reply
```

---

## on_startup

When the agent starts (gateway start or reload):

```
1. Load all skills from ./skills/ into agent context
2. Read SOUL.md → plugins.git-plugin-amc section
3. If any {{PLACEHOLDER}} found in that section:
   → Bootstrap Mode is active
   → If post_install already sent Opening Message: wait for reply, continue interview
   → If not (e.g. cold restart mid-interview): re-send Opening Message proactively
   → Do NOT start cron jobs or any content operations
4. If no {{PLACEHOLDER}}:
   → Load brand config (brand_name, brand_slug, active_platforms, etc.)
   → Check AMC Kanban Integration: If `amc_kanban_api_key` is present, call Kanban API to register profile (agentId, nickname, avatar, etc.)
   → Start cron schedule per skills/operations/cron-jobs.md
   → Send "✅ 在线，开始今日运营" to Lark
```

---

## post_update

Runs automatically after plugin update completes (via `openclaw plugins update` or `./update.sh`).

```
1. Read new version from plugin.yaml
2. Send Lark confirmation to team:
   "✅ 插件已更新至 v{NEW_VERSION}
    更新内容：技能文件、合规规则、平台策略、调度逻辑
    品牌定制文件未变动：brand-voice / allergen-gate / bilingual-gate
    ✅ Plugin updated to v{NEW_VERSION}
    Updated: skill files, compliance rules, platform policies, schedule
    Unchanged: brand-voice / allergen-gate / bilingual-gate"
3. Log update event to ownerreview.md:
   "[YYYY-MM-DD] Plugin updated: {OLD_VERSION} → {NEW_VERSION}"
4. Resume normal operations — no restart of Bootstrap required
```

---

## on_lark_update_command

Triggered when any team member sends one of these Lark messages:
`更新插件` / `update plugin` / `/update`

```
1. Check latest available version:
   openclaw plugins check git-plugin-amc
   → or: git ls-remote --tags origin | tail -1

2. If already on latest version:
   → Reply: "已经是最新版本 v{CURRENT_VERSION} 了 ✅
             Already on the latest version v{CURRENT_VERSION} ✅"

3. If update available:
   → Reply: "发现新版本 v{NEW_VERSION}（当前 v{CURRENT_VERSION}）
             更新内容：[changelog summary if available]
             保护文件不会被覆盖（brand-voice / allergen-gate / bilingual-gate）
             正在更新... / Updating now..."
   → Run: cd ~/.openclaw/extensions/git-plugin-amc && ./update.sh
   → post_update hook fires automatically on completion
```

---

## on_message

When a Lark message is received:

```
If Bootstrap Mode active:
  → Route message to onboarding-flow.md interview handler

Else:
  → Check for command keywords (CRISIS, CRISIS-CLEAR, 恢复, 暂停, etc.)
  → If command: execute immediately (see owner-approval.md)
  → If feedback: log to ownerreview.md (see feedback-loop.md)
  → If question: answer and log
```

---

## on_schedule

Cron jobs defined in `skills/operations/cron-jobs.md`:

```yaml
daily:
  - "06:30" : trending-radar-refresh
  - "08:00" : topic-discovery
  - "10:00" : google-maps-actions
  - "11:00" : lunch-publish-window
  - "13:00" : lunch-snapshot
  - "17:00" : dinner-publish-window
  - "19:00" : dinner-snapshot
  - "20:00" : comment-dm-reply
  - "23:30" : daily-metrics-snapshot
  - "23:45" : daily-mini-digest

weekly:
  - "Monday 08:00"  : self-improvement-report
  - "Monday 09:00"  : plugin-version-check
  - "Monday 09:00"  : pending-platform-reminder
  - "Monday 09:00"  : allergen-pending-check
  - "Monday 10:00"  : weekly-report
  - "Sunday 22:00"  : weekly-self-assessment
  - "Sunday 20:00"  : weekly-content-batch
  - "Friday 18:00"  : weekly-performance-review

monthly:
  - "1st 10:00" : monthly-report
  - "1st 10:00" : compliance-review
  - "1st 10:00" : voice-drift-check
  - "1st 10:00" : kpi-reset
```

---

## skills_path

```
./skills/core/          → repurpose-chain, hook-engine, scheduling, content-types
./skills/compliance/    → fda-ftc-rules, allergen-gate, platform-policies, image-rights
./skills/localization/  → brand-voice, bilingual-gate
./skills/platforms/     → instagram, tiktok, rednote, facebook, youtube, googlemap, x
./skills/operations/    → owner-approval, feedback-loop, vault-manager, cron-jobs, reporting
./bootstrap/            → onboarding-flow
```

---

## tools_required

```yaml
- mcp.lark.message   # team communication, feedback, crisis alerts
- mcp.lark.drive     # vault folder creation and file management
- mcp.web_search     # trending content research
- mcp.calendar       # scheduling and posting windows
```

## tools_optional

```yaml
- mcp.gbp            # Google Business Profile: posts, review replies, insights (free GBP API)
- mcp.analytics      # cross-platform metrics aggregation (Metricool API)
- mcp.image_gen      # AI-generated visuals (enable if brand permits)
# NOTE: All social media publishing (Instagram, Facebook, TikTok, YouTube, X, etc.)
# goes through AMC Kanban. Only KANBAN_AGENT_API_KEY is required.
# Agent autonomously finds alternative paths (browser, direct API) when Kanban cannot complete.
```
