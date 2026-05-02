# Report Rules — {{BRAND_NAME}}
# KPI definitions, targets, and reporting standards
# Fill targets during onboarding or first monthly review
# ──────────────────────────────────────────────────────

## KPI Definitions

| KPI | Definition | Unit |
|---|---|---|
| Impressions | Unique accounts reached by a post | Count |
| Engagement rate | (Likes + Comments + Saves + Shares) ÷ Impressions × 100 | % |
| Follower growth | Net new followers in period | Count |
| GMB review count | New Google Maps reviews received | Count |
| GMB average rating | Running average of all reviews | Score /5 |
| Comment response rate | % of comments replied to within 2h | % |
| DM response rate | % of DMs replied to within 2h | % |
| Attributed orders | Orders tracked via promo code or link-in-bio | Count |
| Top hook type | Hook type with highest avg engagement rate this period | Label |
| Top content format | Format with highest avg engagement rate this period | Label |

---

## Performance Targets

> Set during onboarding. Update monthly if targets are consistently met or missed.
> Leave blank until first 30-day baseline is established.

| KPI | Platform | Weekly Target | Monthly Target | Baseline (first 30 days) |
|---|---|---|---|---|
| Impressions | Instagram | — | — | — |
| Impressions | TikTok | — | — | — |
| Impressions | RedNote | — | — | — |
| Impressions | Facebook | — | — | — |
| Engagement rate | Instagram | — | — | — |
| Engagement rate | TikTok | — | — | — |
| Follower growth | Instagram | — | — | — |
| Follower growth | TikTok | — | — | — |
| GMB review count | Google Maps | — | — | — |
| GMB average rating | Google Maps | ≥4.5 | ≥4.5 | — |
| Attributed orders | All | — | — | — |

---

## Anomaly Thresholds (triggers Tier 3 alert)

| Metric | Threshold | Action |
|---|---|---|
| Engagement rate drops | >30% week-over-week on any platform | Tier 3 alert → update hook-engine + scheduling |
| Follower loss | >2% in any week | Tier 3 alert → review recent content for tone issues |
| GMB rating drops | Below 4.2 | Tier 2 escalation → crisis review |
| Review spike (negative) | ≥5 one-star in 24h | Tier 1 → Crisis Mode |
| Zero posts published | Any platform, 3 consecutive scheduled slots missed | Tier 2 alert |

---

## KPI Fallback Protocol

If after 2 weeks any KPI lags target by 30%+:

1. **First:** Update `hook-engine.md` and platform tone in `brand-voice.md`
2. **Second:** Adjust posting times in `scheduling.md` based on actual data
3. **Third:** Reduce posting frequency on underperforming platforms; increase on top performers
4. **Last resort:** Schedule a strategy review with owner (Tier 2 escalation)

Do NOT change core `brand-voice.md` personality without owner sign-off.
Brand voice changes take 4-6 weeks to show effect — don't optimize too early.

---

## Report Delivery Standards

| Report | Delivered to | Format | When |
|---|---|---|---|
| Daily mini-digest | ownerreview.md (append) | 1 paragraph | 23:45 daily |
| Weekly report | Lark Doc + Lark message to owner | Structured markdown | Monday 10:00 |
| Monthly report | Lark Doc + Lark message to owner | Structured markdown | 1st of month 10:00 |
| On-demand analytics | Lark Doc + Lark message | Free-form | When triggered |

All reports follow the templates in `report/weekly/` and `report/monthly/`.
