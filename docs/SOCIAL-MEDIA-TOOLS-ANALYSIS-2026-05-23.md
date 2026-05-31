# Social Media Account Management Tooling Analysis

Date: 2026-05-23
Workspace: git-plugin-amc
Focus: GitHub skill/tool search for API integration, scraping analysis, RPA posting, and comment management

## 1. Goal

This document consolidates the full search and analysis work for selecting GitHub tools to support self-media account operations, including:

- API integration
- Scraping and data analysis
- RPA publishing/posting
- Comment and interaction management

It also includes a deeper platform-specific recommendation for Xiaohongshu (RedNote), which was selected for further drilling.

## 2. Search Method

Search was executed via GitHub repository search and follow-up code-level lexical checks.

### 2.1 Repository Search Patterns

- social media management api
- social media scraper
- social media automation playwright OR puppeteer
- social media comment moderation
- xiaohongshu api sdk
- xiaohongshu scraper
- xiaohongshu playwright automation
- xiaohongshu comment bot
- xiaohongshu creator api publish comment

### 2.2 Validation Method

For shortlisted repositories, capability claims were validated by searching repository code/docs for concrete function and route evidence, such as:

- publish endpoints/commands
- comment/reply endpoints/commands
- feed search/list/detail support
- platform-specific provider scopes and permission strings

## 3. Cross-Platform Findings (General)

## 3.1 API Integration Candidates

- https://github.com/gitroomhq/postiz-app
  - High maturity open-source social scheduling platform.
  - Evidence found for comment-related components/providers.
- https://github.com/inovector/mixpost
  - Mature scheduling and management platform.
  - Evidence found for Meta scopes including comment/engagement permissions.
- https://github.com/owlstacks/owlstack-laravel
  - Multi-platform API SDK orientation (PHP/Laravel).
- https://github.com/postmypost/node-rest-sdk
  - Node SDK for scheduling/publishing via Postmypost API.

## 3.2 Scraping and Analysis Candidates

- https://github.com/apify/crawlee
  - Strong crawler base layer (Playwright/Puppeteer/Cheerio, retries/proxies).
- https://github.com/apify/apify-mcp-server
  - Agent-oriented scraping orchestration over Apify ecosystem.
- https://github.com/d60/twikit
  - X/Twitter non-official API scraping support.
- https://github.com/vladkens/twscrape
  - X/Twitter scraping with auth support.
- https://github.com/instaloader/instaloader
  - Strong Instagram extraction tool.
- https://github.com/davidteather/TikTok-Api
  - Common unofficial TikTok API wrapper.

## 3.3 RPA Posting Candidates

- https://github.com/profullstack/social-poster
  - Puppeteer-based multi-platform posting.
- https://github.com/growchief/growchief
  - Outreach/social automation orientation.
- https://github.com/ColombiaPython/social-media-automation
  - Selenium posting scripts for selected platforms.

## 3.4 Comment Management Candidates

- https://github.com/gitroomhq/postiz-app
  - Verified comment-related providers/components in code search.
- https://github.com/socioboard/Socioboard-5.0
  - Verified routes and models related to comment operations.
- https://github.com/inovector/mixpost
  - Verified engagement/comment-oriented permission scopes and UI components.

## 4. Xiaohongshu (RedNote) Deep Dive

User-selected platform for deeper analysis.

### 4.1 Shortlist and Current Signals

- https://github.com/xpzouying/xiaohongshu-mcp
  - High star count and active updates.
  - Positioning: MCP + HTTP API for Xiaohongshu operations.
- https://github.com/NanmiCoder/MediaCrawler
  - Very high star count and active updates.
  - Positioning: multi-platform crawler with Xiaohongshu comments/search coverage.
- https://github.com/dreammis/social-auto-upload
  - High star count and active updates.
  - Positioning: automated upload/publishing including Xiaohongshu.
- https://github.com/ReaJason/xhs
  - Active wrapper for Xiaohongshu web-side request workflows.
- https://github.com/white0dew/XiaohongshuSkills
  - Skill-style toolkit with publish/comment/search workflows.
- https://github.com/TikHub/TikHub-API-Python-SDK
  - Multi-platform API SDK including Xiaohongshu claims.

### 4.2 Verified Capability Evidence

Evidence below comes from repository text/code search, not only README slogans.

#### xpzouying/xiaohongshu-mcp

- Verified route patterns for publishing and feeds:
  - publish
  - publish_video
  - feeds/list
  - feeds/search
- Verified API docs entries for:
  - post comment failures
  - reply comment failures
- Verified MCP handlers for publish and reply comment workflows.

#### ReaJason/xhs

- Verified docs/changelog entries for:
  - comment note API
  - delete note comment API
  - comment user API
- Verified tests and core references related to comment handling.

#### NanmiCoder/MediaCrawler

- Verified Xiaohongshu features for:
  - keyword search
  - note crawling
  - secondary comments
  - creator homepage crawling
- Verified configuration and store paths for comment crawling and persistence.

#### dreammis/social-auto-upload

- Verified CLI commands for Xiaohongshu login/check/upload.
- Verified uploader references to creator Xiaohongshu URLs for video/note publishing pages.

#### white0dew/XiaohongshuSkills

- Verified scripts and README examples for:
  - publish flow
  - get feed detail
  - post comment
  - multi-account operations

### 4.3 Important Observation: Official API Ecosystem

Search terms intended to locate official-style Xiaohongshu open SDKs returned weak/no robust open-source official ecosystem signal. In practice, the strongest currently visible open-source path is a hybrid model:

- reverse-engineered or unofficial API wrappers
- browser automation workflows
- dedicated crawler stacks for analysis

## 5. Recommended Architecture (Best Practical Combination)

For Xiaohongshu account operations, the most stable practical combination is:

1. Control and orchestration layer:
   - xpzouying/xiaohongshu-mcp
2. Publishing execution layer:
   - dreammis/social-auto-upload
3. Data collection and analysis layer:
   - NanmiCoder/MediaCrawler
4. Low-level API fallback wrapper:
   - ReaJason/xhs

Why this combination works:

- Separates concerns cleanly (control vs posting vs crawling).
- Reduces single-point breakage from UI/API changes.
- Keeps comment and interaction capability in the control layer while allowing publishing fallback on browser automation.

## 6. Risk and Operational Notes

- Xiaohongshu automation commonly depends on login state, anti-bot checks, and platform UI/API drift.
- Production workflow should include:
  - cookie/session refresh strategy
  - retry and backoff
  - manual takeover path for CAPTCHA/risk control
  - clear audit logs for post/comment actions

## 7. Priority Ranking

Based on repository signals and capability verification:

1. Overall Xiaohongshu control + interaction: xpzouying/xiaohongshu-mcp
2. Xiaohongshu scraping + analysis: NanmiCoder/MediaCrawler
3. Xiaohongshu automated publishing: dreammis/social-auto-upload
4. Xiaohongshu low-level API wrapper: ReaJason/xhs
5. Skill-style workflow toolkit: white0dew/XiaohongshuSkills

## 8. Suggested Next Implementation Step

Convert this selection into a project-native skill package with:

- one skill for API/control actions (search/detail/comment/reply/publish)
- one skill for crawler analysis jobs
- one skill for publishing fallback and recovery runbooks

This keeps your operations resilient while preserving clear boundaries between data collection, orchestration, and execution.
