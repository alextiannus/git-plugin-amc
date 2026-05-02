---
name: menu-copywriting
description: "Dish description formula for F&B social content: sensory detail + origin + emotional hook — turns menu items into craveable copy"
version: "1.0.0"
tier: community
category: fb-specific
author: "12eat AI Lab"
license: MIT
min_plugin_version: "0.5.5"
---

# Menu Copywriting

Most restaurant social content fails because it describes food the way a menu does — ingredients and portion size — instead of the way a craving works. This skill teaches the agent to write dish descriptions that trigger appetite and desire, not just inform.

---

## When to Use

- Writing captions for single-dish feature posts
- Creating Google Business Profile menu descriptions
- Writing dish descriptions for carousel slides
- Generating content for new menu item launches

## When NOT to Use

- Writing allergen information (use `allergen-gate` skill instead)
- Pricing announcements (keep factual)
- Nutritional content claims (use `fda-ftc-rules` skill for compliance)

---

## The Dish Description Formula

```
[SENSORY LEAD] + [TECHNIQUE OR ORIGIN] + [OCCASION OR EMOTION]
```

### Component Breakdown

**Sensory Lead** (mandatory)
Lead with the most vivid sensory detail — not how it looks on a plate, but how it feels in the moment of eating. Texture > colour > temperature > taste hierarchy.

Strong: *"Crackling skin giving way to steaming, fall-apart meat"*
Weak: *"Golden brown roasted duck with crispy skin"*

**Technique or Origin** (mandatory)
One specific detail that signals craft and authenticity. This is what separates a real kitchen from a factory.

Strong: *"Slow-roasted over lychee wood for 4 hours"*
Weak: *"Made fresh daily"*

**Occasion or Emotion** (recommended)
Connect the dish to a moment, memory, or feeling. This is what makes people tag someone or save the post.

Strong: *"The kind of thing you make time to sit down for"*
Strong (ZH): *"就是那个记忆里的味道"*

---

## Sensory Word Bank

### Texture (EN)
`crackling` `molten` `silky` `cloud-soft` `springy` `caramelised` `charred` `pillowy` `shatteringly crisp` `meltingly tender`

### Texture (ZH)
`外酥里嫩` `入口即化` `Q弹` `软糯` `焦香酥脆` `滑嫩` `鲜嫩多汁`

### Taste/Aroma (EN)
`smoky` `umami-rich` `gently sweet` `deeply savoury` `bright` `complex` `warming` `fragrant`

### Taste/Aroma (ZH)
`鲜香` `回甘` `浓郁` `清甜` `麻辣鲜香` `酱香` `醇厚`

---

## Examples

### Example 1 — Char Siu Pork (Instagram, EN)

**Input:** Char siu BBQ pork, served with steamed rice and greens. Marinated overnight.

**Output:**
> Lacquered edges that shatter when you cut through — then pork so tender it barely needs a knife. Marinated overnight in our house char siu sauce and roasted until the fat renders into something almost caramel.
>
> The kind of plate that makes everything else go quiet.

### Example 2 — 红烧肉 (小红书, ZH)

**Input:** 红烧肉，五花肉，小火慢炖两小时，上海家常做法。

**Output:**
> 筷子一夹，皮就颤了。
>
> 五花肉选的是肥瘦均匀的那种，冰糖炒色、黄酒去腥，小火慢炖整整两小时——等到汤汁收浓、肉已经酥得自己往下坠的时候，才算好。
>
> 上海外婆的方子，没有改过。一口下去，不需要多说什么。

### Example 3 — Dim Sum Carousel Slide (EN, concise)

**Input:** Har gow — steamed shrimp dumpling, thin translucent wrapper.

**Output:**
> Har Gow — thin enough to see the shrimp through the skin. Steamed just long enough to stay springy. Order two baskets.

---

## Length Guidelines by Platform

| Platform / Format | Target length |
|---|---|
| Instagram caption (hero dish) | 60–120 words |
| Carousel slide description | 15–30 words |
| Google Business menu description | 30–50 words |
| TikTok video hook text | 8–12 words |
| 小红书 dish paragraph | 80–150 characters (ZH) |

---

## Notes

- Never use these generic adjectives: delicious, tasty, yummy, amazing, mouth-watering — they add nothing
- One dish = one focus. Don't list every ingredient; pick the most distinctive one
- For ZH content, shorter sentences with more whitespace read better on mobile
- Always write dish descriptions in present tense — they feel more immediate
