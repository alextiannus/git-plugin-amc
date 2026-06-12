---
name: tiktok
description: "Raw video, 15–60s, 2-second hook rule"
plugin: git-plugin-amc
---

# Skill · TikTok
# F&B Content Engine · platforms/tiktok.md
# ─────────────────────────────────────────

## Role in Repurpose Chain

**Step 2.** Take the Instagram concept and make it move.
Raw and unpolished beats over-produced every time on TikTok.

## Mandatory Context Preload

Before generating any TikTok script, shot list, or caption:
- Read `vault/brandcontext.md` first.
- If read fails, stop generation and report the blocker.
- Output this line at the top before strategy routing:
  `[BrandContext Loaded] vault/brandcontext.md loaded successfully before generation.`

---

## Posting Specs

| Setting | Value |
|---|---|
| Frequency | 5-7x per week |
| Best times | 11am–12pm · 6–8pm · 9–11pm |
| Duration | 15-60s (45s sweet spot for algorithm) |
| Aspect ratio | 9:16 vertical only |
| Hashtags | 3-5 (algorithm-driven; hashtags are discovery aids, not reach multipliers) |

---

## Strategy Pool & Router (策略池与决策机制)
**CRITICAL RULE:** Before generating any TikTok script/plan, you MUST evaluate the input and output your decision process at the top of your response:
`[Decision] I chose Strategy [A/B/C] because the input focuses on [Reason].`

- **Strategy A: The Sizzle/ASMR (沉浸食欲型)**
  - *Trigger:* Dishes with strong visual/audio elements (sizzling, pouring, cheese pull).
  - *Focus:* No talking, just raw sound and extreme close-ups.
  - *CTA:* Text overlay: "Wait for the crunch. 🔊"
- **Strategy B: The Process/BTS (后厨揭秘型)**
  - *Trigger:* Complex prep, unique ingredients, chef's skills.
  - *Focus:* Fast-paced cuts of the cooking process, voiceover explaining the "why".
  - *CTA:* Text overlay: "Would you eat this every day?"
- **Strategy C: The Reaction/Vlog (真实试吃型)**
  - *Trigger:* Customer features, new menu launches.
  - *Focus:* Authentic first bites, facial expressions, natural dialogue.
  - *CTA:* "Who's next to try the spicy challenge? 👇"

## The TikTok Formula

```
[0:00-0:02] Hook — sizzle, pour, steam, crack, unwrap
            Never: "Hey guys, today I'm going to show you..."
            Always: Start with the food. Mid-action if possible.

[0:02-0:35] The story / process / reveal
            Show the making. Show the texture. Show the reaction.
            Add overlay text for key info (price, dish name, spice level).

[0:35-0:45] CTA + price on screen
            "Order now → [link in bio]" or "Try it for $12.90"
```

---

## Content That Works on TikTok

- **The wok shot** — high heat, smoke, sizzle. 2 seconds of this stops the scroll.
- **The pull** — noodles, braised pork, cheese (if applicable). Slow pour or stretch.
- **The reveal** — closed container → open → steam. Works every time.
- **The reaction** — real first bite. Don't script it. Authentic reactions outperform.
- **The process** — hand-pulling noodles, wrapping dumplings, plating. Raw footage.
- **The number** — price or portion size on screen. "$12.90" is a hook by itself.

---

## Audio

- Use TikTok's **Commercial Music Library** for all business account posts
- Trending sounds boost reach IF they fit the content naturally
  → Never force a trending sound onto food content that doesn't match
- Check audio licensing before posting — trending sounds may not be commercial-cleared
- Always add subtitles (overlay text) — 70% watch without sound

---

## TikTok-Specific Compliance Rules

⚠️ TikTok has stricter content rules than other platforms:
- **No alcohol promotion** — even organic posts may be restricted
- **No weight-loss claims** — zero tolerance
- **No medical or health claims** — harsher enforcement than Instagram
- Branded Mission / Spark Ads tagging required for any paid amplification
- Do NOT use trending audio on business accounts without verifying commercial license

---

## Hook Selection for TikTok

Best performing hooks on TikTok (reference [[core/hook-engine]]):
1. Craving ★★★ — open with sound (sizzle, pour, crack)
2. BTS ★★★ — raw kitchen footage, process shots
3. Discovery ★★★ — "you didn't know we made this"
4. Contrarian ★★★ — "delivery doesn't mean soggy"

---

## Audience on TikTok

Mix of Hungry Locals and Explorers, skewing younger.
- Keep dish names in both ZH and EN (overlay text)
- Price always visible on screen (don't make them read the caption to find it)
- Shorter is better: 30-45s outperforms 60s for F&B content

---

## 🛑 Anti-Hallucination & Authenticity Rules

To maintain brand safety and organic authenticity, you MUST adhere to these strict constraints:
1. **Contact Info Placement (STRICT):** The main post caption MUST NOT contain the store address, operating hours, or contact phone number under any circumstances. You may ONLY mention these details in the first comment / replies. DO NOT use placeholders like `[Address]`.
2. **NO Fake Reviews:** NEVER invent "Customer Reviews" (顾客评价) or fake quotes from non-existent people. Organic posts should be written from the perspective of the brand or a genuine KOC. Invented reviews look like spam and violate authenticity guidelines.
3. **NO Rigid Templates:** Do NOT output content using rigid, robotic headings (e.g., `[特色亮点]`, `[优惠活动]`, `[店铺信息]`) unless explicitly required by the platform format (e.g., YouTube descriptions). Social media posts should flow naturally and conversationally, like a human wrote them.
