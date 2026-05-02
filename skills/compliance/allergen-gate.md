# Skill · Allergen Gate
# F&B Content Engine · compliance/allergen-gate.md
# ─────────────────────────────────────────────────
# ⚠️  BRAND-CUSTOMIZED FILE
# This file is populated during Bootstrap Mode onboarding (Q14).
# Do NOT overwrite during plugin updates (protected by update.sh).
# ─────────────────────────────────────────────────

## Purpose

Map every promoted dish to its allergen profile.
Every post promoting a dish must be checked against this table.
If the dish contains any of the 9 major allergens, disclosure is required.

---

## The 9 Major Allergens (FDA 2023)

milk · egg · fish · shellfish · tree nuts · peanuts · wheat · soy · sesame

---

## Disclosure Rule

If a dish contains any allergen from the list above, the post must include:
- "Contains [allergen]" in the caption or description, OR
- A link to the brand's menu allergen page

---

## Brand Dish Allergen Table

> ⚠️  Fill this table during Bootstrap Mode onboarding.
> Add every dish the brand actively promotes.
> Update whenever a recipe or supplier changes.

| Dish Name (EN) | Dish Name (ZH) | Milk | Egg | Fish | Shellfish | Tree Nuts | Peanuts | Wheat | Soy | Sesame | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| {{DISH_1_EN}} | {{DISH_1_ZH}} | | | | | | | | | | |
| {{DISH_2_EN}} | {{DISH_2_ZH}} | | | | | | | | | | |
| {{DISH_3_EN}} | {{DISH_3_ZH}} | | | | | | | | | | |
| {{DISH_4_EN}} | {{DISH_4_ZH}} | | | | | | | | | | |
| {{DISH_5_EN}} | {{DISH_5_ZH}} | | | | | | | | | | |

> Use ✓ for contains, — for does not contain, ? for unknown (treat as contains until confirmed)

---

## Common F&B Allergen Notes (pre-filled reference)

These are typical allergen profiles for common Chinese restaurant dishes.
**Verify against your actual recipes before publishing.**

| Common Dish | Typical Allergens | Notes |
|---|---|---|
| 麻辣香锅 (Dry-Spicy Stir-Fry Pot) | Peanuts ✓ · Sesame ✓ · Soy ✓ | Often contains peanut sauce base |
| 酸菜鱼 (Fish with Pickled Cabbage) | Fish ✓ · Soy ✓ | Fish is obvious; soy in seasoning |
| 担担面 (Dan Dan Noodles) | Peanuts ✓ · Wheat ✓ · Sesame ✓ | Peanut sauce is core ingredient |
| 宫保鸡丁 (Kung Pao Chicken) | Peanuts ✓ · Soy ✓ | Peanuts are a defining ingredient |
| 炸春卷 (Spring Rolls) | Wheat ✓ · Egg ✓ | Wrapper contains wheat + egg wash |
| 虾饺 (Har Gow / Shrimp Dumplings) | Shellfish ✓ · Wheat ✓ | Shrimp filling + wheat wrapper |
| 手拉面 (Hand-Pulled Noodles) | Wheat ✓ | Pure wheat flour |
| 豆腐 (Tofu dishes) | Soy ✓ | All tofu is soy-based |

---

## Gate Logic

```
For each post being drafted:

1. Identify the promoted dish(es)
2. Look up in the Brand Dish Allergen Table above
3. If any ✓ found:
   → Add disclosure line to caption/description
   → Format: "Contains: [allergen1], [allergen2]"
   → OR add link to menu allergen page
4. If dish not in table:
   → Flag as YELLOW (unknown allergen status)
   → Do not publish until owner confirms allergen profile
5. If dish is confirmed allergen-free:
   → GREEN, proceed to bilingual gate
```

---

## Update Protocol

Update this file immediately when:
- A new dish is added to the menu
- A recipe changes (new ingredient or supplier)
- A customer reports an allergic reaction (treat as urgent, notify owner)

Every update → append entry to `vault-{{BRAND_SLUG}}/brand/ownerreview.md`
