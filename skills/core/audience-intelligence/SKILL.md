---
name: audience-intelligence
description: "受众智能框架 — 定义谁在看、新客vs老客逻辑、内容差异化表达，让每条内容精准触达目标受众"
plugin: git-plugin-amc
---

# Skill · Audience Intelligence
# F&B Content Engine · core/audience-intelligence.md
# ──────────────────────────────────────────────────

## Purpose

知道"在跟谁说话"，是优秀内容管理官与普通发帖机器人的根本区别。

本 Skill 定义：
1. **受众分层** — 品牌受众的四个关系阶段
2. **平台受众默认画像** — 各平台用户群体特征
3. **新客 vs 老客内容逻辑** — 不同关系阶段需要不同内容
4. **内容差异化表达** — 同一产品，面向不同受众的不同切入角度
5. **受众信号识别** — 从互动数据中读取受众行为特征

---

## 受众四层关系模型

每一条内容创作前，必须明确目标受众层级。

### Layer 1 · 发现者 Discoverer（新客 · 从未接触品牌）

> **核心需求：** 为什么我要关注/尝试这个品牌？

| 属性 | 说明 |
|---|---|
| 心理状态 | 陌生、持怀疑态度、需要理由 |
| 决策驱动 | 社会证明（别人都在买）/ 价格透明 / 视觉吸引 / 独特性 |
| 内容触发器 | "我从来不知道有这个" / "这看起来值得一试" |
| 推荐支柱 | Product Spotlight / Educational |
| 推荐 Hook | discovery / craving / deal |
| 关键内容元素 | 价格可见 · 社会证明数字 · 零门槛 CTA（"第一次来就点这个"） |

**内容写法示例（同一产品，Discoverer 版本）：**
> "你可能不知道这附近有一家 ——
> $12.90 就能吃到手拉面，汤底熬了 6 小时。
> 周边 2000 多个评论，4.8 星。
> 新客点这个准没错。👇"

---

### Layer 2 · 考虑者 Considerer（潜客 · 知道品牌但未行动）

> **核心需求：** 这个品牌和其他家比怎么样？值得现在去吗？

| 属性 | 说明 |
|---|---|
| 心理状态 | 感兴趣但犹豫，在比较选项 |
| 决策驱动 | 差异化卖点 / 限时机会 / 具体产品细节 / 他人评价 |
| 内容触发器 | "好，就这家了" / "这和我之前吃的不一样" |
| 推荐支柱 | Product Spotlight / Community（顾客故事） |
| 推荐 Hook | contrarian / deal / community |
| 关键内容元素 | 具体差异点 · 限时信息 · 真实顾客原话 |

**内容写法示例（Considerer 版本）：**
> "很多人说港式和记手拉面 vs 我们的有什么区别。
> 答案只有一个：来一次你就知道了。
> 这周三前来，午市套餐九折。"

---

### Layer 3 · 常客 Regular（回头客 · 有过消费经验）

> **核心需求：** 有什么新的？我还值得再来吗？

| 属性 | 说明 |
|---|---|
| 心理状态 | 有好感、偶尔光顾、关注动态 |
| 决策驱动 | 新品/季节更新 / 熟悉感 + 新鲜感 / 被记住的感觉 |
| 内容触发器 | "噢这个新出的？要去试试" / "这家又有新东西了" |
| 推荐支柱 | Brand Story / Product Spotlight（新品方向） / Community |
| 推荐 Hook | discovery / bts |
| 关键内容元素 | "回来了""新出的""你们问了很久""我们终于做了" |

**内容写法示例（Regular 版本）：**
> "很多老顾客问了一年的问题：
> 冬天那个麻辣暖锅什么时候回来？
> 答案：这周四。
> 汤底配方今年做了升级。"

---

### Layer 4 · 拥护者 Advocate（忠实粉丝 · 主动传播品牌）

> **核心需求：** 我想感觉自己是品牌的一部分。

| 属性 | 说明 |
|---|---|
| 心理状态 | 强烈认同、主动推荐、希望有参与感 |
| 决策驱动 | 独家信息 / 被认可 / 参与品牌决策 |
| 内容触发器 | "就是我们帮他们做到的" / "我早就知道了" |
| 推荐支柱 | Community / Brand Story |
| 推荐 Hook | community / bts |
| 关键内容元素 | "你们帮我们取的名字""感谢你们一直以来""这是内部才知道的" |

**内容写法示例（Advocate 版本）：**
> "上个月我们征集新甜品名字，
> 最后选了 @user_handle 的建议：「晚风芝麻球」。
> 这周五正式上菜单，谢谢你们。❤️"

---

## 平台受众默认画像

> **重要：** 这是统计层面的默认值，非绝对规律。品牌实际受众以 `audience-profile.md` 数据为准。

| 平台 | 年龄主力 | 语言 | 消费决策特征 | 受众关系层 | 内容目标 |
|---|---|---|---|---|---|
| **TikTok** | 18–34 | 混合/本地 | 冲动型，3秒决定 | Discoverer → Considerer | 触达新受众，激发好奇 |
| **Instagram** | 22–40 | 英文为主 | 审美驱动，收藏再决策 | Discoverer + Regular | 视觉留存，建立品牌印象 |
| **小红书** | 18–35 | 中文 | 深度研究型，信任 KOL/真实评价 | Considerer → Regular | 转化犹豫者，口碑沉淀 |
| **Facebook** | 30–55 | 本地/中英 | 社群导向，家庭/团体决策 | Regular + Advocate | 维系社区，激活老客 |
| **YouTube** | 全年龄 | 多语言 | 有意搜索，高意向 | Considerer → Regular | 深度建立信任 |
| **X** | 25–45 | 英文 | 意见领袖型，话题讨论 | Discoverer + Advocate | 品牌声量，行业存在感 |

