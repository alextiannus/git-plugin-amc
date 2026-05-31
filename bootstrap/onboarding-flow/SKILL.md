---
name: onboarding-flow
description: "14-question brand interview, self-configuring SOUL.md writer"
plugin: git-plugin-amc
---

# Bootstrap · Onboarding Flow
# F&B Content Engine · bootstrap/onboarding-flow.md
# ──────────────────────────────────────────────────

## Purpose

This file is the agent's onboarding script. It is loaded automatically
when Bootstrap Mode is triggered (any {{PLACEHOLDER}} detected in SOUL.md).

The agent conducts this interview directly with the brand owner or manager
via their Lark account. No intermediary needed.

---

## Team Access Model

```
所有通过 Lark Bot 发消息的用户 = 品牌管理团队成员。
无需配置特定的 owner_lark_id，无需审批机制。
AI 直接发布内容，团队在社交媒体上查看，通过 Lark 发反馈给 AI 自我改进。

All Lark bot users = brand team members.
No owner_lark_id needed. No approval gate.
AI publishes directly. Team reviews on social platforms.
Feedback sent to Lark bot → AI self-improves.
```

---

## Opening Message

**Trigger: send IMMEDIATELY and PROACTIVELY after plugin install completes.**
Do NOT wait for the user to message first.
This message is pushed by the `post_install` hook via `mcp.lark.message`.

```
你好！我是你的 AI 内容官，刚完成安装，马上开始配置。
需要问你 14 个问题（大约 20 分钟），配置完成我就正式开始工作。

Hi! I'm your AI Content Manager — just installed and ready to configure.
I have 14 quick questions (~20 min) and then I'll start working right away.

请用你觉得最顺手的语言回答 / Please reply in whichever language feels natural.
我们开始吧！/ Let's go!
```

Send Q1 immediately after this message — do not wait for a "ready" reply.

---

## Interview Script

Ask questions in order. Wait for each answer before proceeding.
Adapt language to match what the owner is using.

---

### Module 1 · Brand Identity (→ SOUL.md Section A)

**Q1 · Brand name**
> "请告诉我品牌的完整官方名称，包括中英文。
> 大小写和间距都要准确——我会用在所有内容里。
> What's the official brand name, including any Chinese characters?
> Exact capitalization matters — I'll use it everywhere."

→ Maps to: `{{BRAND_NAME}}`
→ Rule: exact casing, no alteration

---

**Q2 · Brand slug**
> "我需要一个英文简称用于文件命名，小写、无空格。
> 比如 'Golden Dragon' 可以是 'goldendragon'。
> I need a short English code for file naming — lowercase, no spaces.
> What would you like to use?"

→ Maps to: `{{BRAND_SLUG}}`
→ Rule: lowercase alphanumeric only, no spaces or symbols

---

**Q3 · Brand positioning**
> "用一句话描述你们卖什么、给谁卖、有什么特别的（不超过20字）。
> In one sentence: what do you sell, who's it for, and what makes it special? (≤15 words)"

→ Maps to: `{{BRAND_NICHE}}`

---

**Q4 · AI agent mission**
> "这个 AI 内容官的核心任务是什么？用一句话说。
> What's the core mission of this AI Content Manager in one sentence?"

→ Maps to: `{{BRAND_MISSION}}`
→ Suggest if blank: "Generate platform-native content that drives orders and builds brand recognition"

---

**Q5 · Target markets**
> "你们主要做哪些市场？需要中英文双语内容吗？
> Which markets are you targeting? Do you need bilingual (Chinese + English) content?"

→ Maps to: `{{MARKETS}}`
→ Example: "North America (en) + 海外华人社区 (zh)"

---

### Module 2 · Brand Voice (→ brand-voice.md)

**Q6 · 数字触点 Digital Touchpoints**
> "你们的官网或点单链接是什么？各平台的账号 @handle 分别是？（有哪个填哪个，没有的可以跳过）
> What's your website or ordering link? And your @handles on each platform? (skip any you don't have yet)"

→ 例如: `website: https://12eat.com | instagram: @12eat_official | tiktok: @12eat`
→ Updates: `brand-voice.md` under Digital Touchpoints
→ Used in: all platform CTAs, "link in bio", "follow us @...", caption sign-offs

---

