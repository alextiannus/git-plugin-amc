# Skill · Team Communication & Crisis Protocol
# F&B Content Engine · operations/owner-approval.md
# ──────────────────────────────────────────────────

## Core Operating Principle

**AI Content Manager publishes directly. No approval gate for regular content.**

The team reviews published content on social platforms and sends feedback
via Lark. The AI collects feedback, logs it, and self-improves.
Escalation via Lark exists ONLY for crisis situations.

---

## Regular Content · Direct Publish Flow

```
Topic Discovery → Content Creation → Compliance Gates → Publish
                                                           ↓
                                              Team reviews on IG/FB/etc.
                                                           ↓
                                          Team sends feedback via Lark bot
                                                           ↓
                                              AI logs → self-improves
```

No Lark notification needed for regular scheduled posts.
The weekly digest (Tier 3) informs the team of what was published.

---

## Feedback Reception (any time, any team member)

Any Lark message that is NOT a command is treated as feedback.

**Pattern matching:**
- "这条帖子太硬了" / "that post was too formal" → style feedback
- "多发一些食物特写" / "more close-up food shots" → content direction feedback
- "周二那条反应不好" / "Tuesday's post didn't perform well" → performance feedback
- "不要用这个词" / "don't use this word" → vocabulary feedback

**Agent response:**
1. Acknowledge: "收到，我记下来了 / Got it, noted."
2. Log to `vault-{brand}/brand/ownerreview.md` under today's date
3. Tag by category: [style] [content] [vocabulary] [timing] [platform]
4. Batch for weekly self-assessment (see `feedback-loop.md`)

---

## Tier 3 — Informational Notifications (no action needed)

Sent proactively by the agent. Team reads when convenient.

| Trigger | Timing | Content |
|---|---|---|
| Weekly digest | Monday 10:00 | What published last week, what's planned this week |
| Engagement anomaly | As detected | Drop >30% WoW on any platform — FYI only |
| Platform milestone | As detected | First 1,000 followers, 100 reviews, etc. |
| Plugin update available | Monday 09:00 | New version notice, changelog summary |
| Pending platform reminder | Monday 09:00 | "[Platform] not yet connected — connect to enable auto-publish" |

---

## Crisis Protocol (the only hard stop)

**Trigger conditions — any one of:**
- ≥5 one-star reviews within 24 hours
- Food-safety keywords in reviews: illness / poisoning / foreign object / injury / 异物 / 食物中毒
- Coordinated negative attack: ≥10 similar negative comments across platforms within 2 hours
- Any team member sends "CRISIS" via Lark

**Immediate actions (no confirmation needed):**
```
1. PAUSE all scheduled posts and auto-replies immediately
2. Send [🚨 CRISIS] alert to team Lark:
   - Platform(s) affected
   - Trigger description + count
   - Direct links to the content/reviews causing the issue
3. Switch to human-only mode: AI drafts responses, team sends manually
```

**Resume:**
- Team sends "CRISIS-CLEAR" via Lark
- Agent confirms: "收到，恢复正常运营。/ Crisis cleared. Resuming normal operations."
- Log the incident in `vault-{brand}/brand/ownerreview.md`

**Crisis Mode does not expire automatically. Explicit clear required.**

---

## Compliance Hard Stops (auto-hold, no publish)

Even without a crisis, these trigger an automatic hold + Lark alert:

| Trigger | Hold duration | Alert content |
|---|---|---|
| FDA/FTC RED flag detected | Indefinite | Specific violation + suggested fix |
| Allergen claim without verified data | Indefinite | Which dish, which allergen is unconfirmed |
| Price claim > $100 or discount > 40% | 2 hours | Price verification request |

Agent Lark message format for these:
```
⚠️ 内容暂停发布 / Post on hold
原因 / Reason: [specific trigger]
草稿链接 / Draft: [vault link]
请确认后回复「发布」/ Reply "发布" to publish after confirming
```

---

## Activity Log

All Tier 3 notifications and crisis events logged in:
`vault-{brand}/brand/ownerreview.md`

```markdown
## [DATE] Activity Log

| Time | Type | Description | Status |
|---|---|---|---|
| 10:00 | Weekly digest | Sent — 7 posts published last week | Delivered |
| 14:32 | Compliance hold | IG post — price claim unverified | Resolved 15:10 |
| 19:00 | Crisis | 6× 1-star reviews, food safety keyword | CRISIS-CLEAR 20:30 |
```
