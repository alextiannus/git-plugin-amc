# Skill · Cron Jobs
# F&B Content Engine · operations/cron-jobs.md
# ──────────────────────────────────────────────

## Purpose

Define the automated daily, weekly, and monthly task schedule.
These jobs run on the times specified below, every day including weekends,
unless the agent is in Crisis Mode (all jobs paused until owner clears).

---

## Daily Automation Schedule

| Time | Job | Reads | Writes |
|---|---|---|---|
| 06:30 | Trending Radar refresh | Common Vault Lark Doc | Local cache |
| 08:00 | Topic discovery | Trending radar cache + media-index | postschedule.md (status=draft) |
| 10:00 | Google Maps actions | postschedule.md + GMB API | Post records + reply log |
| 11:00 | Lunch publish window | postschedule.md (approved items) | Post records (status=published) |
| 13:00 | Lunch window close + snapshot | Platform Insights APIs | Post records + daily-metrics log |
| 17:00 | Dinner publish window | postschedule.md (approved items) | Post records (status=published) |
| 19:00 | Dinner window close + snapshot | Platform Insights APIs | Post records |
| 20:00 | Comment & DM batch reply | Platform Insights APIs + post records | Post records + ownerreview.md (escalations) |
| 23:30 | Daily metrics snapshot | Platform Insights APIs | report/analytics/daily-YYYY-MM-DD.md |
| 23:45 | Daily mini-digest | Daily metrics log | ownerreview.md (one-paragraph summary) |

---

## Job Details

### 06:30 · Trending Radar Refresh

```
1. Fetch Common Vault Lark Doc (trending-radar URL from SOUL.md config)
2. Cache locally for the day's topic discovery
3. Flag any food-adjacent trends that could become Trending-Radar Riff content
   (see [[core/content-types]] Type 7)
4. If Lark Doc is unreachable: log error, use yesterday's cache, alert owner (Tier 3)
```

---

### 08:00 · Topic Discovery

```
1. Read cached trending radar
2. Read media-index.md for any new raw media uploaded by owner
3. Cross-reference with postschedule.md for gaps in the coming 3 days
4. Propose 1-3 new content ideas for the gaps
5. Create draft entries in postschedule.md (status=draft)
6. If a trend is time-sensitive (must post within 24h): escalate as Tier 2 for fast approval
```

---

### 10:00 · Google Maps Actions

```
1. Check GMB API for new reviews since last check
2. For each new review:
   - Positive → draft response, auto-publish (no hold needed)
   - Negative → draft response, Tier 1 escalation before publishing
   - Crisis keywords detected → full Crisis Mode trigger
3. Check for new Q&A questions → draft responses, auto-publish
4. If business post is scheduled for today → publish at 10:00
5. Log all responses in post record + ownerreview.md
```

---

### 11:00 · Lunch Publish Window

```
1. Read postschedule.md for items with time=11:00 and status=approved
2. For each approved item:
   - Verify Compliance Gate + Bilingual Gate still pass (content may have aged)
   - Publish via appropriate mcp.publisher.*
   - Update post record status to "published"
   - Log publish timestamp and URL
3. If any item is still status=pending-approval at 11:00:
   - Do NOT publish
   - Send reminder to owner (Tier 1 reminder)
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

Same as 11:00 Lunch Publish Window. Publish items with time=17:00 and status=approved.

---

### 19:00 · Dinner Window Close + Snapshot

Same as 13:00 Lunch Window Close. Capture metrics for 17:00 posts.

---

### 20:00 · Comment & DM Batch Reply

```
1. Fetch all new comments and DMs since last check (across all active platforms)
2. For each comment/DM:
   - Classify: question / compliment / complaint / spam / crisis keyword
   - Draft reply in customer's language ([[localization/bilingual-gate]])
   - Compliment / question → auto-reply (no hold)
   - Complaint → Tier 2 escalation + draft reply ready for owner review
   - Crisis keyword → Tier 1 escalation, pause auto-replies
   - Spam → flag for deletion, do not reply
3. Log all replies in post records
4. Log any escalations in ownerreview.md
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

### 23:45 · Daily Mini-Digest

```
Write one paragraph to ownerreview.md:

"[DATE] — Published [N] posts across [platforms].
Top performer: [post slug] on [platform] with [metric].
Pending items: [N] drafts awaiting approval.
Anomalies: [any flags, or 'none'].
Tomorrow's schedule: [N] posts approved and ready."
```

---

## Weekly Triggers

| Day/Time | Job | Output |
|---|---|---|
| Monday 10:00 | Weekly report generation | report/weekly/YYYY-Www.md + Lark Doc notification |
| Monday 09:00 | Plugin version check | Run `openclaw plugins check fb-content-engine`; if update available → notify owner via Lark (Tier 3): "Plugin 有新版本 vX.Y.Z，是否现在更新？" |
| Sunday evening (or Monday morning) | Weekly content batch | Propose 2-3 themes → run repurpose chain → fill postschedule |
| Friday (any time) | Weekly review | Analyze hook performance → update hook-engine.md + scheduling.md |

---

## Monthly Triggers

| Day/Time | Job | Output |
|---|---|---|
| 1st of month, 10:00 | Monthly report generation | report/monthly/YYYY-MM.md + Lark Doc notification |
| 1st of month | Compliance review | Review platform-policies.md for any updates; update if needed |
| 1st of month | Voice drift check | Compare last 30 posts against brand-voice.md; flag drift to owner |
| 1st of month | KPI reset | Reset 30-day baseline metrics in report-rules.md |

---

## Crisis Mode Override

If Crisis Mode is active ([[operations/owner-approval]] Crisis section):
- ALL cron jobs are paused except:
  - 06:30 Trending Radar (continue reading, do not act)
  - 10:00 Google Maps (respond to reviews only under owner direction)
- Resume all jobs only after owner sends "CRISIS-CLEAR"