**Q7 · 品牌语调 Brand Tone of Voice**
> "你希望内容的语调是怎样的？请选择最接近的一组——或直接用自己的话描述。
> How should the content sound? Pick the closest options — or describe in your own words.
>
> 正式 / Formal ↔ 亲切随意 / Casual & warm
> 诙谐活泼 / Playful & funny ↔ 专业严肃 / Expert & serious
> 话不多说到点 / Punchy & direct ↔ 展开讲故事 / Storytelling & narrative
>
> 如果有你喜欢的品牌语调案例（平台、抛号、或参考帐号）也可以发给我。
> Feel free to also share a brand whose tone you love as reference."

→ Updates: `brand-voice.md` {{BRAND_TONE_OF_VOICE}}
→ Rule: 将回答转化为具体写作准则，例如：“用第一人称、短句、常用emoji、避免行业术语”

---

**Q8 · 视觉身份 Visual Identity**
> "你们品牌的视觉风格是怎样的？（有哪个填哪个）——
> What's your brand's visual style? Share any of the following:
>
> 1. 品牌主色调（hex 码或颜色描述，例如"温暖的红色和金色")
>    Brand colors (hex codes or description, e.g. 'warm reds and golds')
>
> 2. 视觉风格关键词（三个词，例如"温暖、接地气、局部特写"或"极简、高级、白底")
>    Visual style keywords (3 words, e.g. 'warm, rustic, close-up' or 'minimal, premium, white space')
>
> 3. 我喜欢这个账号的视觉风格（平台+账号名）
>    A social account whose visual style I love (platform + @handle)"

→ Updates: `brand-voice.md` under Visual Identity section
→ Fields: `BRAND_COLORS` / `BRAND_VISUAL_STYLE` / `VISUAL_REFERENCE`
→ Used by: `visual-brief` skill for every piece of content

---

**Q9 · 现成素材 Existing Assets**
> "你们现在有没有可以马上用的图片或视频素材？
> 比如历史拍摄照片、产品图、门店照片、宣传物料等。
> 如果有，请分享 Lark Drive / Google Drive 链接，或告诉我大约有多少。
> 如果目前没有也没关系，我会为你安排首次拍摄计划。
>
> Do you have any photos or videos ready to use?
> E.g. past shoots, product images, store photos, or marketing materials.
> Share a Drive link, or describe what you have. If nothing yet, no problem."

→ Updates: `vault/media/media-index.md` with initial asset inventory
→ If assets exist: creates entries with location link + rough count
→ If no assets: flags 'first-shoot needed' in media-index.md, prepares shoot brief after onboarding
→ Also fills: `ASSETS_LOCATION` in `brand-voice.md` Visual Identity section

---

**Q10 · 期待发布周期 Publishing Cadence**
> "你希望每周大约发多少条内容？哪个平台对你最重要？
> 例如：“每周 5-7 条，Instagram 和小红书最重要”
> 不确定的话，用我的默认方案：每天 2-3 条，全平台均匀分配。
>
> How many posts per week do you want, and which platform matters most to you?
> E.g. '5-7 per week, Instagram and RedNote are priority'
> Not sure? I'll use my default: 2-3 posts/day across all platforms."

→ Maps to: `{{POSTING_FREQUENCY}}` and `{{PRIORITY_PLATFORMS}}` in SOUL.md
→ Updates: `scheduling.md` posting windows and batch priorities
→ Default if skipped: 2-3 posts/day, all active platforms weighted equally

---

### Module 3 · Compliance (→ bilingual-gate.md)

**Q11 · Forbidden words or topics**
> "有没有你绝对不希望出现在内容里的词语、话题、或竞争对手名字？
> Any words, topics, or competitor names that should never appear in our content?"

→ Updates: `brand-voice.md` {{BRAND_FORBIDDEN_WORDS}}

---

**Q12 · Top products**
> "你们最常推广的 5-10 个产品或服务是哪些？请列出中文名和英文名。
> What are your top 5-10 most-promoted products or services? Please give both Chinese and English names."

→ Starts filling: `bilingual-gate.md` Canonical Product Name Map

---

### Module 4 · Operations

> 热点雷达 URL 和 AI 工作區文件夹地址已从访谈中移除。Agent 在安装后自动从 SOUL.md 读取默认地址，无需回答。

