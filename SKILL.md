# SKILL.md — F&B Content Engine Skills Index
# OpenClaw skill discovery manifest · v0.6.3
# ─────────────────────────────────────────────

This file is a human-readable index of all 23 skills in the F&B Content Engine plugin.
OpenClaw discovers skills automatically via the `skills` directories declared in `openclaw.plugin.json`.
Each skill lives in its own subdirectory with a `SKILL.md` file containing YAML frontmatter.

---

## Skills Registry

### Core (4 skills)

| Skill | Directory | Description |
|---|---|---|
| `repurpose-chain` | skills/core/repurpose-chain/ | IG-first 7-step content repurpose chain across 7 platforms |
| `hook-engine` | skills/core/hook-engine/ | 6 hook types × platform compatibility matrix |
| `scheduling` | skills/core/scheduling/ | Posting windows, batch workflow, optimal timing |
| `content-types` | skills/core/content-types/ | Format specs per platform (carousel, reels, short video, etc.) |

### Compliance (4 skills)

| Skill | Directory | Description |
|---|---|---|
| `fda-ftc-rules` | skills/compliance/fda-ftc-rules/ | Health claim rules, price truth, promotions compliance |
| `allergen-gate` | skills/compliance/allergen-gate/ | 9 major allergens checker — BRAND-CUSTOMIZED |
| `platform-policies` | skills/compliance/platform-policies/ | Meta / TikTok / GMB / RedNote specific content rules |
| `image-rights` | skills/compliance/image-rights/ | Photo licensing, consent, source tiers |

### Localization (2 skills)

| Skill | Directory | Description |
|---|---|---|
| `brand-voice` | skills/localization/brand-voice/ | Personality, vocabulary, tone rules — BRAND-CUSTOMIZED |
| `bilingual-gate` | skills/localization/bilingual-gate/ | EN/ZH decision tree, canonical dish name map — BRAND-CUSTOMIZED |

### Platforms (7 skills)

| Skill | Directory | Description |
|---|---|---|
| `instagram` | skills/platforms/instagram/ | PRIMARY — carousel specs, reels, caption formula |
| `tiktok` | skills/platforms/tiktok/ | Raw video, 15–60s, 2-second hook rule |
| `rednote` | skills/platforms/rednote/ | Authentic storytelling, 300–600 chars ZH |
| `facebook` | skills/platforms/facebook/ | Community-focused, discussion questions mandatory |
| `youtube` | skills/platforms/youtube/ | SEO-optimised, 8–12 min long-form |
| `googlemap` | skills/platforms/googlemap/ | Reputation layer, 24h review response SLA |
| `x` | skills/platforms/x/ | Contrarian angle, 280 chars |

### Operations (5 skills)

| Skill | Directory | Description |
|---|---|---|
| `owner-approval` | skills/operations/owner-approval/ | Crisis protocol + compliance hard stops |
| `feedback-loop` | skills/operations/feedback-loop/ | Team feedback collection + weekly self-improvement |
| `vault-manager` | skills/operations/vault-manager/ | Vault file creation and maintenance |
| `cron-jobs` | skills/operations/cron-jobs/ | Daily 06:30–23:45 automation schedule |
| `reporting` | skills/operations/reporting/ | Daily digest, weekly, monthly reports |

### Bootstrap (1 skill)

| Skill | Directory | Description |
|---|---|---|
| `onboarding-flow` | bootstrap/onboarding-flow/ | 13-question brand interview, self-configuring SOUL.md writer |

---

## Brand-Customized Skills (never auto-updated)

These 3 skills are written by Bootstrap Mode during onboarding and are in `.gitignore` —
`npm update` and plugin updates cannot overwrite them. Generic defaults live in `.template` files.

```
skills/localization/brand-voice/SKILL.md      ← gitignored, brand-specific
skills/compliance/allergen-gate/SKILL.md      ← gitignored, brand-specific
skills/localization/bilingual-gate/SKILL.md   ← gitignored, brand-specific
```
