---
name: xiaohongshu
description: "小红书执行层：搜索/详情/评论/发布 + 采集分析 + RPA fallback"
plugin: git-plugin-amc
---

# Skill · Xiaohongshu Execution
# F&B Content Engine · platforms/xiaohongshu

## Purpose

Use this skill when work requires reliable Xiaohongshu operations beyond copywriting guidance, including:

- Feed search and detail retrieval
- Comment posting and reply handling
- Note/video publishing execution
- Data crawling and comment analytics
- Browser automation fallback when API path is unstable

## Tooling Priority

Always use this order unless the user explicitly overrides:

1. API/control layer:
   - Prefer xiaohongshu-mcp style toolchain for search, feed detail, publish, comment, reply.
2. Crawling/analysis layer:
   - Use MediaCrawler-style jobs for keyword tracking, creator tracking, and comment harvesting.
3. RPA publish fallback:
   - Use social-auto-upload style browser automation when API/control layer cannot complete.
4. Low-level fallback wrapper:
   - Use xhs wrapper style calls for targeted recovery if step 1 fails.

## Operating Rules

- AMC Kanban remains primary orchestration path for task tracking and status transitions.
- Before execution: set task to in_progress and record selected path (API or RPA).
- If blocked by risk control / captcha / login expiration:
  - Set task to pending,
  - Describe required input,
  - Capture evidence and exact failure step.
- After completion: update done with links/IDs/metrics snapshot.

## Required Output Fields

Every completed Xiaohongshu task should include:

- action_type: search | detail | publish_note | publish_video | post_comment | reply_comment | crawl_job
- execution_path: api | crawler | rpa | wrapper
- target_id: feed_id / note_id / keyword / account
- result: success | partial | failed
- evidence: returned IDs, post URL (if available), or log summary

## Fallback Decision Matrix

- If publish API fails with auth/session issue: refresh login state and retry once.
- If publish API fails due to unsupported action: switch to RPA publish flow.
- If comment API fails but feed is visible: switch to RPA comment flow.
- If crawler is blocked: reduce request intensity, rotate IP/proxy, and continue in batched mode.

## Safety and Compliance

- Do not fabricate engagement data, post IDs, or comment outcomes.
- Keep platform compliance checks enabled (content claims, visual rights, platform policy).
- Escalate to owner-approval skill for crisis-sensitive or policy-risk content.
