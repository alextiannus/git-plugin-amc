# HOOK.md — F&B Content Engine
# OpenClaw Plugin Lifecycle Hooks · v0.4.8
# ─────────────────────────────────────────

## Plugin Identity

```yaml
name:    fb-content-engine
slug:    git-plugin-amc
version: 0.4.8
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

2. Check if `plugins.fb-content-engine:` block already exists in SOUL.md
   → If YES: skip insertion (do not overwrite existing brand config)
   → If NO: append the full plugin block from SOUL.md.template
             (only the "PLUGIN · fb-content-engine" section — not the header comments)

3. Save SOUL.md

4. Reload the agent: openclaw reload
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
2. Read SOUL.md → plugins.fb-content-engine section
3. If any {{PLACEHOLDER}} found in that section:
   → Bootstrap Mode is active
   → If post_install already sent Opening Message: wait for reply, continue interview
   → If not (e.g. cold restart mid-interview): re-send Opening Message proactively
   → Do NOT start cron jobs or any content operations
4. If no {{PLACEHOLDER}}:
   → Load brand config (brand_name, brand_slug, active_platforms, etc.)
   → Start cron schedule per skills/operations/cron-jobs.md
   → Send "✅ 在线，开始今日运营" to Lark
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
- mcp.translate      # bilingual content generation
- mcp.calendar       # scheduling and posting windows
```

## tools_optional

```yaml
- mcp.publisher.instagram
- mcp.publisher.tiktok
- mcp.publisher.rednote
- mcp.publisher.facebook
- mcp.publisher.youtube
- mcp.publisher.googlemap
- mcp.publisher.x
- mcp.image_gen
```
