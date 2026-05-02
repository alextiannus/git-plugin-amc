---
name: image-rights
description: "Photo licensing, consent, source tiers"
plugin: git-plugin-amc
---

# Skill · Image Rights
# F&B Content Engine · compliance/image-rights.md
# ─────────────────────────────────────────────────

## Purpose

Every image or video used in a post must have a clear, documented rights basis.
Using unlicensed images is a RED compliance violation.

---

## Permitted Image Sources

### ✅ Tier 1 · Brand-Owned (always safe)
Photos or videos shot by the brand, its staff, or a photographer hired by the brand.
- Store in `vault-{brand}/media/` with naming: `YYYY-MM-DD_dish-slug/`
- No additional documentation needed
- Log in `vault-{brand}/media/media-index.md`

### ✅ Tier 2 · Licensed Stock
Photos purchased from a licensed stock provider (Getty, Shutterstock, Unsplash Pro, etc.)
- Must have commercial license (not just personal/editorial)
- Log license details in `vault-{brand}/media/media-index.md`:
  ```
  Source: Shutterstock
  Image ID: 123456789
  License type: Standard commercial
  License URL: [link]
  Purchased: 2026-01-15
  ```

### ✅ Tier 3 · Customer Photos (with explicit consent)
Photos taken by customers and shared on social media.
- MUST obtain explicit written consent from the original poster via DM
- Save consent screenshot in `vault-{brand}/media/YYYY-MM-DD_consent-{username}.png`
- Credit the original poster in the caption (e.g., "📸 @username")
- If customer later withdraws consent, immediately remove the post

### ✅ Tier 4 · Reposted Content (with explicit permission)
Content created by third parties (food bloggers, influencers, media).
- Same rules as Tier 3 — explicit DM consent required
- Save consent in vault
- Credit in caption

### ⚠️ Tier 5 · AI-Generated Images
Only permitted if `mcp.image_gen` is explicitly enabled in the brand's SOUL.md config.
- AI images must not replicate real people, real places, or real brands without permission
- Label as "AI-generated" if platform requires disclosure (TikTok may require this)

---

## ❌ Never Use

- Images found via Google Image Search without verifying license
- Screenshots from other brands' social media without permission
- Stock photos with "editorial use only" or "personal use only" licenses
- Images where a watermark has been cropped or removed
- Photos from delivery apps or review platforms (Yelp, Google Maps photos) without permission

---

## Media Naming Convention

All media stored in vault must follow this naming format:

```
vault-{brand}/media/{YYYY-MM-DD}_{topic-slug}/
  ├── raw/          ← original files, never edited
  ├── edited/       ← final versions used in posts
  └── consent/      ← consent screenshots (for Tier 3/4)
```

File naming: `YYYY-MM-DD_{dish-or-topic}_{sequence}.jpg`
Example: `2026-05-01_malatangpot_01.jpg`

---

## Quick Check Before Publishing

```
□ Is the image brand-owned, or do I have documentation of the license / consent?
□ Is the consent screenshot saved in vault/media/?
□ Is the source logged in media-index.md?
□ If AI-generated, is mcp.image_gen enabled in SOUL.md?
□ If customer photo, is the original poster credited in the caption?
```

All YES → GREEN, proceed to publishing.
Any NO → RED, do not publish until resolved.
