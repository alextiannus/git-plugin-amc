---
name: performance-learning
description: "内容表现数据采集、赢家识别、模式提炼与自我更新 — 让 Agent 越用越聪明"
plugin: git-plugin-amc
---

# Skill · Performance Learning
# F&B Content Engine · core/performance-learning.md
# ──────────────────────────────────────────────────

## Purpose

将每一条发布的内容变成学习数据。
自动识别高表现内容的共性模式，提炼进入赢家模式库，
并将洞察反向注入 hook-engine.md 和 brand-voice.md。

**核心原则：Agent 每发一条内容，就比之前更聪明一点。**

---

## 三层架构

```
Layer 1 · 数据采集
  发布时打标签 → 24h/48h/7d 采集指标 → 计算得分

Layer 2 · 模式识别
  得分 ≥ 3 → 提炼赢家模式 → 存入 winner-library.md
  得分 = 0 → 记录失败原因 → 避免重蹈覆辙

Layer 3 · 自我更新
  3+ 赢家共享同一属性 → 更新 hook-engine.md
  赢家语调特征 → 更新 brand-voice.md
  Viral 帖子 → 立即 Lark 通知 + 深度分析
```

---

## Layer 1 · 数据采集

### 1A · 发布时打标签（每次发布必做）

每条内容发布到 AMC Kanban 后，**同时**在 `vault/analytics/performance-log.md`
追加一条记录，填写所有内容属性字段：

```
必填字段:
- post_id        [platform]-[YYYYMMDD]-[产品slug]
- platform       发布平台
- posted_at      发布时间
- product        产品名称
- hook_type      使用的 hook 类型（craving/deal/discovery/community/contrarian/bts）
- format         内容格式（carousel/video/single-image/text-post）
- pillar         内容支柱（product/story/educational/community/promotional）
- tone           语调（funny/warm/direct/storytelling/expert）
- has_price      是否出现价格（true/false）
- has_emoji      是否使用 emoji（true/false）
- caption_length 文案长度（short/medium/long）
- hook_text      实际使用的开头第一句（完整引用）
```

### 1B · 指标采集时间表

| 采集时间 | 触发条件 | 写入字段 |
|---|---|---|
| 发布后 24h | cron 自动触发 | `metrics_24h` 全部字段 |
| 发布后 48h | cron 自动触发 | `metrics_48h.engagement_rate` |
| 发布后 7d | 每周一 08:00 批量更新 | `metrics_7d` 全部字段 |

### 1C · 指标采集来源

| 平台 | 数据来源 | 关键指标 |
|---|---|---|
| Instagram | Platform Insights API | reach / likes / comments / saves / shares |
| TikTok | TikTok Analytics API | views / likes / comments / shares / watch_rate |
| 小红书 | 小红书创作者中心（需人工或浏览器） | 点赞 / 收藏 / 评论 / 浏览 |
| Facebook | Meta Graph API | reach / reactions / comments / shares |
| YouTube | YouTube Analytics API | views / likes / comments / watch_time / CTR |
| X | X API v2 | impressions / likes / retweets / replies |

> 小红书无公开 API：48h 后发 Lark 提醒团队手动填入数据。

---

## Layer 2 · 模式识别

### 2A · 得分计算（发布后 48h 执行）

```python
# 伪代码
brand_avg = read_brand_baseline(platform)  # 从 performance-log.md 品牌基准均值
post_er = metrics_48h.engagement_rate

ratio = post_er / brand_avg

if ratio < 0.5:    score = 0  # Poor
elif ratio < 1.5:  score = 1  # Normal
elif ratio < 2.5:  score = 2  # Good
elif ratio < 4.0:  score = 3  # Winner
else:              score = 4  # Viral

# 写入 performance-log.md 对应记录
update_post_record(post_id, score=score, vs_brand_avg=f"+{(ratio-1)*100:.0f}%")
```

### 2B · 得分触发行为

**Score 0 · Poor**
```
→ 在 performance-log.md 的 what_didnt 字段写入失败分析：
  "hook_type=[X] 在 [platform] 表现低于均值 [N]%，
   可能原因：[分析：格式/语调/时机/产品类型]"
→ 在 Kanban 对应任务追加备注："Low performer — 下次同类内容避免此写法"
→ 不发 Lark 通知（避免噪音）
```

**Score 2 · Good**
```
→ 在 performance-log.md 的 what_worked 字段记录成功要素
→ 若同一 hook_type 本月第 2 次 Good：写入 winner-library.md 候选区
```

**Score 3 · Winner**
```
→ 触发 2C 赢家提炼流程
→ 发 Lark 通知："🏆 赢家内容：[post_id] 互动率超均值 [N]%，已提炼模式"
```

**Score 4 · Viral**
```
→ 触发 2C 赢家提炼流程（深度版，含完整文案归因）
→ 立即发 Lark 通知："🔥 病毒内容：[post_id]！互动率超均值 [N]%
   平台：[platform] | Hook：[hook_text]
   这条内容的哪个元素导致了爆发——我将深度分析并更新创作策略。"
→ 触发 2D 深度归因分析
```