**平台受众含义：**
- TikTok 和 IG 内容 → 优先 Discoverer/Considerer 写法
- Facebook 和小红书 内容 → 优先 Regular/Advocate 写法
- 每周内容组合应覆盖所有四个层级，不能只顾新客或只顾老客

---

## 新客 vs 老客内容比例

### 默认黄金比例

```
Discoverer + Considerer（拉新）：50%
Regular + Advocate（留存/激活）：50%
```

### 动态调整规则

```
若品牌处于 Growth Phase（新品牌 / 新市场 / 重大推广期）：
  拉新 60% / 留存 40%

若品牌处于 Retention Phase（稳定运营 / 老顾客流失信号）：
  拉新 40% / 留存 60%

判断依据（来自 performance-learning 数据）：
- 粉丝增长率 >5%/月 → 维持默认比例
- 粉丝增长率 <2%/月 → 偏向 Growth Phase
- 互动主要来自评论（老粉特征） → 偏向 Retention Phase
- 互动主要来自保存（新粉特征） → 维持或偏向 Growth Phase
```

---

## 受众信号识别

从每条内容的互动数据推断受众行为：

| 互动信号 | 受众推断 | 内容含义 |
|---|---|---|
| **高保存率** (saves/reach >5%) | 以 Discoverer 为主 | 用户在收藏"稍后去试"，拉新内容有效 |
| **高分享率** (shares/reach >3%) | Considerer → Advocate | 内容有传播价值，用户愿意推荐给朋友 |
| **高评论率** (comments/reach >2%) | Regular + Advocate | 活跃社区，老客参与度高 |
| **高触达低互动** | Discoverer 曝光但未转化 | Hook 不够强，或内容与受众不匹配 |
| **粉丝增长 spike** | Discoverer 大量进入 | 内容成功触达新受众，追加同类内容 |

**信号读取流程（配合 performance-learning）：**
```
每次 48h 评分时，同时记录：
- primary_signal: [saves|shares|comments|reach]
- inferred_audience: [Discoverer|Considerer|Regular|Advocate]

写入 performance-log.md 对应记录
若连续 3 条内容 primary_signal = saves：
  → 推断 Discoverer 层级受众活跃
  → 在下周 08:00 topic discovery 中增加 Discoverer 定向内容
```

---

## 内容差异化表达矩阵

同一个信息点，面向不同受众层级的表达方式：

| 信息点 | Discoverer | Considerer | Regular | Advocate |
|---|---|---|---|---|
| **新品上线** | "你可能还不知道我们出了..." | "很多人问的那个 — 来了" | "老朋友，你们等了很久的..." | "第一批内测名额，你们先来" |
| **价格** | "$12.90，包你吃饱" | "同区比较，这个性价比..." | "老顾客价格没变，但份量升级了" | "你们知道我们为什么还能保持这个价格吗" |
| **口碑** | "4.8 星 · 2000+ 评论" | "来看看真实顾客怎么说" | "上个月你们帮我们拿了月度最佳" | "这是你们帮我们做到的" |
| **促销** | "第一次来？这个套餐最适合" | "这周限定，错过要等下季" | "常客专属提醒：明天涨价前最后一天" | "给你们的专属码，转发给朋友用" |
| **幕后故事** | "我们怎么做这道菜" | "为什么我们只用这种食材" | "这是我们今年做的最大一次改良" | "你们提的建议，我们真的做了" |

---

## 创作时的受众声明

在 repurpose-chain Step 0 的 Decision Output 中，必须声明目标受众：

```
[Audience Target]
  主要受众层级: [Discoverer | Considerer | Regular | Advocate]
  平台受众匹配:
    Instagram → Discoverer（平台默认拉新属性）
    Facebook  → Regular（平台默认社区属性）
    小红书    → Considerer（用户在做决策研究）
  拉新/留存比: 本周实际 [X%] / [X%] → 目标 50%/50%
  受众信号: 最近 3 条内容 primary_signal = [saves/shares/comments]
```

---

## 受众画像成熟路径

品牌刚安装插件时，受众画像是"假设"。随运营数据积累，逐步变为"实测"：

```
Week 1-4:    使用平台默认画像 + Bootstrap Q5 品牌描述的受众假设
Month 2-3:   performance-learning 积累足够数据，开始修正画像
Month 4+:    实测受众信号主导内容决策，画像趋于准确

修正信号：
- 若 TikTok 评论主要是中文 → 受众非预期英文年轻群体
- 若 Facebook 点赞主要来自 35+ → 确认社区老客画像
- 若小红书保存率异常高 → Discoverer 层大量进入

每月第一天：performance-learning 更新 audience-profile.md 的
"实测受众信号"字段，并与假设对比，标注偏差
```

---

## 与其他系统集成

### → Repurpose Chain（每次创作）
- Step 0 读取 `audience-profile.md` 获取当前受众假设
- 在 Decision Output 中声明目标受众层级
- 各平台内容使用对应层级的写法框架

### → Performance Learning（48h 评分后）
- 追加 `primary_signal` 和 `inferred_audience` 字段
- 识别受众信号趋势 → 调整拉新/留存比例

### → Content Pillars（周内容规划）
- Community 支柱 → 优先 Advocate/Regular 写法
- Educational 支柱 → 优先 Discoverer/Considerer 写法
- Promotional 支柱 → 按当前新客/老客比需要选择写法

### → Weekly Report（每周报告）
- 新增"受众健康度"版块：
  ```
  受众信号本周：
  - 主要信号: saves（Discoverer 活跃）
  - 拉新内容互动率: +32% vs 留存内容
  - 建议: 本周增加 1-2 条 Discoverer 定向内容
  ```
