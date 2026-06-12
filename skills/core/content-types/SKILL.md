---
name: content-types
description: "Format specs per platform: carousel, reels, short video, etc."
plugin: git-plugin-amc
---

# Skill · Content Types
# F&B Content Engine · core/content-types.md
# ──────────────────────────────────────────

## Purpose

Define the exact format specifications for each content type.
Every post must conform to one of these types before publishing.

## Mandatory Context Preload

Before generating content in any type below:
- Read `vault/brandcontext.md` first.
- If read fails, stop generation and report the blocker.
- Start output with:
  `[BrandContext Loaded] vault/brandcontext.md loaded successfully before generation.`

---

## Type 1 · Carousel / Slide Post

**Primary platform:** Instagram
**Secondary:** Facebook (occasionally)

**Specs:**
- 7-10 slides (7 is the sweet spot; algorithm favors completion)
- Slide 1: Bold hook — single claim, mouth-watering image, or contrarian statement
- Slides 2-6: Supporting content (dish close-ups, ingredients, value props, social proof)
- Slide 7: CTA + price + ordering link or "link in bio"
- Aspect ratio: 1:1 (square) or 4:5 (portrait) — never landscape
- Caption: 150-200 words. Hook in first line (before "more" truncation). End with CTA.
- Hashtags: 5-8, in caption (not first comment for restaurant accounts)

**Hook formula for Slide 1:**
```
[Dish name or bold claim]
[One line that creates craving or curiosity]
[Price — if deal content]
```

---

## Type 2 · Short-Form Video

**Primary platforms:** TikTok, Instagram Reels
**Secondary:** YouTube Shorts

**Specs:**
- Duration: 15-60s (45s sweet spot for TikTok algorithm as of 2026)
- Hook in first 2 seconds: must be visual or auditory (sizzle, pour, steam, crack)
- No "hey guys" or slow intros — start with the food
- Captions/subtitles: required (70% of viewers watch without sound)
- Aspect ratio: 9:16 (vertical only)
- End card: price + CTA on screen for final 3-5 seconds

**Script structure:**
```
[0:00-0:02] Hook (sound or visual)
[0:02-0:35] Story / process / reveal
[0:35-0:45] CTA + price
```

---

## Type 3 · Long-Form Video

**Primary platform:** YouTube

**Specs:**
- Duration: 8-12 minutes
- Title: SEO-optimized — include dish name + location keyword
  Example: "Hand-Pulled Noodles in [City] — 12eat唐人街外卖 Kitchen Tour"
- Description: Full summary + chapter timestamps + menu link + ordering CTA
- Chapters: Required. Add timestamp markers every 2-3 minutes.
- Thumbnail: Close-up food shot + text overlay (max 6 words)
- Aspect ratio: 16:9

**Outline structure:**
```
[0:00] Hook — most compelling moment of the video
[0:30] What this video is about (don't overexplain)
[1:00] Main content (recipe / tour / story)
[8:00] Takeaway + CTA
[9:00] End screen (subscribe + related video)
```

---

## Type 4 · Long-Form Text Post

**Primary platforms:** RedNote 小红书, Facebook

**RedNote specs:**
- Length: 300-600 characters (Chinese) / 200-400 characters (English)
- Structure: Personal experience → dish details → verdict → price
- Hashtags: 3-5, relevant to cuisine type and location
- Tone: Personal, honest, first-person ("我觉得这个…")
- Images: 3-9 photos, food-first, lifestyle second

**Facebook specs:**
- Length: 100-300 words
- Always end with a discussion question or CTA
- Tag local community groups when relevant
- Images: 1-4 photos (algorithm doesn't penalize text-heavy posts on FB)

---

## Type 5 · Short Take

**Primary platform:** X / Twitter
**Secondary:** Instagram (caption-only, no carousel)

**Specs:**
- X: ≤280 characters, OR long-form thread (1-2k words) for deep industry takes
- Must have a clear opinion or contrarian angle — never promotional without a hook
- No hashtags on X (they reduce reach as of 2025)
- No emojis unless they serve the sentence (not decoration)

---

## Type 6 · Reputation Reply

**Primary platform:** Google Maps / Google Business
**Secondary:** Yelp, OpenTable (if applicable)

**Specs:**
- Response to positive reviews: Thank + personalize (mention dish if they named one) + invite back
- Response to negative reviews: Acknowledge + apologize (no excuses) + offer resolution + move offline
- Length: 2-4 sentences. Never defensive. Never copy-paste the same reply.
- Response time: Within 24h for all reviews (SLA)
- Never offer discounts in review replies (FTC + Google policy violation)

**Templates:**
```
Positive (customize each one):
"[Name], thank you so much! We're so glad [specific dish] hit the spot.
Our [chef/team] works hard to make sure every [dish] is [specific quality].
See you next time — tell us what you'd like to try! 🙏"

Negative (never defensive):
"Hi [Name], we're really sorry to hear this — that's not the experience
we want anyone to have. Please reach out to us directly at [contact]
so we can make it right. Thank you for taking the time to share."
```

---

## Type 7 · Trending-Radar Riff

**Primary platforms:** TikTok, X
**Secondary:** Instagram Reels

**Specs:**
- React to or remix a trending topic/format within 24h of detection
- Must connect to food, restaurant, or community (no forced relevance)
- Use the trending audio or format on TikTok (algorithm boost)
- Keep the brand voice intact — we riff, we don't abandon our personality
- Time-sensitive: if you can't publish within 24h of trend peak, skip it

**Trigger:** [[operations/cron-jobs]] 06:30 Trending Radar refresh identifies qualifying trends
**Decision:** Only riff if the trend can connect to food naturally and passes Compliance Gate

---

## Content Mix Guidelines (per week, per platform)

| Platform | Deal/Value | Dish Showcase | BTS/Process | Community | Trending |
|---|---|---|---|---|---|
| Instagram | 30% | 40% | 20% | 10% | as needed |
| TikTok | 20% | 30% | 30% | 5% | 15% |
| RedNote | 25% | 40% | 20% | 15% | — |
| Facebook | 30% | 25% | 15% | 30% | — |
| YouTube | — | 40% | 40% | 20% | — |
| X | — | — | — | — | 100% (contrarian only) |
