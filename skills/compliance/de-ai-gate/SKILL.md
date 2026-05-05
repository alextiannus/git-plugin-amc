---
name: de-ai-gate
description: "Scrubs robotic phrasing, AI-isms, and excessive formatting"
plugin: git-plugin-amc
---

# Skill · De-AI Gate (去AI化审核)
# F&B Content Engine · compliance/de-ai-gate.md
# ─────────────────────────────────────────────

## Purpose
This is the final compliance gate before any output is delivered. Its sole purpose is to detect and scrub "AI-isms" (Template Hallucination, Robotic Tone, Symmetrical Formatting) from generated content, ensuring the final copy reads exactly like a human wrote it.

---

## 🛑 Trigger Words & Patterns (Blacklist)

If ANY of the following patterns are found in the draft, you MUST rewrite the sentence to sound conversational, imperfect, and colloquial.

### Chinese AI-isms (中文高频机翻词)
- **Forbidden Starters:** "在这个快节奏的时代", "不可否认", "无疑是", "众所周知", "正如古语所说"
- **Forbidden Transitions:** "此外", "另外", "更重要的是", "让我们一起来探索", "不仅...而且..."
- **Forbidden Endings:** "还在等什么", "快来体验吧", "期待您的光临", "不仅仅是一道菜，更是一种..."
- **Corporate Speak:** "旨在", "致力于", "为您带来", "全方位", "极致体验"

### English AI-isms (英文高频机翻词)
- **Forbidden Verbs:** Delve, Elevate, Embark, Unleash, Discover, Transform
- **Forbidden Nouns:** Tapestry, Testament, Symphony (e.g., "A symphony of flavors"), Realm, Journey
- **Forbidden Transitions:** Moreover, Furthermore, In conclusion, Crucial, Essential, Not only... but also
- **Forbidden Clichés:** "Buckle up", "Look no further", "Take it to the next level"

---

## 🛑 Formatting Scrubbing Rules

Human social media posts are chaotic and fluid. AI posts are overly structured. You must scrub the following:

1. **Symmetrical Bullet Points:** If you see 4 bullet points that are all exactly the same length and use the exact same emoji structure, break them up. Make one longer, turn one into a regular sentence, or remove the emojis.
2. **Robotic Headings:** Remove bracketed or bolded structural headings like `[特色亮点]`, `[优惠活动]`, `[店铺信息]`, `**Why choose us?**`.
3. **Emoji Spam:** No more than 1 emoji per sentence. Never stack 3 emojis together (`🔥👇😋`).
4. **Hashtag Stuffing:** Keep hashtags at the very bottom, separated by a blank line. Do not inline hashtags (`Come try our #Spicy #Fish today`).

---

## Action Mandate
During the **Final Step · De-AI & Authenticity Audit** of the Repurpose Chain, if you detect any violations of this gate, do NOT explain the violation. Simply execute the rewrite silently and provide the final humanized output.
