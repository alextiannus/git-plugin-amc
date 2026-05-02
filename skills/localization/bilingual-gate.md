# Skill · Bilingual Gate
# F&B Content Engine · localization/bilingual-gate.md
# ────────────────────────────────────────────────────
# ⚠️  BRAND-CUSTOMIZED FILE
# Language decision tree is generic (keep as-is).
# Canonical Dish Name Map is brand-specific (fill during Bootstrap Mode Q14).
# Do NOT overwrite during plugin updates (protected by update.sh).
# ────────────────────────────────────────────────────

## Purpose

Every post passes through this gate after the Compliance Gate.
Two functions: (1) decide which language(s) to use, (2) enforce canonical dish names.

---

## Language Decision Tree

```
Is the platform primarily a Chinese-language platform?
  YES (RedNote 小红书) → Default ZH, add EN dish names in parentheses
  NO → continue ↓

Is the target audience primarily Chinese-speaking?
  YES → Bilingual (ZH primary, EN secondary)
  NO → continue ↓

Is the content replying to a customer comment or review?
  YES → Reply IN THE LANGUAGE the customer used (always)
  NO → continue ↓

Default language per platform:
  Instagram  → EN primary, ZH secondary (dish names + key phrases)
  TikTok     → EN primary, ZH dish names in overlay text
  Facebook   → EN primary
  YouTube    → EN (title + description) + ZH subtitles option
  Google Maps → EN primary, ZH for ZH-language reviews
  X          → EN only
```

---

## Core Rules

1. **Reply in the customer's language** — always, without exception
2. **Dish names on first mention:** Chinese + English + transliteration (pinyin)
   Format: `麻辣香锅 (Málà Xiāngguō, dry-spicy stir-fry pot)`
3. **Never machine-translate menu items** — use the Canonical Dish Name Map below
4. **Never machine-translate the entire post** — human-quality localization only
5. **Prices:** Always in local currency with symbol ($, S$, £, etc.) — no ambiguity

---

## Platform Tone Shifts (EN vs ZH)

| Platform | EN Tone | ZH Tone |
|---|---|---|
| Instagram | Punchy, visual-first, warm | 亲切、食欲感强、简洁 |
| TikTok | Raw, energetic, Gen-Z friendly | 真实、接地气、用网络用语 |
| RedNote | N/A (ZH primary) | 个人化、细节丰富、真诚 |
| Facebook | Community-oriented, conversational | 温暖、家庭感 |
| Google Maps | Professional, grateful, concise | 专业、诚恳 |

---

## Canonical Dish Name Map

> ⚠️  Fill this table during Bootstrap Mode onboarding (Q14).
> Minimum 20 dishes at launch. Update when menu changes.
> NEVER use machine-translated dish names — this table is the single source of truth.

| ZH Name | Pinyin | EN Name | Notes |
|---|---|---|---|
| {{DISH_ZH_1}} | {{PINYIN_1}} | {{DISH_EN_1}} | |
| {{DISH_ZH_2}} | {{PINYIN_2}} | {{DISH_EN_2}} | |
| {{DISH_ZH_3}} | {{PINYIN_3}} | {{DISH_EN_3}} | |
| {{DISH_ZH_4}} | {{PINYIN_4}} | {{DISH_EN_4}} | |
| {{DISH_ZH_5}} | {{PINYIN_5}} | {{DISH_EN_5}} | |

---

## Common Chinese Restaurant Dish Names (pre-filled reference)

Use these as a starting point. Verify against your actual menu before publishing.

| ZH Name | Pinyin | EN Name |
|---|---|---|
| 麻辣香锅 | Málà Xiāngguō | Dry-Spicy Stir-Fry Pot |
| 酸菜鱼 | Suāncài Yú | Fish with Pickled Cabbage |
| 担担面 | Dàndàn Miàn | Dan Dan Noodles |
| 宫保鸡丁 | Gōngbǎo Jīdīng | Kung Pao Chicken |
| 红烧肉 | Hóngshāo Ròu | Red-Braised Pork Belly |
| 手拉面 | Shǒulā Miàn | Hand-Pulled Noodles |
| 炸春卷 | Zhá Chūnjuǎn | Crispy Spring Rolls |
| 虾饺 | Xiājiǎo | Har Gow (Shrimp Dumplings) |
| 叉烧包 | Chāshāo Bāo | BBQ Pork Buns |
| 豆腐花 | Dòufuhuā | Silken Tofu Pudding |
| 蒸排骨 | Zhēng Páigǔ | Steamed Spare Ribs |
| 萝卜糕 | Luóbo Gāo | Turnip Cake |
| 午市套餐 | Wǔshì Tàocān | Lunch Set |
| 家庭套餐 | Jiātíng Tàocān | Family Meal |

---

## Gate Workflow

```
1. Identify target platform → apply language decision tree
2. Check all dish names against Canonical Dish Name Map
   → Any dish name not in the map → flag, do not publish until added
3. If ZH content: verify it was NOT machine-translated
4. If replying to a customer: match their language exactly
5. Pass → post proceeds to scheduling / publishing
```
