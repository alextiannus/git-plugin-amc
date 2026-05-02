# Bootstrap · Onboarding Flow
# F&B Content Engine · bootstrap/onboarding-flow.md
# ──────────────────────────────────────────────────

## Purpose

This file is the agent's onboarding script. It is loaded automatically
when Bootstrap Mode is triggered (any {{PLACEHOLDER}} detected in SOUL.md).

The agent conducts this interview directly with the brand owner or manager
via their Lark account. No intermediary needed.

---

## Opening Message (send to owner's Lark on first startup)

```
你好！我是你的 AI 内容官，正式开始工作之前，
我需要问你几个问题来完成配置（大约 15 个问题，30 分钟）。

Hi! I'm your AI Content Manager. Before I start working,
I need to ask you a few questions to complete my setup
(about 15 questions, 30 minutes).

请用你觉得最顺手的语言回答 / Please reply in whichever language feels natural.
我们开始吧！/ Let's get started!
```

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

### Module 2 · Platforms (→ SOUL.md Section B)

**Q6 · Active platforms**
> "下面这些平台，哪些需要我帮你运营？
> Which of these platforms do you want me to manage?
> - Instagram
> - TikTok
> - 小红书 (RedNote)
> - Facebook
> - YouTube
> - Google Maps / Google Business Profile
> - X (Twitter)
> - 其他 / Other?"

→ Maps to: `active_platforms` in SOUL.md
→ Note: Google Maps is almost always recommended even if not explicitly requested

---

### Module 3 · Owner Contact (→ SOUL.md + owner-approval.md)

**Q7 · Lark user ID**
> "当我需要你审批内容时，会通过 Lark 通知你。
> 请告诉我你的 Lark 用户 ID（在 Lark → 个人资料可以找到，格式类似 ou_xxxxxxxx）。
> I'll notify you via Lark for content approvals.
> What's your Lark user ID? (Found in Lark → Profile, format: ou_xxxxxxxx)"

→ Maps to: `{{OWNER_LARK_ID}}`
→ Critical: this is the sole escalation channel

---

**Q8 · Response time expectation**
> "当我发送需要你审批的内容通知时，你通常多久能看到并回复？
> 默认 SLA 是：营业时间内 1 小时。可以接受吗？
> How quickly can you typically respond to approval requests?
> Default SLA is 1 hour during business hours — does that work?"

→ If adjusted: note in owner-approval.md SLA section

---

### Module 4 · Brand Voice (→ brand-voice.md)

**Q9 · Brand personality**
> "用三个词描述你们品牌的个性。
> Three words that describe your brand's personality?"

→ Updates: `brand-voice.md` {{BRAND_PERSONALITY_WORDS}}

---

**Q10 · Forbidden words or topics**
> "有没有你绝对不希望出现在内容里的词语、话题、或竞争对手名字？
> Any words, topics, or competitor names that should never appear in our content?"

→ Updates: `brand-voice.md` {{BRAND_FORBIDDEN_WORDS}}

---

### Module 5 · Compliance (→ allergen-gate.md + bilingual-gate.md)

**Q11 · Top dishes**
> "你们最常推广的 5-10 道菜是哪些？请列出中文名和英文名。
> What are your top 5-10 most-promoted dishes? Please give both Chinese and English names."

→ Starts filling: `bilingual-gate.md` Canonical Dish Name Map

---

**Q12 · Allergen check**
> "对于你刚才列出的菜品，哪些含有以下过敏原？
> For the dishes you listed, which contain any of these 9 allergens?
> 牛奶·鸡蛋·鱼·贝类·坚果·花生·小麦·大豆·芝麻
> milk·egg·fish·shellfish·tree nuts·peanuts·wheat·soy·sesame
> 不确定的请标注 '?' — 上线前必须确认。
> Mark '?' for unknown — must be confirmed before publishing any post about that dish."

→ Fills: `allergen-gate.md` Brand Dish Allergen Table

---

### Module 6 · Shared Resources

**Q13 · Trending Radar URL**
> "我们有一个每日更新的热点雷达文档，所有品牌都共享。
> 地址是：[default URL from SOUL.md config]
> 这个地址对你的品牌适用吗？还是需要用其他地址？
> We have a shared daily Trending Radar document.
> The default URL is: [url]. Does this apply to your brand, or do you need a different one?"

