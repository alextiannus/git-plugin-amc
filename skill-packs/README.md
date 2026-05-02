# ACM Skill Packs

Extension library for the F&B Content Engine plugin.  
Skill packs add specialized capabilities on top of the 23 core skills.

---

## Tiers

### `community/` — Open Source · MIT
Free skill packs contributed by the community.  
Auto-merged via CI bot after format validation — no manual review required.  
Anyone can contribute. See [CONTRIBUTING.md](../CONTRIBUTING.md).

### `verified/` — Community + AI Lab Reviewed
Community-contributed packs that have been reviewed by 12eat AI Lab for accuracy and quality.  
Carries a ✅ Verified badge. Reviewed on request via GitHub issue.

### `premium/` — 12eat AI Lab · Commercial License
Proprietary skill packs with F&B vertical expertise and cn-overseas market intelligence.  
Delivered via `@12eat-ai/skill-packs-premium` (npm private package).  
Not included in this repository.

---

## Installing a Community Pack

Add to your `SOUL.md` under `plugins.fb-content-engine`:

```yaml
skill_packs:
  - community/copywriting/aida-engine
  - community/copywriting/hook-library
  - community/fb-specific/menu-copywriting
```

OpenClaw loads skill packs from `skill-packs/` automatically on next reload.

---

## Pack Catalog

### community/copywriting
| Pack | Description |
|---|---|
| `aida-engine` | Attention→Interest→Desire→Action — 4-step copy generator |
| `pas-engine` | Problem→Agitate→Solution — pain-point-led copy |
| `hook-library` | 20+ hook types across all platforms, EN + ZH variants |
| `cta-matrix` | CTA combinations by platform × goal × audience |

### community/platform-mastery
| Pack | Description |
|---|---|
| `instagram-algorithm` | Carousel vs Reels vs Stories weight rules, optimal cadence |
| `tiktok-seo` | Title keywords, captions, audio selection for search ranking |

### community/fb-specific
| Pack | Description |
|---|---|
| `menu-copywriting` | Dish description formula: sensory + origin + emotional hook |
| `review-response-lib` | Categorised response templates for 5★/3★/1★ reviews, EN + ZH |

### premium (via @12eat-ai/skill-packs-premium)
| Pack | Description |
|---|---|
| `fb-deep` | F&B vertical data-driven skills, updated from real brand performance |
| `cn-overseas` | Chinese diaspora market: nostalgia triggers, identity hooks, bilingual tone matrix |
| `seasonal-campaigns` | Chinese + Western holiday calendar with restaurant-specific templates |
| `kol-brief` | KOL / food blogger outreach brief templates |

---

## Version

Skill packs are versioned independently from the core plugin.  
Each pack carries its own `version` field in SKILL.md frontmatter.
