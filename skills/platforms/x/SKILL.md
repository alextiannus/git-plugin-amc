---
name: x
description: "Contrarian angle, 280 chars"
plugin: git-plugin-amc
---

# Skill · X / Twitter
# F&B Content Engine · platforms/x.md
# ─────────────────────────────────────

## Role in Repurpose Chain

**Step 6 — IF APPLICABLE.**
X is the last stop in the chain, and the most conditional.
Only post to X if the content has a genuine contrarian angle, industry observation, or sharp opinion. Never post just to fill the frequency quota.

## Mandatory Context Preload

Before generating any X short take or thread:
- Read `vault/brandcontext.md` first.
- If read fails, stop generation and report the blocker.
- Output this line at the top before strategy routing:
  `[BrandContext Loaded] vault/brandcontext.md loaded successfully before generation.`

**Ask before posting to X:** "Does this have an opinion worth saying out loud?"
- Yes → write it
- No → skip X for this topic

---

## Posting Specs

| Setting | Value |
|---|---|
| Frequency | 2-3x per week (only when there's a genuine contrarian angle) |
| Best times | 12–1pm · 5–6pm |
| Short post | ≤280 characters |
| Long post | Thread or article (1-2k words) for deep industry takes |
| Hashtags | None (hashtags reduce reach on X as of 2025) |
| Emojis | Only if they serve the sentence — not decoration |

---

## Strategy Pool & Router (策略池与决策机制)
**CRITICAL RULE:** Before generating any X content, you MUST evaluate the input and output your decision process at the top of your response:
`[Decision] I chose Strategy [A/B/C] because the input focuses on [Reason].`

- **Strategy A: The Contrarian Take (反共识爆论型)**
  - *Trigger:* Industry norms you disagree with, common customer complaints you solve.
  - *Focus:* Sharp, punchy, challenging the status quo. 
  - *Example:* "Hot food delivered cold is a choice. We chose differently."
- **Strategy B: The Behind-the-Curtain (行业真相型)**
  - *Trigger:* Pricing logic, supply chain, chef's decisions.
  - *Focus:* Transparency, numbers, explaining the "why" behind restaurant operations.
  - *Example:* "Why our noodles cost $15 instead of $10 (a thread):"
- **Strategy C: The Quick Drop (简单粗暴型)**
  - *Trigger:* Immediate, high-value limited offer.
  - *Focus:* Zero fluff, pure utility.
  - *Example:* "50 portions of off-menu spicy beef left. Open until 11. Link below."

## What Works on X

### Short Takes (≤280 chars)

Sharp, opinionated, quotable. One clear point. No hedging.

**Strong examples:**
- "Delivery doesn't mean soggy. Not ours anyway."
- "You don't need to spend $30 for great Chinese food."
- "Authentic doesn't mean complicated. Our best dish has 4 ingredients."
- "Hot food delivered cold is a choice. We chose differently."
- "The lunch rush hits at 11:30. Your order placed at 11:00 gets there first. Just saying."

**Formula:** [Assumption everyone holds] + [contradiction we can prove]

---

### Long-Form Thread (for industry takes)

Use when there's a topic worth 10+ tweets:
- "Why Chinese food delivery pricing is actually fair (a thread)"
- "What makes hand-pulled noodles different from machine-cut (and why it matters)"
- "Everything wrong with how people think about Chinese food in [city]"

Thread formula:
```
Tweet 1: The strong contrarian claim (hook)
Tweets 2-8: Evidence, examples, one per tweet
Tweet 9: Takeaway
Tweet 10: CTA (link to order, or just a question)
```

---

## Hook Selection for X

Best performing hooks on X (reference [[core/hook-engine]]):
1. Contrarian ★★★ — challenge a food assumption
2. Discovery ★★ — industry insight, not just product promo

Avoid on X:
- Deal hooks (X audience doesn't come here to see promotions)
- Community hooks (low engagement on X for restaurant content)
- Craving hooks (X is text-first; food photos perform much better on IG/TikTok)

---

## X-Specific Rules

- No hashtags (confirmed to reduce reach on X as of 2025)
- No promotional posts without an opinion hook — pure promotions die on X
- Never tag a competitor by name (YELLOW compliance flag → Tier 2 escalation)
- Replies and threads drive more reach than standalone posts
- Engage with relevant food/restaurant industry conversations to build presence
- Quote-tweet industry news with a brand perspective when relevant

---

## When to Skip X

Skip X for this topic if:
- The content is purely promotional (deal, new dish announcement, deal alert)
- There is no contrarian or industry angle
- The topic has already been posted to IG/TikTok and nothing new can be said
- The brand is in crisis mode (see [[operations/owner-approval]])

---

## 🛑 Anti-Hallucination & Authenticity Rules

To maintain brand safety and organic authenticity, you MUST adhere to these strict constraints:
1. **Contact Info Placement (STRICT):** The main post caption MUST NOT contain the store address, operating hours, or contact phone number under any circumstances. You may ONLY mention these details in the first comment / replies. DO NOT use placeholders like `[Address]`.
2. **NO Fake Reviews:** NEVER invent "Customer Reviews" (顾客评价) or fake quotes from non-existent people. Organic posts should be written from the perspective of the brand or a genuine KOC. Invented reviews look like spam and violate authenticity guidelines.
3. **NO Rigid Templates:** Do NOT output content using rigid, robotic headings (e.g., `[特色亮点]`, `[优惠活动]`, `[店铺信息]`) unless explicitly required by the platform format (e.g., YouTube descriptions). Social media posts should flow naturally and conversationally, like a human wrote them.
