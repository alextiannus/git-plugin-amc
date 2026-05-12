---
name: feedback-loop
description: "Team feedback collection and weekly self-improvement"
plugin: git-plugin-amc
---

# Skill · Feedback Loop & Self-Improvement
# F&B Content Engine · operations/feedback-loop.md
# ──────────────────────────────────────────────────

## Purpose

Define how the AI Content Manager collects team feedback,
processes it weekly, and applies it to improve content quality over time.

The team reviews published content on social platforms (IG, FB, etc.)
and sends feedback freely via Lark. The AI does the rest.

---

## Feedback Collection (continuous)

Any Lark message that is NOT a command or question is treated as feedback.
See `owner-approval.md` for pattern matching and tagging rules.

Feedback is logged to the ownerreview Lark Doc in real time.

---

## Weekly Self-Assessment (every Sunday 22:00)

Read all feedback logged in the past 7 days and produce a self-assessment:

### Step 1 · Categorise feedback

Group feedback entries by tag:
- `[style]` — tone, formality, voice
- `[content]` — topics, formats, content types
- `[vocabulary]` — word choices, phrases, language
- `[timing]` — posting times, frequency
- `[platform]` — platform-specific feedback

### Step 2 · Identify patterns

A pattern = the same tag appearing ≥2 times in one week, or a direct
instruction from the team (e.g. "always", "never", "from now on").

Single one-off comments are noted but do not trigger changes.

### Step 3 · Apply changes

For each confirmed pattern:

| Category | File to update | What to change |
|---|---|---|
| `[style]` / `[vocabulary]` | `brand-voice.md` | Tone description, example phrases, forbidden words |
| `[content]` | `content-types.md` or `scheduling.md` | Content mix ratios, preferred formats |
| `[timing]` | `scheduling.md` | Posting windows, batch priorities |
| `[platform]` | Platform-specific skill file | Platform guidance adjustments |

**Rule 1: never overwrite brand-voice.md completely — only append or modify
specific sections. The original brand personality anchors remain unless
explicitly changed by the team.**

**Rule 2: Archive Processed Feedback.** Once feedback from the ownerreview Lark Doc is absorbed into `brand-voice.md` or other core files, append `[PROCESSED - YYYY-MM-DD]` to those entries in the ownerreview Lark Doc. This ensures the raw log acts as an inbox, while `brand-voice.md` acts as the true "Core Memory" used during content generation.

### Step 4 · Report to team

Send a Lark summary on Monday 08:00 (ahead of the weekly digest):

```
📊 本周自我改进摘要 / Weekly Self-Improvement Summary

收到反馈 N 条 / Feedback received: N items
已应用改进 M 条 / Changes applied: M

变更内容 / Changes made:
- [品牌声音] 移除"限时"一词，改用"本周特供" / [Voice] Replaced "limited time" with "this week's special"
- [发布时间] 周五改为 19:30 发布（原 17:00 反馈效果更好）/ [Timing] Friday post moved to 19:30 (feedback: better engagement)
- [内容类型] 增加厨房幕后内容比例（团队要求）/ [Content] Added more behind-the-scenes kitchen content

未改变（单次反馈，观察中）/ Watching (single feedback, not yet applied):
- "粤语拼音菜名可以减少" — 1次反馈，继续观察
```

---

## Performance-Driven Adjustment (monthly, 1st of month)

Beyond team feedback, also review platform analytics:

```
1. Read past 30 days engagement data from platform insights APIs
2. Identify top 3 and bottom 3 performing posts by platform
3. Cross-reference with content type, hook type, posting time
4. If a pattern is statistically clear (>20% difference):
   → Update scheduling.md or hook-engine.md with the finding
   → Note the change in the monthly self-assessment report
```

This runs separately from the weekly feedback loop and is logged in
the monthly report (`report/monthly-template.md` Section 7: Voice Drift Check).

---

## Feedback the Team Can Always Override

The team can force an immediate change at any time via Lark:

| Command | Action |
|---|---|
| "立刻复盘" / "Process feedback now" | Immediately trigger the Weekly Self-Assessment process (Step 1 to 4). Read ownerreview Lark Doc, absorb into `brand-voice.md`, mark as `[PROCESSED]`, and send the summary report. |
| "从现在起不要发[内容类型]" | Immediately stop that content type, update content-types.md |
| "以后[词语]换成[词语]" | Update brand-voice.md vocabulary table immediately |
| "暂停[平台]" | Move platform to pending_platforms, stop publishing there |
| "恢复[平台]" | Re-run credential check; if connected, move back to active_platforms |

Immediate commands take effect within the current publishing cycle.
No waiting for the Sunday self-assessment.

---

## What the AI Does NOT Self-Change

The following files are protected from self-modification:

- `allergen-gate.md` — food safety data, only updated by team directly
- `compliance/fda-ftc-rules.md` — regulatory rules, never self-modified
- `SOUL.md plugins.git-plugin-amc` section — only updated by explicit team command
- Lark Vault operational records — append-only, never deleted
