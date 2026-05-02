# SKILL.md — F&B Content Engine Skills Index
# OpenClaw skill discovery manifest · v0.4.6
# ─────────────────────────────────────────────

This file registers all 22 skills included in the F&B Content Engine plugin.
OpenClaw reads this index to populate `openclaw skills list`.

---

## Skills Registry

### Core (4 skills)

| Skill | File | Description |
|---|---|---|
| `repurpose-chain` | skills/core/repurpose-chain.md | IG-first 7-step content repurpose chain across 7 platforms |
| `hook-engine` | skills/core/hook-engine.md | 6 hook types × platform compatibility matrix |
| `scheduling` | skills/core/scheduling.md | Posting windows, batch workflow, optimal timing |
| `content-types` | skills/core/content-types.md | Format specs per platform (carousel, reels, short video, etc.) |

### Compliance (4 skills)

| Skill | File | Description |
|---|---|---|
| `fda-ftc-rules` | skills/compliance/fda-ftc-rules.md | Health claim rules, price truth, promotions compliance |
| `allergen-gate` | skills/compliance/allergen-gate.md | 9 major allergens checker — BRAND-CUSTOMIZED |
| `platform-policies` | skills/compliance/platform-policies.md | Meta / TikTok / GMB / RedNote specific content rules |
| `image-rights` | skills/compliance/image-rights.md | Photo licensing, consent, source tiers |

### Localization (2 skills)

| Skill | File | Description |
|---|---|---|
| `brand-voice` | skills/localization/brand-voice.md | Personality, vocabulary, tone rules — BRAND-CUSTOMIZED |
| `bilingual-gate` | skills/localization/bilingual-gate.md | EN/ZH decision tree, canonical dish name map — BRAND-CUSTOMIZED |

### Platforms (7 skills)

| Skill | File | Description |
|---|---|---|
| `instagram` | skills/platforms/instagram.md | PRIMARY — carousel specs, reels, caption formula |
| `tiktok` | skills/platforms/tiktok.md | Raw video, 15–60s, 2-second hook rule |
| `rednote` | skills/platforms/rednote.md | Authentic storytelling, 300–600 chars ZH |
| `facebook` | skills/platforms/facebook.md | Community-focused, discussion questions mandatory |
| `youtube` | skills/platforms/youtube.md | SEO-optimised, 8–12 min long-form |
| `googlemap` | skills/platforms/googlemap.md | Reputation layer, 24h review response SLA |
| `x` | skills/platforms/x.md | Contrarian angle, 280 chars |

### Operations (5 skills)

| Skill | File | Description |
|---|---|---|
| `owner-approval` | skills/operations/owner-approval.md | Crisis protocol + compliance hard stops |
| `feedback-loop` | skills/operations/feedback-loop.md | Team feedback collection + weekly self-improvement |
| `vault-manager` | skills/operations/vault-manager.md | Vault file creation and maintenance |
| `cron-jobs` | skills/operations/cron-jobs.md | Daily 06:30–23:45 automation schedule |
| `reporting` | skills/operations/reporting.md | Daily digest, weekly, monthly reports |

### Bootstrap (1 skill)

| Skill | File | Description |
|---|---|---|
| `onboarding-flow` | bootstrap/onboarding-flow.md | 13-question brand interview, self-configuring SOUL.md writer |

---

## Brand-Customized Skills (never auto-updated)

These 3 skills are modified by Bootstrap Mode during onboarding and
are protected from plugin updates:

```
skills/localization/brand-voice.md
skills/compliance/allergen-gate.md
skills/localization/bilingual-gate.md
```
