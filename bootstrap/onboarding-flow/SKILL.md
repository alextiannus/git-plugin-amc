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
> "你们品牌的视觉风格是怎样的？请提供以下信息（有哪个填哪个）——
> What's your brand's visual style? Share any of the following:
>
> 1. 品牌主色调（hex 码或颜色描述，例如"温暖的红色和金色")
>    Brand colors (hex codes or description, e.g. 'warm reds and golds')
>
> 2. 视觉风格关键词（三个词，例如"温暖、接地气、局部特写"或"极简、高级、白底")
>    Visual style keywords (3 words, e.g. 'warm, rustic, close-up' or 'minimal, premium, white space')
>
> 3. 我喜欢这个账号的视觉风格（平台+账号名）
>    A social account whose visual style I love (platform + @handle)
>
> 4. 已审批的图片/视频素材存在哪里？（Lark Drive 链接或说明）
>    Where are your approved visual assets stored? (Lark Drive link or description)"

→ Updates: `brand-voice.md` under Visual Identity section
→ Fields: `BRAND_COLORS` / `BRAND_VISUAL_STYLE` / `VISUAL_REFERENCE` / `ASSETS_LOCATION`
→ Used by: `visual-brief` skill for every piece of content

---

**Q9 · Forbidden words or topics**
> "有没有你绝对不希望出现在内容里的词语、话题、或竞争对手名字？
> Any words, topics, or competitor names that should never appear in our content?"

→ Updates: `brand-voice.md` {{BRAND_FORBIDDEN_WORDS}}

---

### Module 3 · Compliance (→ bilingual-gate.md)

**Q10 · Top products**
> "你们最常推广的 5-10 个产品或服务是哪些？请列出中文名和英文名。
> What are your top 5-10 most-promoted products or services? Please give both Chinese and English names."

→ Starts filling: `bilingual-gate.md` Canonical Product Name Map

---

### Module 4 · Shared Resources

**Q11 · Trending Radar URL**
> "我们有一个每日更新的热点雷达文档，所有品牌都共享。
> 地址是：[read trending_radar from SOUL.md]
> 这个地址对你的品牌适用吗？还是需要用其他地址？
> We have a shared daily Trending Radar document.
> The default URL is: [url]. Does this apply to your brand, or do you need a different one?"

→ Maps to: `trending_radar` in SOUL.md
→ If unchanged: keep default

---

**Q12 · AI Workspaces folder (vault parent)**
> "我会在 Lark 云盘里为你创建专属的品牌档案夹。
> 默认位置是 AI Workspaces 文件夹：[read workspaces_folder from SOUL.md]
> 这个位置可以吗？如果你已经有一个偏好的位置，可以把链接给我。
>
> I'll create your brand's vault folder in Lark Drive.
> Default location is the AI Workspaces folder: [url]. Is that OK?
> If you have a preferred parent folder, paste the Lark Drive link."

→ Maps to: `{{LARK_WORKSPACES_URL}}` (parent folder)
→ If unchanged: keep default
→ After Q12 answer: immediately create the vault without waiting:
  ```
  [AGENT ACTION — runs silently during Q13]
  Execute the local Node.js script using your exec tool:
  node scripts/create-vault.js "{{BRAND_SLUG}}" "{{LARK_WORKSPACES_URL}}"

  → Save returned folder URL as {{VAULT_LARK_URL}}
  → Upload vault-templates/ contents into the new Lark Drive folder
  → If script execution fails: log error, ask owner to create manually and paste the URL
  ```

---

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
2. Update brand-voice.md with Q6/Q7/Q8/Q9/Q14 answers
   - Digital Touchpoints (Q6): website + handles
   - Tone of Voice (Q7): verbal tone rules
   - Visual Identity (Q8): colors, style keywords, reference, assets location
   - Forbidden Words (Q9): do-not-use list
   - Contact Info (Q14): address, hours, phone
3. Fill bilingual-gate.md Canonical Product Name Map with Q10 answers
4. [IF NOT ALREADY DONE IN Q12] Create Lark Drive vault:
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
