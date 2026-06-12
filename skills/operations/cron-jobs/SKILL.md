---
name: cron-jobs
description: "跨品牌自动化日常运营时间表及多租户处理规范"
plugin: git-plugin-amc
version: 3.0.0
---

# Skill · 定时任务与跨品牌自动化规范

本技能定义了 AI 内容官的每日、每周及每月自动化任务日程表。所有定时任务都是跨品牌的，AI 在运行时必须首先拉取已连接的品牌列表，然后通过循环处理每个品牌的相关运营工作。

---

## 任务执行前置检查 (Pre-Flight Check)

在执行任何定时任务或即时操作之前，**必须**执行以下步骤：

```
1. 检查环境变量 KANBAN_AGENT_API_KEY 或 SOUL.md 中的 amc_kanban_api_key 是否存在。
2. 如果未配置 API Key：
   → 立即中止所有任务。
   → 通过 Lark 发送警报通知品牌团队配置看板 API Key。
3. 如果 API Key 存在，正常执行：
   → 调用 get_brand_config 获取关联的所有品牌对象。
   → 在 Kanban 中为当前正在执行的定时任务创建对应的子任务或日志任务（状态为 in_progress），标注品牌与任务名称（例如 "[Brand] 11:00 午餐时段发布"）。
```

---

## 跨品牌日常自动化日程表

| 触发时间 (UTC) | 定时任务名称 | 读取数据 | 写入数据 |
|---|---|---|---|
| 07:00 | 每日看板同步 (Daily Kanban Sync) | 看板任务列表 | 更新 AI 代理当日需处理任务的 assignee 状态 |
| 08:00 | 今日话题发现 (Topic Discovery) | 热点雷达 (`board_list_topics`) | 存入看板热点话题 (`board_save_topic`) |
| 10:00 | 谷歌地图互动 (Google Maps Actions) | 看板关联的 GBP 评论 | 自动回复评论并更新看板任务状态 |
| 11:00 | 午餐时段发布 (Lunch Publish Window) | 看板排期草稿 (`board_list_drafts`) | 执行发布，状态置为 published / done |
| 13:00 | 午餐数据回采 (Lunch Snapshot) | 社交媒体 Insights 数据 | 将帖子表现写入看板草稿元数据中 |
| 17:00 | 晚餐时段发布 (Dinner Publish Window) | 看板排期草稿 (`board_list_drafts`) | 执行发布，状态置为 published / done |
| 19:00 | 晚餐数据回采 (Dinner Snapshot) | 社交媒体 Insights 数据 | 将帖子表现写入看板草稿元数据中 |
| 20:00 | 粉丝互动与私信回复 (Comment/DM Reply) | 社交媒体评论与私信接口 | 执行回复动作，无法处理的转为 Pending 任务 |

---

## 核心任务逻辑与多品牌循环实现指导

在编写或执行定时任务时，应按照以下程序逻辑循环处理：

### 08:00 · 话题发现与内容预创 (Topic Discovery)

```
对获取到的每一个 Brand：
1. 调用 get_brand_profile_markdown 获取最新品牌定位、受众画像及推广策略。
2. 调用 board_list_topics 获取今日热点话题雷达推荐。
3. 结合品牌 Content Pillars 分析目前发帖比例，挑选最需要的题材。
4. 使用核心创作技能生成内容主题与大纲。
5. 调用 board_save_draft 为该品牌保存内容草稿（状态设为 draft）。
6. 更新对应的 Kanban 任务为 done。
```

### 11:00 / 17:00 · 午餐/晚餐时段发布 (Publish Window)

```
对获取到的每一个 Brand：
1. 对应的 Kanban 任务状态更新为 in_progress。
2. 调用 board_list_drafts(status: 'scheduled' / 'draft') 获取该时段预备发布的内容。
3. 对于符合发布条件的内容：
   - 使用看板的发布接口 publish / board_publish_content 提交发布。
   - 若发布成功，更新 Kanban 任务为 done，并在 description 中记录帖子最终 URL。
   - 若发布失败，立即执行 fallback-execution 技能（通过平台直接 API 或浏览器自动化进行发布），并将最终成功/失败日志记录回 Kanban 任务。
```

### 20:00 · 粉丝互动与私信回复 (Comment/DM Reply)

```
对获取到的每一个 Brand：
1. 调用 board_list_social_accounts 获取关联的所有社媒平台账号。
2. 使用 google_get_reviews 等工具获取最新的未回复评论/私信。
3. 按照品牌 brand-voice 中规定的语气与双语规范起草回复内容。
4. 调用 google_reply_review 或 execute_brand_action 提交回复。
5. 遇到差评或敏感投诉，自动在看板中创建 status='pending' 的任务，并说明需要人类处理。
```

---

## 每周与每月触发器

每周一及每月 1 号，需要执行数据聚合与审计任务：
- **每周自我评估 (Self-improvement report)**：遍历各品牌，分析上周帖子表现，更新品牌在看板中的 metrics 属性，并将总结日志上传到品牌的 Lark Drive。
- **每周合规与过敏原审查 (Allergen & Compliance Check)**：检查合规策略，识别任何在看板中标记为需要二次确认的菜品或宣传文案。
- **每月运营月报 (Monthly report)**：遍历品牌，自动汇总看板的 ContentDraft 状态，统计发布数与互动率，自动排版为 markdown 报告，调用 `lark_upload_file` 存入品牌云盘。
