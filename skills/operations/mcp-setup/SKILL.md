---
name: mcp-setup
description: "Configure mcp.postfast (PostFast API Key) and mcp.gbp (GBP Location ID) in OpenClaw — used during Bootstrap Q6, after Bootstrap via Lark command, and automatically when missing credentials are detected at startup"
plugin: fb-content-engine
---

# MCP Setup — PostFast + GBP

This skill provides the exact configuration steps for connecting publishing tools.
Run these procedures whenever a brand provides API credentials:
- During Bootstrap Q6 (first-time setup)
- Any time via Lark command (`连接账号`, `add postfast`, `add google`)
- **Automatically at startup** when credentials are detected missing (see Runtime Detection below)

---

## Runtime Credential Detection (Automatic)

The plugin automatically checks for missing credentials on every startup in normal ops mode.

**When triggered:** Agent detects `POSTFAST_API_KEY` or `GBP_LOCATION_ID` missing from system environment variables and `openclaw.json`
but the corresponding platforms are listed in `active_platforms` in SOUL.md.

**What the agent does:**
1. Immediately sends a Lark message to the brand team requesting the missing credentials
2. Waits for the team to reply
3. On receipt, validates and configures via Procedures A / B below
4. Suspends all cron jobs and platform operations until credentials are configured

**Lark message template (sent automatically):**
```
⚠️ 发现平台账号未连接 / Platform credentials missing

[For PostFast missing:]
📱 PostFast API Key 缺失
   影响平台: instagram / facebook / tiktok / ...
   获取方式：postfa.st → Settings → API Keys（以 pk_ 或 sk_ 开头）

[For GBP missing:]
🗺️ Google Business Profile ID 缺失
   影响平台: Google Maps
   获取方式：Google Business Profile 后台 → 商家资料 URL 中的数字 ID

请把对应的 key / ID 发给我，我来帮你立即配置并重新连接。
Please send me the API key / Location ID and I'll configure it right away.
```

**When team replies with credentials:** Go directly to Procedure A (PostFast) or Procedure B (GBP).

---

## OpenClaw MCP Config Format

OpenClaw stores MCP tool configuration in `openclaw.json` under the `"mcp"` key (NOT `"mcpServers"`).

```json
{
  "mcp": {
    "servers": {
      "tool-name": {
        "command": "npx",
        "args": ["-y", "@package/name"],
        "env": {
          "API_KEY": "value"
        }
      }
    }
  }
}
```

**Never use `"mcpServers"` as the root key — OpenClaw will reject it.**

After editing `openclaw.json`, always run:
```bash
openclaw gateway restart
```

---

## Procedure A · Configure PostFast Skill

**When:** Brand provides a PostFast API key.

**Step 1 — Validate key format:**
PostFast API keys start with `pk_` or `sk_`. If the key doesn't match this pattern, reply:
```
这个 key 格式不对，PostFast API Key 应该以 pk_ 或 sk_ 开头。
请到 postfa.st → Settings → API Keys 重新获取。

That key format looks incorrect. PostFast API Keys start with pk_ or sk_.
Please get it from postfa.st → Settings → API Keys.
```

**Step 2 — Install PostFast Skill & Save Key:**

Execute the following command to install the official PostFast skill.

```bash
openclaw skills install postfast
```

Next, you MUST permanently save the provided API key to the configuration by running the native script:

```bash
node scripts/set-mcp-env.js postfast POSTFAST_API_KEY <THE_API_KEY_PROVIDED_BY_USER>
```

**Step 3 — Reload:**
```bash
openclaw gateway restart
```

**Step 4 — Verify connection per platform:**
Use `mcp.bash` to call the PostFast API to verify the connected accounts:
```bash
curl -s -H "pf-api-key: $POSTFAST_API_KEY" https://api.postfa.st/social-media/my-social-accounts
```
Check the returned list of connected accounts. For each account found in the response, move that platform from `pending_platforms` to `active_platforms` in SOUL.md.

**Step 5 — Update SOUL.md:**
Move verified platforms from `pending_platforms` to `active_platforms`.

