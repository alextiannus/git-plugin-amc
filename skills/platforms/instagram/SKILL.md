---
name: instagram
description: "PRIMARY — carousel specs, reels, caption formula"
plugin: git-plugin-amc
---

# Skill · Instagram
# F&B Content Engine · platforms/instagram.md
# ─────────────────────────────────────────────

## Role in Repurpose Chain

**PRIMARY platform.** Write Instagram first. Every content idea starts here.
The visual constraint forces you to find the story before anything else.

---

## Posting Specs

| Setting | Value |
|---|---|
| Frequency | 5-7x per week |
| Best times | 11am–1pm · 5–7pm · 8–9pm |
| Peak days | Tuesday · Thursday · Saturday |
| Aspect ratio | 1:1 (square) or 4:5 (portrait) — never landscape |
| Hashtags | 5-8 per post, in caption |

---

## Content Formats

### Carousel (primary format — 70% of posts)
- 7-10 slides (7 is the sweet spot)
- Slide 1: bold hook + mouth-watering image
- Slides 2-6: dish close-ups, ingredients, value, social proof
- Slide 7: CTA + price + "order now" or "link in bio"
- Caption: 150-200 words. Hook must appear before "...more" truncation (first ~125 chars)

### Reels (short-form video — 30% of posts)
- Duration: 15-60s
- Hook in first 2 seconds
- Use trending audio from Commercial Music Library
- Overlay text for captions (70% watch without sound)
- See [[core/content-types]] Type 2 for full video specs

---

## Content Writing & Caption Best Practices (写作技巧)

Great Instagram content doesn't just describe the photo—it tells a story, adds value, and drives action. Always apply the **"So What?" Test**: Does this caption solve a problem, entertain, or offer a new perspective? If not, rewrite it.

### 1. Strategy Pool & Router (策略池与决策机制)
**CRITICAL RULE:** Before generating any Instagram content, you MUST evaluate the input and output your decision process at the top of your response:
`[Decision] I chose Strategy [A/B/C] because the input focuses on [Reason].`

- **Strategy A: The Craving (视觉诱惑型)**
  - *Trigger:* New dish, signature dish, or high-quality food photography.
  - *Focus:* Sensory details, texture, "mouth-watering" descriptions. 
  - *CTA:* "Tag someone who owes you a meal like this. 👇"
- **Strategy B: The Deal (促销转化型)**
  - *Trigger:* Lunch specials, limited-time discounts, set meals.
  - *Focus:* Clear value, price comparison, urgency.
  - *CTA:* "Save this post for your next lunch break. 📌"
- **Strategy C: The Story (品牌共情型)**
  - *Trigger:* Behind-the-scenes, chef interviews, restaurant milestones.
  - *Focus:* Authenticity, human element, local community connection.
  - *CTA:* "Drop a ❤️ if you've been eating with us since day 1."

### 2. The Anatomy of a High-Converting Caption

```
[The Hook: Scroll-stopping first line, MUST be < 125 chars]
[Empty Line]
[The Body: Value-driven storytelling, 2-4 short paragraphs]
[Empty Line]
[The CTA: One specific, frictionless action]
[Empty Line]
[Hashtags: 5-8 hyper-relevant tags]
```

### 2. Crafting the Perfect Hook
The hook is the only text users see before the "...more" truncation. Make it count.
- **The Question Hook:** "Where's the best spicy food in town? We found it."
- **The Bold Claim:** "You've been eating dumplings wrong your entire life."
- **The Empathy Hook:** "Too tired to cook tonight? We've got you."

### 3. The Body (Storytelling & Value)
- **Ditch the Hard Sell:** Instead of "Buy our $16.90 noodles," focus on the experience: "Wok-fired at high heat so every bite has that authentic smoky flavor."
- **Format for Scannability:** No walls of text. Use generous white space (line breaks) and use emojis sparingly as bullet points. 
- **Increase Dwell Time:** Longer, engaging captions keep users on the post longer, which signals the algorithm to push the post to more feeds.

### 4. Call to Action (CTA) & Engagement
The algorithm favors Comments, Saves, and Shares over simple Likes. Design your CTA to drive these specific actions:
- **For Saves:** "Save this post for your next weekend date night idea. 📌"
- **For Shares:** "Tag a friend who owes you a hotpot dinner. 👇"
- **For Comments:** "What's your spice tolerance: 1 (Mild) or 10 (Volcano)? Let us know below! 🌶️"

**Example:**
```
Fresh out of the wok and ready in 15 minutes. 🔥

Our 麻辣香锅 (Dry-Spicy Stir-Fry Pot) isn't just spicy; it's a 
masterclass in flavor building. Wok-fired at high heat, with 
a hand-picked spice level that hits perfectly. 

At $16.90 for a portion that actually fills you up, it's 
the ultimate comfort food for a long day. 

Tag your spicy-food buddy who needs to see this. 👇
Contains: peanuts, sesame, soy.

#chinesefood #fooddelivery #malaxiangguo #authenticchinese
```

---

## Audience on Instagram

**Hungry Locals** (primary) — deciding what to eat right now
→ Lead with price, portion, and speed
→ Strong visual on Slide 1

**Explorers** (secondary) — discovering Chinese food
→ Include dish name with cultural context
→ "First-timer" framing works well in carousel format

---

## Hook Selection for Instagram

Best performing hooks on Instagram (reference [[core/hook-engine]]):
1. Craving ★★★ — sizzle/steam/texture in Slide 1 image + first caption line
2. Deal ★★★ — price in first line before truncation
3. Discovery ★★★ — "hidden menu item" or "most-reordered" framing

---

## Instagram-Specific Rules

- Never post landscape-format images (will be cropped on feed)
- Never use more than 8 hashtags (looks spammy, hurts reach)
- Always include allergen disclosure if dish contains a major allergen (see [[compliance/allergen-gate]])
- Branded content tag required if post is part of a paid partnership
- Stories: post daily if possible; use polls and questions to drive engagement
- Link in bio: update whenever a new deal or dish is being promoted

---

## 🛑 Anti-Hallucination & Authenticity Rules

To maintain brand safety and organic authenticity, you MUST adhere to these strict constraints:
1. **NO Fake Contact Info:** NEVER hallucinate or invent store addresses, phone numbers, or operating hours. If they are not explicitly provided in your memory (`brand-voice.md`, `owner-profile.md`, or the prompt), simply omit them or use a placeholder like `[等待主理人补充]`.
2. **NO Fake Reviews:** NEVER invent "Customer Reviews" (顾客评价) or fake quotes from non-existent people. Organic posts should be written from the perspective of the brand or a genuine KOC. Invented reviews look like spam and violate authenticity guidelines.
3. **NO Rigid Templates:** Do NOT output content using rigid, robotic headings (e.g., `[特色亮点]`, `[优惠活动]`, `[店铺信息]`) unless explicitly required by the platform format (e.g., YouTube descriptions). Social media posts should flow naturally and conversationally, like a human wrote them.