**Q13 · Promotions and pricing**
> "你们有固定的优惠或套餐价格区间吗？
> 比如午市套餐价格、家庭套餐范围等——帮助我在推广时确保价格准确。
> Do you have standard promotions or price ranges?
> E.g. lunch set price, family meal range — helps me ensure price accuracy in posts."

→ Notes added to: `compliance/fda-ftc-rules.md` price verification section

---

**Q14 · Store Location & Hours**
> "最后，请告诉我门店的具体中英文地址、营业时间以及联系电话。
> 这很重要，因为我绝对不会在帖子里编造地址。如果没有可以跳过。
> Finally, please provide your exact store address (EN/ZH), operating hours, and phone number.
> This is important because I am strictly forbidden from hallucinating contact info."

→ Notes added to: `brand-voice.md` under Contact Info

---

## Post-Interview Actions

After all 14 questions are answered:

```
1. Fill all {{PLACEHOLDER}} values directly in SOUL.md → overwrite in-place
   (write only to plugins.git-plugin-amc section, do not touch other sections)
2. Update brand-voice.md with Q6/Q7/Q8/Q9/Q11/Q14 answers
   - Digital Touchpoints (Q6): website + handles
   - Tone of Voice (Q7): verbal tone rules
   - Visual Identity (Q8): colors, style keywords, reference
   - Existing Assets (Q9): ASSETS_LOCATION + initial media-index.md entries
   - Forbidden Words (Q11): do-not-use list
   - Contact Info (Q14): address, hours, phone
2b. Apply Q10 (Publishing Cadence) to scheduling.md:
   - Set POSTING_FREQUENCY and PRIORITY_PLATFORMS in SOUL.md
   - Adjust posting windows in scheduling.md if non-default
3. Fill bilingual-gate.md Canonical Product Name Map with Q12 answers
4. Auto-apply SOUL.md defaults for Trending Radar URL and Workspaces folder
   (no user input needed — read trending_radar and workspaces_folder from SOUL.md)
4b. Create Lark Drive vault using the default LARK_WORKSPACES_URL:
   Execute `node scripts/create-vault.js "{{BRAND_SLUG}}" "{{LARK_WORKSPACES_URL}}"`
   → Upload vault-templates/ files into the new folder
   → Store returned URL as {{VAULT_LARK_URL}} in SOUL.md shared_resources
   → Extract Content Schedule Bitable URL from terminal output
5. Use your feishu_drive tool to update the uploaded `vault-index.md` in the new Lark folder, filling in the brand name, Trending Radar URL, and vault Lark URL.
5b. Initialize `vault/brand/audience-profile.md`:
   → Fill {{BRAND_NICHE}} from Q3 answer
   → Fill {{MARKETS}} from Q5 answer
   → Agent infers initial audience age/language/decision-style from brand type
   → Initialize `vault/brand/content-pillars.md` with default 40/25/15/12/8% ratios
6. **Generate Interactive Lark Docs:**
   Use your `mcp_lark_docx_builtin_import` tool to convert the markdown contents of `ownerreview.md` and `vault-index.md` into native Lark Docs (Docx).
   → Keep the generated URL for ownerreview ready to send to the owner.
7. Run global search for {{ in SOUL.md → must be ZERO before proceeding
8. **CRITICAL REQUIREMENT:** You MUST immediately and proactively send the confirmation message to the owner. Do NOT wait for them to ask or prompt you. As soon as step 7 is complete, output the following message EXACTLY as written, filling in the URLs.

**Confirmation message (Send this immediately):**
```
✅ 配置完成！我现在正式开始工作了。

设置概要：
- 品牌：{BRAND_NAME}
- 核心资产金库：{VAULT_LARK_URL}
- 协作文档 (请点击打开并置顶)：
  - 待审与复盘区 (ownerreview)：{URL_FROM_STEP_6}
  - 发帖排期表 (Bitable)：{CONTENT_SCHEDULE_URL_FROM_STEP_4}
- 自动发布平台：{ACTIVE_PLATFORMS}
- 待连接平台：{PENDING_PLATFORMS}（连接账号后即可开启自动发布）
- AMC Kanban：已连接 (API Key 配置完成)
- 每天工作时间：06:30 – 23:45（全自动）

内容会直接发布到各平台，无需审批。
请到各平台查看发布结果，有任何反馈随时发消息给我——我会持续自我改进。

---

