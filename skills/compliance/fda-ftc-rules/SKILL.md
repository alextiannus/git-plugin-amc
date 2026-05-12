---
name: fda-ftc-rules
description: "Health claim rules, price truth, promotions compliance"
plugin: git-plugin-amc
---

# Skill · FDA / FTC Rules
# F&B Content Engine · compliance/fda-ftc-rules.md
# ─────────────────────────────────────────────────

## Purpose

Every post must pass this compliance gate before publishing.
This file defines the RED (hard block) and YELLOW (owner sign-off required) rules
based on FDA, FTC, and general advertising standards.

Update cadence: Review monthly + immediately after any platform policy update or regulatory change.

---

## 🔴 RED Rules — Hard Block (fix or kill the post)

### R1 · Health & Medical Claims (FDA + FTC)

**Forbidden phrases — any of these trigger a RED:**
- "boosts immunity" / "immune-boosting"
- "good for digestion" / "aids digestion"
- "lowers cholesterol" / "heart-healthy" (unless medically certified)
- "anti-inflammatory"
- "detox" / "cleansing"
- "cures" / "prevents" / "treats" (any health condition)
- "superfood" (unless the claim is explicitly hedged)
- Any claim that a dish improves, maintains, or affects a health condition

**Replace with sensory / experiential language:**
| Forbidden | Allowed |
|---|---|
| "boosts immunity" | "warming and comforting" |
| "good for digestion" | "light and satisfying" |
| "anti-inflammatory" | "made with fresh ginger and spices" |
| "detox" | "clean, simple ingredients" |
| "healthy" (as medical claim) | "fresh", "made daily", "no MSG" (if true) |

---

### R2 · Allergen Non-Disclosure

If a dish contains any of the 9 major allergens, the post MUST include disclosure.

**The 9 major allergens (FDA 2023):**
milk · egg · fish · shellfish · tree nuts · peanuts · wheat · soy · sesame

**Rule:** If a promoted dish contains any of these, the post must either:
- State "contains [allergen]" in the caption/description, OR
- Link to the menu allergen page

Check [[compliance/allergen-gate]] for the brand's dish-specific allergen table.

---

### R3 · Price & Promotion Truth (FTC)

- **Stated price MUST match** the menu / order page at posting time
- "Limited-time" deals must have an explicit end date (e.g., "until Sunday" or "this week only")
- "Up to X% off" must list a representative sample at that discount level
- Never imply a deal is exclusive when it's available everywhere
- Any post claiming price > $50 or deal > 30% off → automatic Tier 1 escalation
- First post of a new dish → automatic Tier 1 escalation (verify price before publish)

---

### R4 · Alcohol Content

- If a dish contains alcohol (residual ABV > 0.5% from cooking counts), do NOT target:
  - Under 21 audience (US)
  - Under 18 audience (CA)
- TikTok: No alcohol promotion at all on most accounts — check account settings
- Instagram: Age-gated audiences only for alcohol content
- Google Business: Limited alcohol promotion allowed
- Soju, beer, cooking wine cocktails → always flag for review

---

### R5 · False Reviews & Solicitation

- Never offer discounts, free items, or incentives in exchange for reviews
  (Violates Google policy + FTC endorsement guidelines)
- Never write, paraphrase, or repurpose customer reviews as original brand content
  without: (a) written consent from the customer + (b) clear attribution
- Never post fake reviews or instruct others to

---

### R6 · Image Rights

All photos used in posts must be one of:
- (a) Shot by the brand (owned)
- (b) Licensed (keep license documentation in Media Index Bitable (attachments))
- (c) Re-posted with explicit written permission from the original poster

**Customer photos:** Use ONLY with DM consent. Save consent screenshot in Media Index Bitable (attachments).
**Stock photos:** Only with commercial license. Note source in Media Index Bitable.
**AI-generated images:** Only if brand owner has explicitly enabled mcp.image_gen in SOUL.md config.

---

## 🟡 YELLOW Rules — Owner Sign-Off Required

Any of the following requires owner approval before publishing.
Trigger Tier 2 escalation via [[operations/owner-approval]].

| Trigger | Why it's sensitive |
|---|---|
| Comparison to a named competitor | Defamation risk, brand positioning |
| "First / only / best in [neighborhood]" | Must be provable |
| Ingredient origin claim ("imported from Sichuan") | Must be documentable |
| Heritage claim ("authentic", "traditional", "ancient recipe") | Must be defensible |
| Charitable or political associations | Brand alignment risk |
| Holiday content tied to specific religion or community | Cultural sensitivity |
| Any content about a food safety incident (even resolved) | Legal sensitivity |

---

## 🟢 GREEN — Always Safe to Publish

No flag needed for any of the following:

- Sensory descriptors: sizzling, steaming, fresh, hand-pulled, wok-fired, slow-braised
- Real prices and portion descriptions (when verified against current menu)
- Customer experience stories (with consent)
- Behind-the-scenes kitchen content
- General family / community / neighborhood themes
- Deal alerts with explicit end dates and verified prices
- Dish introductions with cultural context (no health claims)

---

## Compliance Gate Workflow

```
1. Repurpose Agent finishes drafts
2. Scan for RED keywords (see R1 list above)
3. Check structured fields: price verified? allergen disclosed? deal has end date?
4. RED hit → block post + create Tier 1 entry in [[operations/owner-approval]]
5. YELLOW hit → flag in ownerreview Lark Doc, hold for owner sign-off (Tier 2)
6. GREEN → pass to [[localization/bilingual-gate]]
```
