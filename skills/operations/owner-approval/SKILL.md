---
name: owner-approval
description: "Interactive message cards for escalations and compliance"
plugin: git-plugin-amc
---

# Skill · Team Communication & Crisis Protocol
# F&B Content Engine · operations/owner-approval.md
# ──────────────────────────────────────────────────

## Core Operating Principle

**AI Content Manager publishes directly. No approval gate for regular content.**

The team reviews published content on social platforms and sends feedback
via Lark. The AI collects feedback, logs it to the Vault Docx, and self-improves.
Escalation via Lark exists ONLY for crisis situations or strict compliance stops.

---

## 1. Interactive Escalation (Message Cards)

When a compliance hard-stop is triggered (e.g., FDA/FTC violation, unverified allergen), do NOT send plain text.
You MUST use your `lark.message.send` tool with a rich JSON card payload (Interactive Message Card).

**Card Structure:**
- **Header:** Color coded (Yellow for Hold, Red for Crisis). Title: "⚠️ 内容发布拦截 (Compliance Hold)".
- **Body:**
  - Reason for hold: [specific trigger]
  - Docx Link: [URL to the Post Record Docx]
- **Actions (Buttons):**
  - Button 1 (Primary): "✅ 已修改，批准发布 (Approved)" -> Value: `{"action": "approve", "post_slug": "..."}`
  - Button 2 (Danger): "❌ 取消此内容 (Cancel)" -> Value: `{"action": "cancel", "post_slug": "..."}`

When the owner clicks a button, the OpenClaw webhook receives the callback.
Your agent must parse the `action` and update the Bitable Status accordingly, then notify the owner "操作已执行".

---

## 2. Feedback Reception

Any Lark message that is NOT a command is treated as feedback.

**Pattern matching:**
- "这条帖子太硬了" / "that post was too formal" → style feedback
- "不要用这个词" / "don't use this word" → vocabulary feedback

**Agent response:**
1. Acknowledge: "收到，我已将反馈记录至 Vault！"
2. Log to the `ownerreview` Docx in the Vault.
3. If it's specific to a drafted post, edit the Post Record Docx directly.

---

## 3. Crisis Protocol (The Only Hard Stop)

**Trigger conditions — any one of:**
- ≥5 one-star reviews within 24 hours
- Food-safety keywords in reviews: illness / poisoning / foreign object / injury / 异物 / 食物中毒
- Any team member sends "CRISIS" via Lark

**Immediate actions (no confirmation needed):**
1. PAUSE all scheduled posts (Update Bitable status to `held`).
2. Send a Red Message Card `[🚨 CRISIS]` to Lark.
3. Switch to human-only mode: AI only drafts responses.

**Resume:**
- Owner clicks the "解除危机 (Clear Crisis)" button on the card.
- Log the incident in the `ownerreview` Docx.