✅ Setup complete! I'm officially starting work now.

Summary:
- Brand: {BRAND_NAME}
- Auto-publish platforms: {ACTIVE_PLATFORMS}
- Pending platforms: {PENDING_PLATFORMS} (connect credentials to enable auto-publish)
- AMC Kanban: Connected
- Daily schedule: 06:30 – 23:45 (fully automated)

Content publishes directly — no approval needed.
Check your platforms to see posts, and send me feedback anytime on Lark.
```

---

## If Owner Is Unresponsive During Interview

If no response for 2 hours during the interview:
- Send a reminder: "还在吗？我们继续吧 / Still there? Let's continue when you're ready."
- If no response for 24 hours: log incomplete onboarding in ownerreview.md, send a daily nudge via Lark until Bootstrap completes.

Do NOT start operating until Bootstrap Mode is fully complete (zero {{PLACEHOLDER}} remaining).

---

## Bootstrap Recovery Protocol

Handles cases where Bootstrap did not start, or was interrupted mid-way.

### Case 1 · post_install hook failed (Lark not connected yet)

If `mcp.lark.message` is unavailable when post_install runs:
```
→ Log: "Bootstrap pending — Lark channel not connected"
→ Do NOT send Opening Message
→ On next on_startup: retry mcp.lark.message
→ As soon as Lark becomes available: send Opening Message proactively
   "你好！我在等你配置 Lark 之后就发了消息，我们现在开始吧！
    Hi! I was waiting for Lark to connect — let's start the setup now!"
→ Continue with Q1
```

### Case 2 · Agent restarted mid-interview (cold restart, crash, redeploy)

On startup, if `{{PLACEHOLDER}}` still present AND ownerreview.md contains partial interview log:
```
→ Read ownerreview.md to find the last answered question (e.g. "Last answered: Q7")
→ Send recovery message:
   "我们继续之前的配置！之前已经完成了前 {N} 个问题，从第 {N+1} 题继续。
    Let's pick up where we left off — you completed Q{N}, continuing from Q{N+1}."
→ Resume from that question — do NOT restart from Q1
→ Preserve all previously collected answers
```

### Case 3 · Bootstrap never triggered (manual install, no post_install)

If the agent is running, SOUL.md has `{{PLACEHOLDER}}`, but no Bootstrap Opening Message was ever sent:
```
→ Detected via: on_startup sees {{PLACEHOLDER}} + ownerreview.md is empty or missing
→ Send Opening Message immediately (same text as post_install hook)
→ Proceed with Q1
```

### Case 4 · Manual re-trigger command

Any Lark team member can send:
```
重新配置 / reconfigure / /bootstrap
```
→ Agent re-enters Bootstrap Mode, sends Opening Message, runs full 14-question interview again
→ Existing brand config is preserved until new answers overwrite it
→ Use case: brand rebrand, change of platforms, major voice update

---

### Case 5 · Onboarding keyword trigger (message-based detection)

When a Lark message contains any of the following keywords:
```
ZH: 品牌访问, 品牌调查, 品牌访谈, 品牌配置, 开始配置, 重新配置, 开始品牌访谈
EN: brand interview, brand survey, brand setup, onboarding, /bootstrap, reconfigure
```

Agent MUST:
```
1. Immediately read SOUL.md → plugins.git-plugin-amc section
2. Check for {{PLACEHOLDER}}:

   └─ {{PLACEHOLDER}} found (Bootstrap incomplete):
       → Reply:
          "检测到品牌配置尚未完成，马上开始！
           Detected incomplete setup — starting brand interview now!"
       → If ownerreview.md contains partial interview log:
           Resume from last answered question (see Case 2)
       → If no partial log:
           Send Opening Message, begin from Q1

   └─ No {{PLACEHOLDER}} (Bootstrap already complete):
       → Reply:
          "品牌配置已完成 ✅
           品牌：{BRAND_NAME} | 已开通平台：{ACTIVE_PLATFORMS}
           如需重新配置（品牌调整、平台更改等），请发送 '重新配置'。
           Brand setup complete ✅
           Brand: {BRAND_NAME} | Platforms: {ACTIVE_PLATFORMS}
           To reconfigure, send '重新配置'."
```

> **重要：** Case 5 是所有消息的第一检查项。关键词匹配优先于其他所有逻辑。