### 2C · 赢家模式提炼

当一条帖子得分 ≥ 3，执行以下提炼流程：

```
1. 读取该帖子的所有内容属性标签
2. 在 winner-library.md 检索是否有同平台 + 同 hook_type 的现有模式
   A. 有现有模式 → 将本帖 post_id 追加到 supporting_posts
                → 更新 avg_engagement_lift（取平均）
                → 更新 last_used 和 times_used
   B. 无现有模式 → 创建新模式记录（supporting_posts 记录本帖）
                → 标注"需要第 2 条支撑帖才正式激活"

3. 正式激活条件：supporting_posts ≥ 2 条 Winner 记录
4. 激活后：更新 winner-library.md 平台赢家排行
```

### 2D · 深度归因分析（仅 Viral 触发）

```
分析维度：
1. Hook 文本分析
   - 用了哪种情绪触发（好奇/渴望/认同/惊讶）
   - 句式结构（数字开头/问句/陈述/命令句）
   - 字数（<10字 / 10-20字 / >20字）

2. 发布时机
   - 星期几 + 具体时间
   - 与节假日/热点事件的关联

3. 内容属性组合
   - 哪几个属性同时出现（如 craving + video + has_price=true）

4. 产品特性
   - 这个产品之前的历史表现

分析结果写入：
- performance-log.md 对应记录的 what_worked 字段（详细版）
- winner-library.md 对应模式的 pattern_summary（补充细节）
```

---

## Layer 3 · 自我更新

### 3A · Hook Engine 更新（每月第一天）

```
条件：某 hook_type 在某平台连续 3 个月排名 #1
操作：
1. 读取 hook-engine.md 对应平台的兼容矩阵
2. 将该 hook_type 的 ★ 数上调（★★ → ★★★）
3. 在对应 hook 类型章节追加：
   "[BRAND_SLUG] 实测赢家 — [具体赢家 hook 文案例子]"
4. 在 Kanban 创建"hook-engine 更新"任务，状态 done

条件：某 hook_type 连续 2 个月得分 0
操作：
1. 将该 hook_type 在该平台的 ★ 数下调（★★★ → ★★）
2. 在 Maintenance 区追加警告备注
```

### 3B · Brand Voice 更新（每月第一天）

```
条件：赢家帖子中某 tone 占比 ≥ 60%
操作：
1. 读取 brand-voice.md 的 BRAND_TONE_OF_VOICE 字段
2. 在字段末尾追加：
   "[DATA-DRIVEN] 实测最高互动语调：[tone]，占赢家内容 [N]%（截至 [日期]）"
3. 不覆盖原有品牌语调描述，只追加数据洞察

条件：赢家帖子中 has_price=true 占比 ≥ 70%
操作：
→ 在 brand-voice.md 追加写作规则：
  "[DATA] 含价格的内容互动率持续高于无价格内容 — 创作时优先考虑价格可见性"
```

### 3C · 每月基准均值更新（每月第一天自动执行）

```
1. 读取 performance-log.md 过去 30 天的所有 metrics_48h.engagement_rate
2. 按平台分组，计算算术平均
3. 更新 performance-log.md 的"品牌基准均值"表
4. 如某平台均值环比下跌 >20%：
   → Lark 警告："[平台] 整体互动率下降 [N]%，可能原因：算法变化/内容老化/竞争加剧"
```

---

## 与其他技能的集成

### 被 repurpose-chain 调用（每次创作前）

在 Step 0 Asset Check 之后：

```
读取 vault/analytics/winner-library.md
→ 找出匹配当前 [platform] + [product_category] 的激活模式
→ 在 Decision Output 中报告：
  "[Winner Pattern] 找到 N 个赢家模式可参考：
   - [platform]: [pattern_summary]，推荐 hook_type: [X]"
→ 在对应平台的内容创作中优先使用赢家 hook_type 和结构
```

### 被 cron-jobs 调用

| 时间 | 任务 |
|---|---|
| 13:00 / 19:00 快照 | 同时触发 24h/48h 指标采集 + 得分计算 |
| 每周一 08:00 | 批量更新所有帖子的 7d 指标 |
| 每月第一天 10:00 | 触发 3A/3B/3C 自我更新流程 |

### 被 feedback-loop 调用（周日 22:00）

feedback-loop 已有的人工反馈处理 + performance-learning 的数据驱动洞察合并为同一份报告：

```
📊 本周改进摘要
├── 人工反馈（来自 Lark）: N 条 → M 条改进
└── 数据驱动（来自表现数据）:
    - 本周赢家: [N 条，hook_type 分布]
    - 本周 Poor: [N 条，失败原因汇总]
    - 赢家模式库更新: [新增/更新 N 条模式]
```

---

## 受保护内容（不自我修改）

- `allergen-gate.md` — 食品安全，只由团队手动更新
- `compliance/fda-ftc-rules.md` — 合规规则，不自我修改
- `SOUL.md` — 只接受显式团队指令
- Performance log 原始记录 — 只追加，不删改历史
