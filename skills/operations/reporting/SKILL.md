---
name: reporting
description: "Daily digest, weekly, monthly reports"
plugin: git-plugin-amc
---

# Skill · Reporting
# F&B Content Engine · operations/reporting.md
# ─────────────────────────────────────────────

## Purpose

Define what gets measured, how reports are generated, and what the owner
receives. Reports are the feedback loop that drives weekly improvement.

---

## Report Types

| Type | Trigger | Output Location | Delivered via |
|---|---|---|---|
| Daily mini-digest | 23:45 daily | ownerreview.md | Appended to file |
| On-demand analytics | Owner request or anomaly flag | report/analytics/YYYY-MM-DD_{slug}.md | Lark Doc link |
| Weekly report | Monday 10:00 | report/weekly/YYYY-Www.md | Lark Doc + Lark message |
| Monthly report | 1st of month 10:00 | report/monthly/YYYY-MM.md | Lark Doc + Lark message |

---

## KPI Definitions (report-rules.md)

These are the standard KPIs tracked for all brands. Brand-specific targets are set in `report-rules.md` during onboarding.

| KPI | Definition | Tracked Per |
|---|---|---|
| Impressions | Total accounts reached by each post | Post · Platform · Week · Month |
| Engagement rate | (Likes + Comments + Saves + Shares) / Impressions × 100 | Post · Platform · Week |
| Follower growth | Net new followers in period | Platform · Week · Month |
| Review count | New Google Maps reviews in period | Week · Month |
| Average rating | Running average of all GMB reviews | Month |
| Response rate | % of comments/DMs replied to within 2h | Platform · Week |
| Attributed orders | Orders placed via "link in bio" or promo code tracking | Week · Month |
| Top hook type | Which hook type drove highest engagement | Platform · Week |
| Top content format | Which format (carousel, video, text) drove highest engagement | Platform · Week |

---

## Weekly Report Template

```markdown
# Weekly Report — {BRAND_NAME}
## Week: {YYYY-Www} ({date range})

---

### Summary (one paragraph)
[Auto-generated: total posts published, total reach, standout moment of the week]

---

### Platform Performance

| Platform | Posts | Impressions | Eng. Rate | Followers +/- | Notes |
|---|---|---|---|---|---|
| Instagram | | | | | |
| TikTok | | | | | |
| RedNote | | | | | |
| Facebook | | | | | |
| Google Maps | | | Avg rating: | Reviews: | |

---

### Top 3 Posts This Week

1. **[Post slug]** — [Platform] — [metric that made it top]
2. **[Post slug]** — [Platform] — [metric]
3. **[Post slug]** — [Platform] — [metric]

---

### Hook Performance

| Hook Type | Avg Engagement | Best Platform | Trend vs Last Week |
|---|---|---|---|
| Craving | | | |
| Deal | | | |
| Discovery | | | |
| Community | | | |
| Contrarian | | | |
| BTS | | | |

---

### What Worked / What Didn't

**Worked:**
- [Auto-generated from engagement data: specific format, hook, or theme that outperformed]

**Didn't work:**
- [Specific format, hook, or theme that underperformed vs average]

---

### Recommendations for Next Week

1. [Data-driven recommendation — e.g. "Increase Deal hooks on Instagram (2.3× avg engagement this week)"]
2. [e.g. "Schedule BTS content for Thursday — performed best mid-week"]
3. [e.g. "Reduce YouTube frequency — last 2 videos underperformed by 40%"]

---

### Pending Items

| Item | Type | Status | Since |
|---|---|---|---|
| [Draft slug] | Tier 1 escalation | Awaiting approval | [date] |

---

### Next Week's Schedule Preview

[Auto-pulled from postschedule.md — approved posts for the coming week]
```

---

## Monthly Report Template

```markdown
# Monthly Report — {BRAND_NAME}
## Month: {YYYY-MM}

---

### Executive Summary (2-3 paragraphs)
[Overall performance, key wins, key challenges, one recommendation]

---

### Monthly KPI Dashboard

| KPI | This Month | Last Month | Change | Target | Status |
|---|---|---|---|---|---|
| Total Impressions | | | | | |
| Avg Engagement Rate | | | | | |
| Total Follower Growth | | | | | |
| Google Maps Reviews | | | | | |
| Google Maps Avg Rating | | | | | |
| Attributed Orders | | | | | |

---

### Platform Deep Dive

[Per-platform section for each active platform]

#### Instagram
- Posts published: [N]
- Top format: [carousel / reels]
- Top hook: [type]
- Follower growth: [N]
- Best post: [slug + metric]

[Repeat for each active platform]

---

### Content Mix Analysis

[Were we posting the right balance of deal / showcase / BTS / community?]
[Actual mix vs target mix from content-types.md]

---

### Compliance Log

- Tier 1 escalations this month: [N]
- Tier 2 escalations this month: [N]
- RED compliance flags: [N]
- Any platform policy changes to note: [Y/N + details]

---

### Recommendations for Next Month

1. [Strategic recommendation with data backing]
2. [Tactical recommendation]
3. [Platform-specific recommendation]

---

### Voice Drift Check

[Compare last 30 posts against brand-voice.md core personality]
[Flag: ALIGNED / MILD DRIFT / SIGNIFICANT DRIFT]
[If drift detected: specific examples and recommended correction]
```

---

## On-Demand Analytics Report

Generated when:
- Owner requests a specific analysis
- An anomaly flag is triggered (engagement drop >30% week-over-week)
- A specific campaign or new dish launch needs performance tracking

Structure: free-form, but must include:
- The specific question or anomaly being analyzed
- Relevant data (pulled from Platform Insights APIs)
- A clear finding
- A specific recommendation

Delivered as: `report/analytics/YYYY-MM-DD_{topic}.md` + Lark Doc link to owner
