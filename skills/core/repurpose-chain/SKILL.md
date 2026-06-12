---
name: repurpose-chain
description: "IG-first 7-step content repurpose chain across 7 platforms"
plugin: git-plugin-amc
---

# Skill · Repurpose Chain
# F&B Content Engine · core/repurpose-chain.md
# ─────────────────────────────────────────────

## Purpose

Turn one content idea into platform-native posts for all active platforms.
Never copy-paste. Each platform version must feel native to that platform.

---

## Chain Order (always follow this sequence)

### Step 0 · Context, Memory & External Skills Injection
Before drafting ANY content, you MUST complete this preparation step to ensure long-term learning and leverage all your capabilities.

**Hard requirement:** `vault/brandcontext.md` must be loaded before any draft lines are written. If it cannot be read, stop generation and report the blocker.

**1. Memory Check:** Silently read the **local file** `vault/brandcontext.md` from the local file system to recall brand positioning, audience defaults, platform strategy, and current promotion context. (Do NOT use `mcp.lark.drive` or `mcp.lark.docs` to read this; read the local copy directly.)
**2. Asset Check:** Silently check `vault/media/media-index.md` for any existing approved assets that match the current content topic. Note which assets are available before drafting.
**3. Audience Check:** Read the audience section in `vault/brandcontext.md`. Note the current audience layer distribution, new-vs-returning ratio, and platform-specific audience defaults. Decide which audience layer this content should target.
**4. Winner Pattern Check:** Read the winner-pattern section in `vault/brandcontext.md`. Find any activated patterns matching the current platform(s) and product category. Note the recommended hook_type(s).
**5. Cross-Skill Check:** Scan your active OpenClaw tools (e.g., `mcp.bash` for AMC Kanban publish calls) and any installed external Skill Packs (e.g., `marketing`, `video-creation`, `copywriting`).
**6. Decision Output:** At the very top of your response, BEFORE any platform drafts, output your memory and skill routing:
> `[BrandContext Loaded] vault/brandcontext.md loaded successfully before generation.`
> `[Memory Loaded] I noted recent feedback: [Brief Summary]. I will apply it here.`
> `[Assets Available] Matching assets: [filenames or 'none found'].`
> `[Audience Target] Layer: [Discoverer|Considerer|Regular|Advocate] | New/Return ratio this week: [X%/X%] | Recent signal: [saves|shares|comments].`
> `[Winner Pattern] Recommended hook for this topic: [hook_type] — based on [N] winning posts.`
> `[Pillar] This content belongs to: [Pillar Name] | Week ratio: [actual%] → target [target%] | Gap pillars this week: [pillar names or 'none'].`
> `[Skills Activated] For this task, I will additionally invoke: [Skill Name 1], [Skill Name 2].`

---

### Step 1 · Instagram (write FIRST — visual hook)

Write Instagram first. This forces you to find the visual story before anything else.

**Platform DNA:** Aspirational, polished, aesthetic-driven. Audience scrolls fast — you have 0.5 seconds to stop them.

**DO NOT:**
- Start with "Introducing..." or "We are proud to present..."
- Use generic filler like "Delicious food awaits!" or "Come and try!"
- Write more than 125 characters before the first line break
- Use more than 8 hashtags

**Output format:**
```
[HOOK — ≤125 chars, must be scroll-stopping. Options: bold claim, surprising fact, sensory description, or question]

[1-2 lines of blank space]

[Body — 2-4 short paragraphs. Sensory details: colour, texture, smell, temperature. Tell a micro-story.]

[Soft CTA — one line, conversational. "Link in bio to order." / "DM us to book your table."]

[Hashtags — 5-8 only. Mix: 2 broad (#chinesefood), 2 niche (#[city]eats), 1-2 brand-specific]
```

**Content format:** 7-10 slide carousel (preferred) OR single hero image + caption

> 📷 **After drafting this platform's content, immediately output a Visual Brief** following `[[core/visual-brief]]` — Instagram format (1:1 or 4:5, carousel specs).

---

### Step 2 · TikTok (raw, native, movement-first)

Do NOT adapt the Instagram caption. Start from scratch with a video-native brain.

**Platform DNA:** Raw > polished. Authentic > branded. Fast-paced, sound-on, native editing style. If it looks like an ad, it loses.

**DO NOT:**
- Write a script that starts with the brand name
- Use formal or marketing language ("premium quality", "authentic experience")
- Plan a shot longer than 3 seconds without a new angle
- Include text overlays that cover the food

**Output format:**
```
HOOK (0:00–0:02): [One-word or one-action hook — sizzle sound, sauce pour, steam rising, crunch reveal]

BUILD (0:02–0:15): [The "how" or "wow" — process, transformation, or unexpected detail]

PEAK (0:15–0:22): [The money shot — final dish, portion reveal, or reaction]

CTA (0:22–0:30): [Price on screen + one-line text: "Order at [link]" or "DM us 🔥"]

Text overlays: [List any captions to overlay — keep to ≤5 words each]
Sound direction: [Trending audio / natural kitchen sounds / voiceover — specify]
```

> 📷 **After drafting this platform's content, immediately output a Visual Brief** following `[[core/visual-brief]]` — TikTok format (9:16 video, include Shot List).

---

### Step 3 · 小红书 RedNote (personal diary, not marketing copy)

**Platform DNA:** 小红书 users trust peer reviews, not brand accounts. Write as if a real person is sharing their genuine experience — not as a brand promoting itself.

**DO NOT:**
- Write in third person ("The restaurant offers...")
- Use promotional superlatives ("best", "most authentic", "must-try")
- Ignore emoji — they are native to the platform
- Forget to include prices (users expect them)

