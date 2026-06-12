---
name: youtube
description: "SEO-optimised, 8–12 min long-form"
plugin: git-plugin-amc
---

# Skill · YouTube
# F&B Content Engine · platforms/youtube.md
# ─────────────────────────────────────────

## Role in Repurpose Chain

**Step 5 — IF APPLICABLE.**
Not every content idea needs YouTube. Only produce YouTube content when the idea genuinely benefits from longer treatment. Skip and move to Step 6 if it doesn't.

## Mandatory Context Preload

Before generating any YouTube title/outline/description:
- Read `vault/brandcontext.md` first.
- If read fails, stop generation and report the blocker.
- Output this line at the top before any draft:
	`[BrandContext Loaded] vault/brandcontext.md loaded successfully before generation.`

**Qualifying topics:** recipes, kitchen tours, chef stories, dish origin stories, "how it's made", ordering guides, cultural explainers
**Skip for:** deal alerts, lunch specials, single-dish promos, anything under 5 min of real substance

---

## Posting Specs

| Setting | Value |
|---|---|
| Frequency | 1x per week (when applicable) |
| Duration | 8-12 minutes |
| Upload time | Saturday or Sunday, 2–4pm (for Monday morning algorithm boost) |
| Aspect ratio | 16:9 |
| Subtitles | Required — add ZH subtitles option for Chinese-speaking audience |
| Language | EN primary; ZH subtitles |

---

## Title Formula (SEO-Optimized)

```
[Dish Name or Action] + [Location Keyword] + [Brand or Hook]
```

**Examples:**
- "Hand-Pulled Noodles in [City] — How We Make Them Fresh Every Morning"
- "What to Order at a Chinese Delivery Restaurant (First-Timer's Guide)"
- "麻辣香锅 Dry-Spicy Stir-Fry: Full Recipe + Our Secret Spice Blend"
- "$12.90 Lunch Set — Is It Worth It? (Honest Review)"

**Rules:**
- Include the dish name (searchable keyword)
- Include location if targeting local audience
- Keep under 60 characters (prevents truncation in search results)
- No clickbait that the video doesn't deliver on

---

## Video Outline Structure

```
[0:00]       Hook — most compelling moment of the video (not an intro)
[0:15-0:30]  What this video is about (brief, don't over-explain)
[0:30-1:00]  Setup / context
[1:00-8:00]  Main content (recipe / tour / story / guide)
[8:00-9:00]  Takeaway / verdict
[9:00-10:00] CTA: subscribe, link in bio, order now
[10:00]      End screen (related video + subscribe button)
```

**Hook rule:** Open with the most visually compelling moment — the finished dish, the wok fire, the noodle pull. YouTube thumbnails and first 15 seconds determine 90% of click-through decisions.

---

## Description Template

```
[2-3 sentence summary of what the video covers]

⏱️ Chapters:
0:00 Introduction
1:00 [Chapter 2]
3:30 [Chapter 3]
...

🍜 Dish featured: [Dish ZH] (Pinyin, EN name)
🏪 Order here: [ordering link]
📍 Location: [brand location or delivery area]

[Any allergen disclosures if recipe shown]

#[keyword1] #[keyword2] #[keyword3]
```

---

## Thumbnail Guidelines

- Close-up food shot at the most appetizing moment
- Text overlay: max 6 words, large font, high contrast
- Warm color grading (food looks better warm)
- NO misleading thumbnail — must represent actual video content (YouTube policy)
- Size: 1280x720 minimum

---

## YouTube-Specific Rules

- All music must be from YouTube Audio Library or licensed tracks — Content ID will flag everything else
- Chapter timestamps are required for videos over 5 minutes
- Do not promise results in the title that the video doesn't deliver (misleading content policy)
- Community posts (YouTube's social layer): use 1-2x per week to keep channel active between uploads

---

## 🛑 Anti-Hallucination & Authenticity Rules

To maintain brand safety and organic authenticity, you MUST adhere to these strict constraints:
1. **Contact Info Placement (STRICT):** The main post caption MUST NOT contain the store address, operating hours, or contact phone number under any circumstances. You may ONLY mention these details in the first comment / replies. DO NOT use placeholders like `[Address]`.
2. **NO Fake Reviews:** NEVER invent "Customer Reviews" (顾客评价) or fake quotes from non-existent people. Organic posts should be written from the perspective of the brand or a genuine KOC. Invented reviews look like spam and violate authenticity guidelines.
3. **NO Rigid Templates:** Do NOT output content using rigid, robotic headings (e.g., `[特色亮点]`, `[优惠活动]`, `[店铺信息]`) unless explicitly required by the platform format (e.g., YouTube descriptions). Social media posts should flow naturally and conversationally, like a human wrote them.
