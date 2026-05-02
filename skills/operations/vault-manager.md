# Skill · Vault Manager
# F&B Content Engine · operations/vault-manager.md
# ─────────────────────────────────────────────────

## Purpose

Define the vault structure, file naming conventions, and maintenance rules.
The vault is the brand's operational memory — post records, media, schedules, reports.

---

## Vault Structure

```
vault-{brand}/
│
├── vault-index.md               ← Master index and quick-reference
│
├── brand/
│   ├── ownerreview.md           ← Owner feedback ledger (daily log + escalation records)
│   └── owner-profile.md         ← Owner Lark ID, contact preferences, SLA, timezone
│
├── media/
│   ├── media-index.md           ← Index of all media assets
│   └── YYYY-MM-DD_{slug}/       ← One folder per topic or shoot
│       ├── raw/                 ← Original files, never edited
│       ├── edited/              ← Final versions used in posts
│       └── consent/             ← Consent screenshots for customer/third-party media
│
├── post/
│   ├── postschedule.md          ← Master content calendar
│   └── YYYY-MM-DD_{slug}.md     ← One record per published topic
│
└── report/
    ├── report-rules.md          ← KPI definitions and reporting standards
    ├── analytics/               ← On-demand analytics reports
    │   └── YYYY-MM-DD_{slug}.md
    ├── weekly/                  ← Auto-generated every Monday
    │   └── YYYY-Www.md          ← e.g. 2026-W18.md
    └── monthly/                 ← Auto-generated 1st of every month
        └── YYYY-MM.md           ← e.g. 2026-05.md
```

---

## File Naming Conventions

All files follow this pattern: `YYYY-MM-DD_{topic-slug}`

Slug rules:
- Lowercase
- Hyphens between words (not underscores, not spaces)
- Max 40 characters
- Descriptive enough to identify content without opening the file

**Examples:**
- `2026-05-01_malatangpot-lunch-promo`
- `2026-05-03_handpulled-noodles-bts`
- `2026-05-07_family-meal-deal-launch`

---

## vault-index.md Contents

The vault-index.md is the first file the agent reads when starting work.
It must always be up to date.

```markdown
# Vault Index — {BRAND_NAME}

## Brand
- Brand: {BRAND_NAME}
- Slug: {BRAND_SLUG}
- Owner Lark ID: {OWNER_LARK_ID}
- Trending Radar: {TRENDING_RADAR_URL}
- Plugin version: {PLUGIN_VERSION}

## Quick Links
- Post schedule: vault-{brand}/post/postschedule.md
- Owner review log: vault-{brand}/brand/ownerreview.md
- Media index: vault-{brand}/media/media-index.md
- Latest weekly report: vault-{brand}/report/weekly/[latest].md

## Active Escalations
[List any unresolved Tier 1 or Tier 2 escalations here]

## Last Updated
[Auto-updated by vault-manager on each write]
```

---

## postschedule.md Format

The master content calendar. The agent reads this every morning at 08:00.

```markdown
# Content Schedule — {BRAND_NAME}

| Date | Time | Platform | Topic Slug | Format | Status | Post Record |
|---|---|---|---|---|---|---|
| 2026-05-01 | 11:00 | instagram | malatangpot-lunch | carousel | published | [link] |
| 2026-05-01 | 17:00 | tiktok | malatangpot-lunch | video | published | [link] |
| 2026-05-02 | 11:00 | instagram | familymeal-deal | carousel | approved | [link] |
| 2026-05-02 | 11:00 | rednote | familymeal-deal | text+photo | pending-approval | [link] |
```

**Status values:**
- `draft` — created, not yet approved
- `pending-approval` — Tier 1 or 2 escalation sent, awaiting owner response
- `approved` — ready to publish at scheduled time
- `published` — live on platform
- `rejected` — owner rejected; archived
- `held` — deferred to new date/time

---

## Post Record Format

One file per content topic (not per platform). All platform versions in one record.

```markdown
# Post Record — YYYY-MM-DD_{slug}

## Topic
{One-line description of the content idea}

## Platforms & Status
| Platform | Format | Status | Published URL | Engagement (24h) |
|---|---|---|---|---|
| instagram | carousel | published | [url] | 234 likes, 18 comments |
| tiktok | video | published | [url] | 1,204 views, 45 likes |
| rednote | text+photo | published | [url] | 89 likes, 12 saves |
| facebook | text | approved | — | — |

## Drafts
### Instagram Caption
[Full caption text]

### TikTok Script
[Full script]

### RedNote Post
[Full ZH text]

### Facebook Post
[Full text + discussion question]

## Gates
- Compliance Gate: ✅ GREEN / ⚠️ YELLOW: [details] / 🔴 RED: [details]
- Bilingual Gate: ✅ PASS / ⚠️ FLAG: [details]
- Owner Gate: ✅ Not triggered / Tier [1/2/3]: [details]

## Issues / Notes
[Any escalation records, owner feedback, or performance notes]
```

---

## Media Index Format

```markdown
# Media Index — {BRAND_NAME}

| Date | Folder | Content | Source | License | Used In |
|---|---|---|---|---|---|
| 2026-05-01 | 2026-05-01_malatangpot/ | Dish hero shot | Brand-owned | — | IG post, TikTok |
| 2026-05-01 | 2026-05-01_malatangpot/consent/ | Customer photo @username | Customer (consent saved) | DM consent | IG repost |
```

---

## Vault Maintenance Rules

1. **Never delete post records.** Archive by moving to `post/archive/` if needed.
2. **Media raw files are never edited.** Always work from `edited/` folder.
3. **ownerreview.md is append-only.** Never edit past entries.
4. **vault-index.md is updated on every write.** Keep the Active Escalations section current.
5. **Report files are auto-generated.** Never manually edit weekly or monthly reports — rerun the report instead.
