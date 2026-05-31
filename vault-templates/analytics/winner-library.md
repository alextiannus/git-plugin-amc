# 赢家模式库 Winner Library
# vault/analytics/winner-library.md
# ──────────────────────────────────
# 由 performance-learning skill 自动维护。
# 每当一条帖子得分 ≥ 3 (Winner)，提炼其核心模式存入此处。
# repurpose-chain Step 0 会读取此文件，优先复用赢家模式。

## 使用规则

- Agent 在创作新内容时：先查此库 → 找匹配平台+产品类型的赢家 → 用其 hook_type 和结构
- 库中每个模式须有 ≥2 条赢家记录支撑才能写入（避免偶然性）
- 每月第一天：移除 >6 个月无复用的模式，追加新赢家

---

## 赢家模式（Winner Patterns）

> 初始为空，由 Agent 在检测到 Winner/Viral 帖子后自动追加。

### 格式

```
---
pattern_id: W-[YYYYMMDD]-[序号]
platform: [平台]
product_category: [产品类型，如"主食类"/"小食类"/"套餐类"]
supporting_posts: [post_id-1, post_id-2]  # 支撑此模式的原始帖子

# ── 赢家模式描述 ──
hook_type: [craving|deal|discovery|community|contrarian|bts]
format: [carousel|video|single-image]
tone: [funny|warm|direct|storytelling|expert]

pattern_summary: |
  [用一句话描述这个赢家模式，例如:
  "以价格开头 + 份量对比 + 一个具体数字，适合午餐套餐，Facebook 和 IG 双平台有效"]

winning_hook_examples:
  - "[实际用过的 hook 文案 1]"
  - "[实际用过的 hook 文案 2]"

winning_structure: |
  [描述内容结构，例如:
  "Hook: 价格/份量 → Body: 3个感官细节 → CTA: 限时提示 → Hashtags: 本地标签优先"]

avg_engagement_lift: +0%   # 相比品牌均值的提升幅度
first_detected: YYYY-MM-DD
last_used: YYYY-MM-DD
times_used: 0
---
```

---

## 平台赢家排行（自动维护）

> Agent 每周更新，展示各平台当前最有效的 hook 类型。

| 平台 | #1 Hook | #2 Hook | #3 Hook | 更新日期 |
|---|---|---|---|---|
| Instagram | — | — | — | — |
| TikTok | — | — | — | — |
| 小红书 | — | — | — | — |
| Facebook | — | — | — | — |

---

## 已退役模式（Retired Patterns）

> 超过 6 个月未产生 Good 以上结果的模式移至此处，不再参考。

（暂无）
