# F&B Content Engine (AMC) — Product Roadmap

This document outlines the strategic future enhancements for the OpenClaw AMC plugin, moving it from a robust operational executor to an autonomous growth director.

## 🚀 Near-Term Priorities (Low Effort, High Impact)

### 1. Vision-Gate: Intelligent Asset Pre-Screening
- **Concept:** Introduce a Visual Language Model (VLM) gate before drafting posts.
- **Action:** When an owner uploads food photos, the AI scores them for "appetite appeal" (lighting, focus, composition). If the asset is subpar, it proactively suggests edits (e.g., "The lighting is a bit dark, could you brighten it before I post?") rather than publishing low-quality visuals.

### 2. Local Trend & Competitor Radar
- **Concept:** Leverage Browser Automation to shift from scheduled posting to reactive trending.
- **Action:** Add a `trend-radar` cron job that scrapes local trending hashtags on TikTok/RedNote (e.g., #SingaporeFoodie). If a viral trend emerges, the AI drafts a pitch: "Boss, 'listening-to-advice' style videos are trending locally. We should shoot one today. Here is the script."

## 🚀 Mid-Term Priorities (Growth & Conversion)

### 3. Dynamic Offer Engine (Traffic-to-Footfall)
- **Concept:** Bridge the gap between social media awareness and in-store conversion.
- **Action:** The AI monitors post engagement. If a post hits 200% above the baseline, the AI automatically generates a limited-time promo code (e.g., `SPICY20`) and pins it to the comment section to drive immediate footfall.

### 4. VIP Community CRM (Core Customer Memory)
- **Concept:** Transition from rule-based comment replies to persona-based community management.
- **Action:** Maintain a `vip-fans.json` memory bank. When a user comments for the 3rd time, the AI recognizes them: "Thanks for coming back @foodie_sg! Mention this comment to our manager next time for a free side dish."

### 5. A/B Testing Self-Evolution Loop
- **Concept:** Move from passive "learning from owner" to active "learning from data".
- **Action:** The AI generates two hooks (e.g., Story-driven vs. Offer-driven) for the same dish, posts them on different platforms/times, analyzes the engagement data during the end-of-month review, and automatically updates `brand-voice.md` with the winning format.
