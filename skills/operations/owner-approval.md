# Skill · Owner Approval
# F&B Content Engine · operations/owner-approval.md
# ──────────────────────────────────────────────────

## Purpose

Define when and how the AI Content Manager escalates to the brand owner,
what the owner needs to do, and what happens if there's no response.

---

## The Notification Protocol (applies to ALL tiers)

For EVERY escalation — any tier — perform BOTH actions simultaneously:

**Action 1: Append to post record**
Write an escalation block to the related post record file:
`vault-{brand}/post/YYYY-MM-DD_{slug}.md` → under "Issues / Notes"

```markdown
## Issues / Notes

**Escalation — [TIMESTAMP]**
- Tier: [1 / 2 / 3]
- Trigger: [one-line reason]
- Status: PENDING OWNER RESPONSE
- Question: [exact question that needs an answer]
```

**Action 2: Send Lark message to owner**
Message must contain:
- Tier (1 / 2 / 3)
- Trigger reason (one line, specific)
- Direct link to the post record file in vault
- The exact question: ✅ Approve / ✏️ Edit / ❌ Reject / 🕒 Hold?

These two actions are NOT alternatives. Both happen every time.

---

## Tier 1 — Pause & Wait (block publish until approved)

**Triggers:**
- Compliance Gate RED hit
- Compliance Gate YELLOW hit involving: competitor name, heritage claim, political content
- Crisis communication (food-safety incident, PR issue, ≥3 negative comments same hour)
- Any post claiming price > $50 or deal > 30% off
- First post of any new dish (price verification required)

**SLA:**
- Notify within 5 minutes of trigger
- Owner response window: 1 hour during operating hours
- If no response after 1 hour: DO NOT publish. Auto-bump notification. Try again in 1 hour.
- If no response after 3 hours: move draft to "Pending" in postschedule.md; log in ownerreview.md

**Tier 1 is a hard stop. There are no exceptions.**

---

## Tier 2 — Notify & Auto-Hold (auto-publish if no objection)

**Triggers:**
- New content format being trialed for the first time
- Content tagged by owner as "VIP topics" in the brand config
- Cross-store or chain-level content (affects multiple locations)

**SLA:**
- Notify within 30 minutes of draft completion
- Owner response window: 4 hours
- If no response after 4 hours: auto-publish + log "Auto-approved (no response)" in ownerreview.md

---

## Tier 3 — Notify Only (no hold, no publish delay)

**Triggers:**
- Daily digest: summary of what was published today
- Weekly digest: what's planned for next week
- Anomaly alert: engagement drop >30% week-over-week on any platform
- Milestone: first 1,000 followers, 100 reviews, etc.

**No action required from owner.** These are informational only.

---

## Owner Response Options

Owner replies to the Lark message with one of:

| Response | Meaning | Agent Action |
|---|---|---|
| ✅ APPROVE | Publish as-is | Publish immediately, update post record status |
| ✏️ EDIT | Owner provides specific edits | Apply edits, re-run Compliance + Bilingual Gates, then publish |
| ❌ REJECT | Kill this draft | Archive draft, log reason in ownerreview.md, do not republish |
| 🕒 HOLD | Defer to specific date/time | Reschedule in postschedule.md, send reminder 1h before new slot |

---

## Crisis Mode

**Trigger:** Any of the following:
- ≥5 one-star reviews in 24 hours
- Food-safety keywords in incoming reviews (illness, poisoning, foreign object, injury)
- Coordinated negative comment attack across platforms

**Immediate actions (no owner confirmation needed for steps 1-3):**
1. PAUSE all auto-replies and scheduled posts immediately
2. Send [URGENT] Lark message to owner via standard dual-channel protocol
3. Switch comment-reply mode to "human-only" (no auto-replies)

**Resume conditions:**
- Owner explicitly replies "CRISIS-CLEAR" on the post record OR via Lark message
- Do not resume automatically under any circumstances

---

## Escalation Log

Every escalation (all tiers) is logged in:
`vault-{brand}/brand/ownerreview.md`

Format:
```markdown
## [DATE] Escalation Log

| Time | Tier | Trigger | Status | Resolution |
|---|---|---|---|---|
| 11:32 | T1 | New dish post — price unverified | PENDING | |
| 14:05 | T2 | New Reels format trial | AUTO-APPROVED | Published 18:05 |
```
