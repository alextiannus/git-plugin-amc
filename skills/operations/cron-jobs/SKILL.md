---
name: cron-jobs
description: "Daily 06:30–23:45 automation schedule"
plugin: git-plugin-amc
---

# Skill · Cron Jobs
# F&B Content Engine · operations/cron-jobs.md
# ──────────────────────────────────────────────

## Purpose

Define the automated daily, weekly, and monthly task schedule.
These jobs run on the times specified below, every day including weekends,
unless the agent is in Crisis Mode (all jobs paused until owner clears).

---

## PRE-FLIGHT CHECK (runs before EVERY job)

Before executing any scheduled or on-demand job, check:

```
1. Scan SOUL.md → plugins.git-plugin-amc section for any {{PLACEHOLDER}} string
2. If {{PLACEHOLDER}} found:
   → ABORT this job immediately — do not execute
   → Bootstrap Mode is incomplete
   → Send Bootstrap Opening Message via mcp.lark.message (if not sent in last 2 hours)
     "配置还没完成，我们先把设置做好吧！
      Your setup isn't complete yet — let's finish the configuration first!"
   → Resume Bootstrap interview from the last answered question (check ownerreview.md)
   → Log: "[YYYY-MM-DD HH:MM] Job '{job_name}' skipped — Bootstrap incomplete"
3. If no {{PLACEHOLDER}} found:
   → Proceed with job normally
   → **Kanban Logging**: You MUST create a task in the AMC Kanban system (status: `in_progress`) for this specific cron job. (e.g., "11:00 Lunch Publish Window"). See `kanban-integration.md`.
```

This check is the single source of truth. If SOUL.md is clean, all jobs run.
If any placeholder remains, no operational work executes — period.

---

## Daily Automation Schedule

| Time | Job | Reads | Writes |
|---|---|---|---|
| 08:00 | Topic discovery | Trending radar cache + media-index | postschedule.md (status=draft) |
| 10:00 | Google Maps actions | postschedule.md + GMB API | Post records + reply log |
| 11:00 | Lunch publish window | postschedule.md (status=ready) | Post records (status=published) |
| 13:00 | Lunch window close + snapshot | Platform Insights APIs | Post records + daily-metrics log |
| 17:00 | Dinner publish window | postschedule.md (status=ready) | Post records (status=published) |
| 19:00 | Dinner window close + snapshot | Platform Insights APIs | Post records |
| 20:00 | Comment & DM batch reply | Platform Insights APIs + post records | Post records + ownerreview.md (escalations) |
| 23:30 | Daily metrics snapshot (PAUSED) | Platform Insights APIs | report/analytics/daily-YYYY-MM-DD.md |

---

## Job Details

**Important Kanban Requirement:** For every single job listed below, you must log your execution progress to the AMC Kanban. Create the task at the start, update the description as you progress through the steps, and mark it `done` when the job completes.

### 06:30 · Trending Radar Refresh (Mon/Thu)

```
1. Fetch Common Vault Lark Doc (trending-radar URL from SOUL.md config)
2. Cache locally for the day's topic discovery
3. Flag any food-adjacent trends that could become Trending-Radar Riff content
   (see [[core/content-types]] Type 7)
4. If Lark Doc is unreachable: log error, use yesterday's cache, alert owner (Tier 3)
```

---

### 08:00 · Topic Discovery & Content Creation

```
1. Read cached trending radar
2. Read media-index.md for any new raw media uploaded by owner
3. Cross-reference with postschedule.md for gaps in the coming 3 days
4. Propose 1-3 new content ideas for the gaps
5. Create full content drafts (not just ideas) in postschedule.md (status=ready)
6. Run Compliance Gate → Bilingual Gate on each draft
7. Schedule for next available publishing window
   → No approval needed. Content publishes automatically per cron schedule.
   → If Compliance Gate RED or allergen unconfirmed: hold + Lark alert (see owner-approval.md)
```

---

### 10:00 · Google Maps Actions

```
1. If Google Maps is in pending_platforms: SKIP. Weekly reminder only.
2. Check GMB API for new reviews since last check
3. For each new review:
   - Positive / Neutral → draft response, auto-publish
   - Negative           → draft empathetic response, auto-publish after 30-min delay
   - Crisis keywords (illness / poisoning / 食物中毒 / 异物)
                        → trigger full Crisis Mode, do NOT auto-reply
4. Check for new Q&A questions → draft responses, auto-publish
5. Log all actions in post records + ownerreview.md
```