**Output format:**
```
标题 Title (≤20 chars, emoji optional): [Hook — question, bold claim, or personal confession]

正文 Body:
第一段 Para 1: [Personal hook — "上周去吃了这家..."] 
第二段 Para 2: [Sensory experience — taste, texture, portion size, value]
第三段 Para 3: [Honest opinion — what's great, what could be better]
第四段 Para 4: [Practical info — price per dish, address, hours]

话题标签 Tags (3-5): [Mix of broad 美食 and local 城市美食]
```

**Length:** 300–500 characters (not words). Tight and scannable.

> 📷 **After drafting this platform's content, immediately output a Visual Brief** following `[[core/visual-brief]]` — 小红书 format (3:4 carousel, cover must have large readable title).

---

### Step 4 · Facebook (community conversation, not broadcast)

**Platform DNA:** Facebook feeds community, not trend. Users are older, more conversational, and respond to nostalgia, belonging, and discussion questions.

**DO NOT:**
- Copy-paste the Instagram caption
- Use hashtags heavily (2 max on Facebook)
- Post without a conversation hook at the end

**Output format:**
```
[Opening — 1 sentence that feels like you're talking to a friend, not an audience]

[Body — 3-5 sentences. Context, story, or memory trigger. More text is OK here.]

[Question CTA — must invite a real response. "What's your go-to order?" / "Tag the person you'd bring here 👇"]

[Optional: Tag a local community group or page if relevant]

Hashtags: 1–2 max
```

> 📷 **Visual:** Reuse the Instagram carousel asset (note which files). Only output a new Visual Brief if Facebook needs a different crop or format.

---

### Step 5 · YouTube (deep storytelling — IF APPLICABLE)

Only create YouTube content if the idea genuinely benefits from longer treatment. Skip if it doesn't.

**Qualifying topics:** recipes, kitchen tours, chef stories, dish origin stories, supplier visits, "how it's made"
**Skip for:** deal alerts, lunch specials, single-dish promos

**Platform DNA:** YouTube is search-driven. Title and thumbnail are 80% of the battle. Write for someone searching "best [dish] in [city]" — not for existing fans.

**Output format:**
```
Title (SEO): [Dish name + location keyword + hook — e.g., "How We Make Authentic Dan Dan Noodles | [City] Chinese Food"]
Thumbnail text: [3–5 bold words max]

Outline:
[0:00–0:30] Hook — what's the payoff? Show the finished dish first.
[0:30–2:00] Context — brand story or dish origin in ≤90 seconds
[2:00–6:00] Core content — process, interview, or deep-dive
[6:00–7:30] Taste/reaction moment
[7:30–8:00] CTA — subscribe, order link, next video

Description (first 150 chars are visible): [SEO-rich, keyword-dense first sentence]
Tags: [10–15 specific search terms]
```

> 📷 **After drafting this platform's content, immediately output a Visual Brief** following `[[core/visual-brief]]` — YouTube format (16:9 video + thumbnail brief with text ≤5 words).

---

### Step 6 · X / Twitter (sharp take, not promotion)

Only post to X if there's a contrarian, witty, or industry angle worth a sharp line. Skip purely promotional content entirely.

**Platform DNA:** X rewards opinions, not announcements. If it sounds like a press release, delete it.

**DO NOT:**
- Post "We're excited to announce..."
- Restate what's already on Instagram
- Use more than 2 hashtags

**Qualifying angles:** Industry observation / hot take / behind-the-scenes fact / price transparency / cultural commentary

**Output format:**
```
Option A — Single tweet (≤280 chars):
[Sharp observation or hot take — state it plain, no fluff]

Option B — Thread (if the angle needs depth):
1/ [Hook tweet — the thesis, ≤280 chars]
2/ [Evidence or story]
3/ [Counter-argument or nuance]
4/ [Conclusion + CTA]
```

> 📷 **Visual:** Reuse existing assets. If none available, a branded text-on-image card is sufficient — no new shoot needed.

---

### Step 7 · Google Maps (reputation layer — implicit)

Not part of the content publish chain. After every piece of content, ask:
> "Does this content highlight something worth a Google review?"

Surface those moments naturally. Never explicitly ask for reviews in exchange for anything (FTC + Google Terms violation).

---

## Gates (run on EVERY platform draft, in this order)

```
1. Compliance Gate → [[compliance/fda-ftc-rules]] + [[compliance/allergen-gate]]
   RED hit  → block, create owner-approval entry, do NOT proceed
   YELLOW   → flag, hold for owner sign-off

2. Bilingual Gate → [[localization/bilingual-gate]]
   Confirm language per platform decision tree
   Ensure canonical dish names on first mention

3. Owner Gate → [[operations/owner-approval]]
   Only triggers on flagged drafts (Tier 1 or 2 conditions)

4. De-AI Gate → [[compliance/de-ai-gate]]
   Scrub out "AI-isms", robotic phrasing, and symmetrical templates.
   Silently rewrite any offending sentences to be colloquial and human-like before final output.
```

---

## The Litmus Test

Before finalizing any set of platform versions, ask:

> "If someone followed us on ALL platforms, would they be annoyed seeing the same thing?"
> - **Yes** → you're reformatting, not rethinking. Go back to Step 1.
> - **No** → you've made unique pieces from one idea. Ship.

---

## Batch Workflow (recommended)

```
1. Pick 2-3 menu items or themes for the week
2. For each idea, run Steps 1-6 in ONE session (not spread across days)
3. Pass each draft through both Gates BEFORE moving to the next step
4. Schedule via [[core/scheduling]] to stagger across the week
5. Track performance per platform; adjust the chain weekly
```

Weekly batch target: 15-25 posts covering all active platforms for the week.
