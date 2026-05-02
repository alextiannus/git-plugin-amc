# Contributing to ACM Skill Packs

Thank you for contributing to the F&B Content Engine skill-packs library.  
This guide explains how to add a new community skill pack in under 10 minutes.

---

## What is a Skill Pack?

A skill pack is a single directory containing a `SKILL.md` file that teaches the ACM agent a specific marketing technique, framework, or content strategy. Skill packs extend the agent's capabilities without modifying the core plugin.

---

## Three Tiers of Contribution

| Tier | Who | Review | Merge |
|---|---|---|---|
| `community/` | Anyone | CI bot only (format check) | Auto-merge on pass |
| `verified/` | Community → AI Lab review | 12eat AI Lab accuracy check | Manual, within 5 business days |
| `premium/` | 12eat AI Lab only | Internal | Not in this repo |

**Start with `community/`.** If your pack is well-received (10+ GitHub stars or forks), request Verified status via GitHub issue.

---

## How to Contribute a Community Pack

### Step 1 · Fork and clone

```bash
git clone https://github.com/alextiannus/git-plugin-amc
cd git-plugin-amc
```

### Step 2 · Choose a category and name

Place your pack in the right category under `skill-packs/community/`:

```
copywriting/       Copywriting frameworks, formulas, CTA patterns
platform-mastery/  Platform algorithm insights, posting strategies
fb-specific/       Food & beverage, restaurant, menu content
cn-overseas/       Chinese diaspora market, bilingual content
```

Name your pack with lowercase kebab-case: `my-skill-name`

### Step 3 · Create your SKILL.md

```bash
mkdir skill-packs/community/<category>/<your-skill-name>
cp skill-packs/SKILL_PACK_TEMPLATE.md skill-packs/community/<category>/<your-skill-name>/SKILL.md
```

Edit the file. **Required fields** in the YAML frontmatter:

```yaml
---
name: your-skill-name          # must match directory name
description: "One sentence"    # used by OpenClaw for skill discovery
version: "1.0.0"
tier: community
category: copywriting          # one of the four categories above
author: "Your GitHub handle"
license: MIT
min_plugin_version: "0.5.5"
---
```

### Step 4 · Open a Pull Request

```bash
git checkout -b skill/your-skill-name
git add skill-packs/community/<category>/<your-skill-name>/
git commit -m "skill: add <your-skill-name> to community/<category>"
git push origin skill/your-skill-name
```

Open a PR against `main`. The CI bot will check your pack within 2 minutes.  
If all checks pass, it merges automatically — **no human approval needed**.

---

## CI Validation Rules

The bot checks:

| Check | Rule |
|---|---|
| Frontmatter present | YAML block with all required fields |
| Name matches directory | `name:` field = parent directory name |
| Description length | 10–200 characters |
| Content length | 100–3000 words |
| No blocked keywords | No personal data, no spam patterns |
| License declared | Must be MIT or CC-BY-4.0 |
| Valid category | One of the four accepted categories |

If any check fails, the bot posts a comment explaining what to fix. No human review needed for fixes — just push a new commit to the same PR.

---

## Quality Guidelines

These are not enforced by the bot but make your pack more useful:

- **Be specific.** "Hook formula for food photos" beats "marketing tips".
- **Include examples.** At least 2 filled-in examples showing real output.
- **State when NOT to use.** Prevents the agent from applying the skill in the wrong context.
- **Cite your source.** If based on a book, blog, or creator's framework, credit them in Notes.
- **Test it.** Run the skill against a real F&B brand prompt before submitting.

---

## Requesting Verified Status

Once your pack is in `community/` and has been used for a while, open a GitHub issue titled:  
`[Verified Request] <skill-name>`

12eat AI Lab will review for:
- Factual accuracy (no outdated platform claims)
- No conflicts with core plugin skills
- Consistent quality with other Verified packs

Verified packs get a ✅ badge in the catalog and are featured in the README.

---

## License

All contributions to `skill-packs/community/` and `skill-packs/verified/` must be licensed under **MIT** or **CC-BY-4.0**.

By submitting a PR, you confirm that:
1. You are the original author of the content, or have rights to contribute it.
2. You agree to license it under MIT.
3. The content does not infringe any third-party copyright.

The core plugin (`skills/`, `bootstrap/`, `src/`, etc.) remains under MIT.  
`skill-packs/premium/` is proprietary and not open for community contribution.

---

## Code of Conduct

Be kind. No spam. No scraped content from paywalled sources.  
Issues and PRs that violate this will be closed without comment.