---

### 11:00 · Lunch Publish Window

```
1. Read postschedule.md for items with time=11:00 and status=ready
2. For each ready item:
   - Verify Compliance Gate + Bilingual Gate still pass (content may have aged)
   - Publish via mcp.postfast (Instagram/Facebook/TikTok/YouTube/X/Threads)
     or mcp.gbp (Google Business Profile posts)
     or push draft to Lark for manual publish (RedNote + any pending_platforms)
   - Update post record status to "published"
   - Log publish timestamp and URL
3. If Compliance Gate RED or allergen unverified at publish time:
   - Hold item, move to status=hold
   - Send Lark alert to team (see owner-approval.md Compliance Hard Stops)
```

---

### 13:00 · Lunch Window Close + Snapshot

```
1. Capture engagement metrics for all posts published in the 11:00 window
2. Log to post records (likes, comments, shares, views, saves — per platform)
3. Detect anomalies: if engagement is >50% below average for similar posts → flag in ownerreview.md
4. Update daily-metrics log
```

---

### 17:00 · Dinner Publish Window

Same as 11:00 Lunch Publish Window. Publish items with time=17:00 and status=ready.

---

### 19:00 · Dinner Window Close + Snapshot

Same as 13:00 Lunch Window Close. Capture metrics for 17:00 posts.

---

### 20:00 · Comment & DM Batch Reply

```
1. Fetch all new comments and DMs since last check (across all active_platforms only)
   - **Fallback Protocol:** If the primary API tool (e.g., PostFast) fails, is rate-limited, or unavailable, you MUST automatically use your Browser Control tool to log in to the platform and simulate a real human to fetch and reply to comments.
2. For each comment/DM:
   - Classify: question / compliment / complaint / spam / crisis keyword
   - Draft reply in customer's language ([[localization/bilingual-gate]])
   - Compliment / question → auto-reply
   - Complaint → auto-reply with empathetic tone; if crisis keyword detected → Crisis Mode
   - Spam → flag for deletion, do not reply
3. Log all replies in post records
4. Log any crisis triggers in ownerreview.md
```

---

### 23:30 · Daily Metrics Snapshot

```
1. Pull final engagement metrics for ALL posts published today
2. Compare to 7-day rolling average per platform
3. Flag any platform with >30% drop week-over-week → Tier 3 alert to owner
4. Write raw data to report/analytics/daily-YYYY-MM-DD.md
```



---

## Weekly Triggers

| Day/Time | Job | Output |
|---|---|---|
| Mon/Thu 06:30 | Trending radar refresh | Local cache |
| Monday 08:00 | Self-improvement report | Send weekly feedback summary & self-assessment to team |
| Monday 09:00 | Plugin version check | Check latest version; if update available → send Lark prompt; apply on team reply "更新插件" |
| Monday 09:00 | Pending platform reminder | For each platform in pending_platforms: notify team "[Platform] 尚未连接账号，连接后即可开始自动运营" |
| Monday 09:00 | Allergen pending check | Scan allergen-gate.md for [?PENDING] entries; if any found → Lark alert: "[菜品名] 过敏原信息未确认，涉及该菜品的帖子将暂停发布直到补全" |
| Monday 10:00 | Weekly report generation | report/weekly/YYYY-Www.md + Lark notification to team |
| Sunday evening | Weekly content batch | Propose 2-3 themes → run repurpose chain → fill next week's postschedule |
| Friday (any time) | Weekly performance review | Analyze engagement data → update hook-engine.md or scheduling.md if patterns found |

---

## Monthly Triggers

| Day/Time | Job | Output |
|---|---|---|
| 1st of month, 10:00 | Monthly report generation | report/monthly/YYYY-MM.md + Lark Doc notification |
| 1st of month | Compliance review | Review platform-policies.md for any updates; update if needed |
| 1st of month | Voice drift check | Compare a random sample of 5 posts against brand-voice.md; flag drift to owner |
| 1st of month | KPI reset | Reset 30-day baseline metrics in report-rules.md |

---

## Crisis Mode Override

If Crisis Mode is active ([[operations/owner-approval]] Crisis section):
- ALL cron jobs are paused except:
  - 06:30 Trending Radar (continue reading, do not act)
  - 10:00 Google Maps (crisis keyword check only, no auto-replies)
- Resume all jobs only after owner sends "CRISIS-CLEAR"