→ Maps to: `{{TRENDING_RADAR_URL}}`
→ If unchanged: keep default

---

**Q14 · AI Workspaces folder (vault parent)**
> "我会在 Lark 云盘里为你创建专属的品牌档案夹。
> 默认位置是 AI Workspaces 文件夹：[default URL from SOUL.md]
> 这个位置可以吗？如果你已经有一个偏好的位置，可以把链接给我。
>
> I'll create your brand's vault folder in Lark Drive.
> Default location is the AI Workspaces folder: [url]. Is that OK?
> If you have a preferred parent folder, paste the Lark Drive link."

→ Maps to: `{{LARK_WORKSPACES_URL}}` (parent folder)
→ If unchanged: keep default
→ After Q14 answer: DO NOT wait — immediately proceed to create the vault:
  ```
  [AGENT ACTION — runs silently during Q15]
  mcp.lark.drive.create_folder(
    parent_url = {{LARK_WORKSPACES_URL}},
    folder_name = "vault-{{BRAND_SLUG}}"
  )
  → Save returned folder URL as {{VAULT_LARK_URL}}
  → Copy vault-templates/ contents into the new Lark Drive folder
  → If folder creation fails: log error, ask owner to create manually and paste the URL
  ```

---

**Q15 · Promotions and pricing**
> "你们有固定的优惠或套餐价格区间吗？
> 比如午市套餐价格、家庭套餐范围等——帮助我在推广时确保价格准确。
> Do you have standard promotions or price ranges?
> E.g. lunch set price, family meal range — helps me ensure price accuracy in posts."

→ Notes added to: `compliance/fda-ftc-rules.md` price verification section

---

## Post-Interview Actions

After all 15 questions are answered:

```
1. Fill all {{PLACEHOLDER}} values in SOUL.md → save as SOUL_{BRAND_SLUG}.md
2. Update brand-voice.md with Q9/Q10 answers
3. Fill bilingual-gate.md Canonical Dish Name Map with Q11 answers
4. Fill allergen-gate.md Brand Dish Allergen Table with Q12 answers
5. [IF NOT ALREADY DONE IN Q14] Create Lark Drive vault:
   mcp.lark.drive.create_folder(parent={{LARK_WORKSPACES_URL}}, name="vault-{{BRAND_SLUG}}")
   → Upload vault-templates/ files into the new folder
   → Store returned URL as {{VAULT_LARK_URL}} in SOUL.md shared_resources
6. Initialize vault-index.md with: brand name, owner Lark ID, Trending Radar URL, vault Lark URL
7. Run global search for {{ in SOUL.md → must be ZERO before proceeding
8. Send confirmation to owner:
```

**Confirmation message:**
```
✅ 配置完成！我现在正式开始工作了。

以下是我的设置概要：
- 品牌：{BRAND_NAME}
- 运营平台：{ACTIVE_PLATFORMS}
- 审批通知：会发送到你的 Lark（{OWNER_LARK_ID}）
- 每天工作时间：06:30 – 23:45（自动化）

明天早上 08:00，我会给你发第一批内容提案。
前 3 条内容需要你审批（Tier 1）后才会发布。

有任何问题，随时 Lark 我！

---

✅ Setup complete! I'm officially starting work now.

Summary:
- Brand: {BRAND_NAME}
- Platforms: {ACTIVE_PLATFORMS}
- Approvals: I'll notify you via Lark ({OWNER_LARK_ID})
- Daily schedule: 06:30 – 23:45 (automated)

Tomorrow at 08:00, I'll send you the first batch of content proposals.
The first 3 posts require your approval (Tier 1) before publishing.

Message me on Lark anytime!
```

---

## If Owner Is Unresponsive During Interview

If no response for 2 hours during the interview:
- Send a reminder: "还在吗？我们继续吧 / Still there? Let's continue when you're ready."
- If no response for 24 hours: log incomplete onboarding in ownerreview.md, notify management (唐三藏 or system owner) via Lark

Do NOT start operating until Bootstrap Mode is fully complete (zero {{PLACEHOLDER}} remaining).