**Step 6 — Confirm to user via Lark:**
```
✅ PostFast 已连接！以下平台现在可以自动发布：
{newly_active_platforms}

✅ PostFast connected. Auto-publish enabled for:
{newly_active_platforms}
```

---

## Procedure B · Configure GBP MCP (Google Business Profile)

**When:** Brand provides a Google Business Profile Location ID.

### Step 1 — Get the Location ID

The GBP Location ID identifies the specific business location in Google's system.

**How to find it (guide the user):**
```
请按以下步骤找到你的 Google Business Profile 地址 ID：
1. 登录 business.google.com
2. 选择你的商家
3. 看浏览器地址栏，URL 格式如下：
   https://business.google.com/u/0/edit/l/{LOCATION_ID}
   或
   https://business.google.com/dashboard/u/0/l/{LOCATION_ID}
4. 把 {LOCATION_ID} 部分发给我

完整格式也可以是：accounts/{accountId}/locations/{locationId}
```

In English:
```
To find your Google Business Profile Location ID:
1. Go to business.google.com and sign in
2. Select your business
3. Check the URL bar — it contains your Location ID:
   https://business.google.com/u/0/edit/l/{LOCATION_ID}
4. Send me that ID (numbers only, or the full accounts/.../locations/... path)
```

### Step 2 — Deploy GBP MCP (if not yet done)

**Note:** GBP MCP is a lightweight custom server. If not yet deployed:
```
GBP MCP 需要先部署服务。
请访问：https://github.com/alextiannus/mcp-gbp（即将发布）
或跳过，之后在 Google Maps 回复评论时手动操作。

The GBP MCP server needs to be deployed first.
See: https://github.com/alextiannus/mcp-gbp (coming soon)
Or skip for now — Google Maps reviews can be handled manually until then.
```

### Step 3 — Configure openclaw.json

Run the native script to permanently save the GBP Location ID:

```bash
node scripts/set-mcp-env.js gbp GBP_LOCATION_ID <LOCATION_ID_FROM_USER>
```

Then reload the gateway:

```bash
openclaw gateway restart
```

### Step 4 — Verify and confirm

```
result = mcp.gbp.check_connection()
if connected:
    → send Lark: "✅ Google Business Profile 已连接！Google Maps 评论回复和发帖现在可以自动执行。"
```

---

## Procedure C · Connect Platform After Bootstrap (via Lark command)

**Triggered by:** Lark message containing any of:
`连接账号` / `connect account` / `add postfast` / `add api key` / `配置PostFast` / `add google` / `配置GBP`

**Script:**

```
1. Ask which credential is needed (if ambiguous):
   "需要配置哪个？PostFast API Key（用于 Instagram/Facebook/TikTok）还是 Google Business Profile ID（用于 Google Maps）？
    Which do you need to set up? PostFast API Key (for Instagram/Facebook/TikTok) or Google Business Profile ID (for Google Maps)?"

2. For PostFast:
   → Ask for API Key → validate pk_/sk_ prefix → run Procedure A

3. For GBP:
   → Guide user to find Location ID (Procedure B Step 1) → run Procedure B Steps 3-4
```

---

## Troubleshooting

| 症状 | 原因 | 解决 |
|---|---|---|
| `openclaw gateway restart` 后 MCP 工具仍不可用 | `openclaw.json` key 写成了 `"mcpServers"` | 改为 `"mcp"` |
| `check_connection()` 返回 error | API key 格式错误或权限不足 | 让用户重新生成 API key |
| API/PostFast 严重限流或宕机 | 平台风控或服务器故障 | **自动启用 Browser Control 工具，模拟真人登录对应平台，以浏览器自动化方式拉取评论和发帖** |
| PostFast 发布失败 | 平台账号未在 PostFast 后台连接 | 引导用户登录 postfa.st 连接社媒账号 |
| GBP 连接失败 | Service account 缺少 GBP 权限 | 需要 `roles/businesscommunications.admin` |
| GBP Location ID 找不到 | 用户不熟悉 GBP 后台 | 按 Procedure B Step 1 引导用户找 URL |
| 启动后自动发 Lark 消息索要 key | 正常行为 — credentials 缺失 | 提供对应 key 后自动消失 |
