# 内容表现日志 Performance Log
# vault/analytics/performance-log.md
# ────────────────────────────────
# Agent 每次发布内容时自动追加一条记录。
# 指标在发布后 24h、48h、7天 自动更新。

## 评分说明

| 分数 | 含义 | 触发条件 |
|---|---|---|
| 0 · Poor | 低于品牌均值 50% 以下 | 复盘原因，下次避免同类写法 |
| 1 · Normal | 品牌均值 ±50% 范围内 | 正常，继续观察 |
| 2 · Good | 超出品牌均值 50%–150% | 标注 `[GOOD]`，记录成功要素 |
| 3 · Winner | 超出品牌均值 150% 以上 | 自动提炼到 `winner-library.md` |
| 4 · Viral | 超出品牌均值 300% 以上 | 立即提炼 + Lark 通知团队 |

---

## 内容属性标签速查

**hook_type:** craving / deal / discovery / community / contrarian / bts  
**format:** carousel / single-image / video / text-post / reel  
**pillar:** product / story / educational / community / promotional  
**tone:** funny / warm / direct / storytelling / expert  

---

## 记录格式（每帖一条，Agent 自动填写）

```
---
post_id: [platform]-[YYYYMMDD]-[slug]
platform: instagram | tiktok | rednote | facebook | youtube | x
posted_at: YYYY-MM-DD HH:MM

# ── 内容属性（创作时填写）──
product: [产品名]
hook_type: [craving|deal|discovery|community|contrarian|bts]
format: [carousel|single-image|video|text-post|reel]
pillar: [product|story|educational|community|promotional]
tone: [funny|warm|direct|storytelling|expert]
has_price: [true|false]
has_emoji: [true|false]
caption_length: [short<100|medium100-300|long>300]
hook_text: "[实际使用的开头第一句]"

# ── 指标（发布后自动更新）──
metrics_24h:
  reach: 0
  likes: 0
  comments: 0
  shares: 0
  saves: 0          # IG only
  watch_rate: 0%    # TikTok/YT only
  engagement_rate: 0%

metrics_48h:
  engagement_rate: 0%

metrics_7d:
  engagement_rate: 0%
  follower_gain: 0

# ── 评分（48h 数据出来后计算）──
score: [0|1|2|3|4]
score_label: [Poor|Normal|Good|Winner|Viral]
vs_brand_avg: +0%

# ── 学习备注（Agent 在打分后填写）──
what_worked: ""
what_didnt: ""
winner_extracted: [true|false]
---
```

---

## 品牌基准均值（每月第一天自动更新）

> Agent 根据过去 30 天数据计算，自动写入此处。

| 平台 | 平均互动率 | 平均触达 | 更新日期 |
|---|---|---|---|
| Instagram | — | — | — |
| TikTok | — | — | — |
| 小红书 | — | — | — |
| Facebook | — | — | — |
| YouTube | — | — | — |
| X | — | — | — |
