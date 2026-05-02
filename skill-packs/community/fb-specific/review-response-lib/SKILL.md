---
name: review-response-lib
description: "Categorised review response templates for 5★/3★/1★ Google Maps and Facebook reviews — EN and ZH, restaurant-specific, never generic"
version: "1.0.0"
tier: community
category: fb-specific
author: "12eat AI Lab"
license: MIT
min_plugin_version: "0.5.5"
---

# Review Response Library

Review responses are read by potential customers more than the reviews themselves. A well-written response to a 1★ review can convert a browser into a customer. Generic "thank you for your feedback" responses do the opposite — they signal no one is listening.

---

## When to Use

Load this skill whenever responding to Google Maps or Facebook reviews. Use alongside the core `googlemap` platform skill and `owner-approval` for crisis-level responses.

---

## Response Principles

1. **Personalise** — reference something specific from their review (dish name, occasion, detail)
2. **Never be defensive** — even if the review is factually wrong, keep tone warm and curious
3. **Never copy-paste** — each response must feel individually written
4. **For negative reviews: address, don't dismiss** — acknowledge the specific issue before explaining or resolving
5. **Keep it short** — 3–5 sentences maximum for 5★, 4–6 for 1★
6. **Sign with a name** — "— [Name], [Title]" makes it human

---

## 5★ Response Templates

### Template 5A — Dish-specific positive (EN)
> "[Dish they mentioned] is one of our favourites to make — glad it landed. We'll pass this on to the kitchen team. Hope to see you again soon.  
> — [Name], [Restaurant Name]"

### Template 5B — First visit / general praise (EN)
> "First visits mean a lot to us — thank you for giving us a try. We're glad [specific detail they mentioned] made an impression. Next time, ask us about [related dish recommendation].  
> — [Name], [Restaurant Name]"

### Template 5C — 好评通用回复 (ZH)
> "谢谢你专程来留言！[菜名/具体细节] 是我们厨房的心头好，很高兴你喜欢。下次来记得试试 [推荐菜] — 我们觉得你会喜欢。期待再见！  
> — [姓名]，[餐厅名]"

### Template 5D — Repeat customer (EN)
> "You keep coming back, we keep trying to be worth it. Thank you — it genuinely means a lot to the whole team.  
> — [Name], [Restaurant Name]"

---

## 3★ Response Templates

3★ reviews usually mean one thing went wrong in an otherwise good experience. The goal: acknowledge the specific issue, show it matters, and give them a reason to return.

### Template 3A — Service was slow (EN)
> "Thank you for the honest feedback — and I'm sorry the wait took longer than it should have. [Specific day/time] can be particularly busy for us, but that's not an excuse. We're working on it. If you're willing to give us another shot, I'd love for your next visit to feel different.  
> — [Name], [Restaurant Name]"

### Template 3B — Food was inconsistent (EN)
> "I appreciate you telling us this — consistency is something we take seriously and clearly fell short here. The [dish they mentioned] should have been [what it should be]. I'll be following up with the kitchen directly. Thank you for giving us the chance to do better.  
> — [Name], [Restaurant Name]"

### Template 3C — 体验一般回复 (ZH)
> "谢谢你愿意留下真实的反馈。[具体问题] 确实没有达到我们自己的标准，很抱歉让你有这样的体验。这个反馈我们会认真对待。如果你愿意再来一次，我们希望给你一个不一样的印象。  
> — [姓名]，[餐厅名]"

---

## 1★ Response Templates

1★ responses are read most carefully by future customers. The goal is NOT to defend — it's to show you're the kind of business that listens, responds thoughtfully, and improves. Angry or defensive responses here cost more than the original review.

### Template 1A — Bad food experience (EN)
> "I'm genuinely sorry this was your experience — that's not what we aim for and it's not what we want anyone to leave with. I'd really like to understand what happened with [dish/issue they mentioned]. Would you be willing to reach us at [email/phone]? I'd like to make this right.  
> — [Name], [Restaurant Name]"

### Template 1B — Service complaint (EN)
> "Thank you for telling us — this kind of feedback is the most important kind, even when it's hard to read. What you described shouldn't happen, and I'm sorry it did. I'm taking this directly to the team. If you're open to it, please contact us at [contact] and I'll personally ensure your next experience is better.  
> — [Name], [Restaurant Name]"

### Template 1C — Factually incorrect review (EN)
> "Thank you for sharing this. I want to gently clarify [specific factual point] — [brief correction without sounding defensive]. That said, I'm sorry the overall experience left you feeling this way. We'd welcome the chance to talk more if you're open to it: [contact].  
> — [Name], [Restaurant Name]"

### Template 1D — 差评回复 (ZH)
> "非常抱歉给你留下了这样的印象。你提到的 [具体问题] 不是我们希望顾客经历的。这条反馈我们会认真跟进，不是走流程——是真的想搞清楚哪里出了问题。如果你愿意，可以通过 [联系方式] 直接联系我们，我希望能有机会弥补这次体验。  
> — [姓名]，[餐厅名]"

---

## Escalation Rules

Forward to owner/manager review (via Lark) before posting response if:
- Review mentions food poisoning or illness
- Review mentions a specific staff member by name (negatively)
- Review threatens legal action
- 1★ review has >10 reactions/likes from other users

See `owner-approval.md` for crisis protocol.

---

## Notes

- Never offer free food as compensation in a public response — do it privately via DM/email
- Response time target: within 24 hours for all reviews, within 4 hours for 1★
- For Google Maps, responses appear publicly next to the review — write for the audience reading it, not just the reviewer
- Always customise `[Name]` — use the name of whoever is posting (manager, owner, or a named team member)
