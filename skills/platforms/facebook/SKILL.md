---
name: facebook
description: "Community-focused, discussion questions mandatory"
plugin: git-plugin-amc
---

# Skill · Facebook
# F&B Content Engine · platforms/facebook.md
# ──────────────────────────────────────────

## Role in Repurpose Chain

**Step 4.** Frame the same content as a community conversation, not a broadcast.
Facebook is about belonging. Every post should invite participation.

## Mandatory Context Preload

Before generating any Facebook post draft:
- Read `vault/brandcontext.md` first.
- If read fails, stop generation and report the blocker.
- Output this line at the top before strategy routing:
  `[BrandContext Loaded] vault/brandcontext.md loaded successfully before generation.`

---

## Posting Specs

| Setting | Value |
|---|---|
| Frequency | 3-4x per week |
| Best times | 12–1pm · 6–8pm |
| Peak days | Tuesday · Thursday · Saturday |
| Post length | 100-300 words |
| Images | 1-4 photos |
| Language | EN primary; ZH secondary for Chinese-community posts |

---

## The Facebook Formula

Facebook is about belonging. Every post should invite participation and target local families or regulars.

### Strategy Pool & Router (策略池与决策机制)
**CRITICAL RULE:** Before generating any Facebook content, you MUST evaluate the input and output your decision process at the top of your response:
`[Decision] I chose Strategy [A/B/C] because the input focuses on [Reason].`

- **Strategy A: The Community Story (街坊邻居型)**
  - *Trigger:* Local events, regulars, history, BTS.
  - *Focus:* Warm tone, gratitude to the neighborhood, storytelling.
  - *CTA:* "What's your favorite memory here?" or "Say hi to Chef when you drop by!"
- **Strategy B: The Family Meal (家庭聚餐型)**
  - *Trigger:* Large portions, catering, weekend specials, kid-friendly items.
  - *Focus:* Ease of ordering, feeding the whole family, value.
  - *CTA:* "Tag whoever is on dish duty tonight." or "Let us handle Friday dinner."
- **Strategy C: The Local Poll (互动投票型)**
  - *Trigger:* Menu changes, seasonal items, general engagement.
  - *Focus:* Asking the audience for input.
  - *CTA:* "Spicy or mild? Let us know below to settle a kitchen debate."

### Caption Anatomy
```
[Hook — emotional trigger, community focus, or value statement]
[2-3 sentences of substance — dish story, deal, or community moment]
[Discussion question OR community CTA]
```

The discussion question is what makes Facebook different from other platforms. It is mandatory.

**Strong discussion questions:**
- "What's your go-to order when you can't decide? 👇"
- "Tag someone who needs to try this with you."
- "Spicy or mild — which side are you on?"
- "What dish from your hometown do you miss most? We might be able to help."
- "Family dinner sorted — what's everyone ordering this weekend?"

---

## Content That Works on Facebook

- **Community stories** — regulars, loyal customers, neighborhood moments
- **Family meal deals** — Facebook skews older; families respond well to value
- **Deal alerts** — price-conscious audience, clear value messaging
- **Local event tie-ins** — community festivals, cultural holidays, neighborhood news
- **Poll posts** — "Which new dish should we add next?" drives strong engagement
- **Behind-the-scenes** — longer captions are fine; Facebook readers tolerate text more

---

## Audience on Facebook

Facebook skews slightly older than TikTok/Instagram.
- Hungry Locals, especially families making group meal decisions
- Community members who want to feel connected to the neighborhood spot
- Less discovery-focused; more loyalty and community-focused

---

## Facebook Groups

When content is relevant to local community groups:
- Share to local food groups, expat groups, neighborhood groups where permitted
- Never post the exact same content to multiple groups without adapting for each community

---

## Hook Selection for Facebook

Best performing hooks on Facebook (reference [[core/hook-engine]]):
1. Deal ★★★ — price + value; families respond to clear savings
2. Community ★★★ — social proof; "our regulars" framing
3. Craving ★★ — works, but less powerful than on visual platforms

---

## Facebook-Specific Rules

- Contests require official rules and cannot require sharing as a mandatory entry condition (Meta policy)
- Branded content tag required for any paid partnership
- Never post the exact same caption as Instagram — Facebook readers often follow both
- Reactions: "Love" signals stronger interest than "Like" — create content that earns Love reactions
- Buying likes or engagement is prohibited and will hurt organic reach

---

## 🛑 Anti-Hallucination & Authenticity Rules

To maintain brand safety and organic authenticity, you MUST adhere to these strict constraints:
1. **Contact Info Placement (STRICT):** The main post caption MUST NOT contain the store address, operating hours, or contact phone number under any circumstances. You may ONLY mention these details in the first comment / replies. DO NOT use placeholders like `[Address]`.
2. **NO Fake Reviews:** NEVER invent "Customer Reviews" (顾客评价) or fake quotes from non-existent people. Organic posts should be written from the perspective of the brand or a genuine KOC. Invented reviews look like spam and violate authenticity guidelines.
3. **NO Rigid Templates:** Do NOT output content using rigid, robotic headings (e.g., `[特色亮点]`, `[优惠活动]`, `[店铺信息]`) unless explicitly required by the platform format (e.g., YouTube descriptions). Social media posts should flow naturally and conversationally, like a human wrote them.
