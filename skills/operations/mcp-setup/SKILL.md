---
name: mcp-setup
description: "Exact procedures for configuring mcp.postfast and mcp.gbp in OpenClaw — run this when a user provides API credentials during or after Bootstrap"
plugin: fb-content-engine
---

# MCP Setup — PostFast + GBP

This skill provides the exact configuration steps for connecting publishing tools.
Run these procedures whenever a brand provides API credentials — during Bootstrap Q6 or any time via Lark command.

---

## OpenClaw MCP Config Format

OpenClaw stores MCP tool configuration in `openclaw.json` under the `"mcp"` key (NOT `"mcpServers"`).

```json
{
  "mcp": {
    "tool-name": {
      "command": "npx",
      "args": ["-y", "@package/name"],
      "env": {
        "API_KEY": "value"
      }
    }
  }
}
```

**Never use `"mcpServers"` as the key — OpenClaw will reject it.**

After editing `openclaw.json`, always run:
```bash
openclaw reload
```

---

## Procedure A · Configure PostFast MCP

**When:** Brand provides a PostFast API key (found at postfa.st → Settings → API).

**Step 1 — Add to openclaw.json:**

```bash
openclaw mcp add postfast \
  --command npx \
  --args "-y,@postfast/mcp" \
  --env "POSTFAST_API_KEY=<KEY_FROM_USER>"
```

Or edit `openclaw.json` directly:

```json
{
  "mcp": {
    "postfast": {
      "command": "npx",
      "args": ["-y", "@postfast/mcp"],
      "env": {
        "POSTFAST_API_KEY": "<KEY_FROM_USER>"
      }
    }
  }
}
```

**Step 2 — Reload:**
```bash
openclaw reload
```

**Step 3 — Verify connection per platform:**
```
for platform in [instagram, facebook, tiktok, youtube, x, threads]:
    result = mcp.postfast.check_connection(platform)
    if result == "connected":
        → move platform from pending_platforms to active_platforms in SOUL.md
```

**Step 4 — Update SOUL.md:**
Move verified platforms from `pending_platforms` to `active_platforms`.

**Step 5 — Confirm to user via Lark:**
```
✅ PostFast 已连接！以下平台现在可以自动发布：
{newly_active_platforms}

✅ PostFast connected. Auto-publish enabled for:
{newly_active_platforms}
```

---

## Procedure B · Configure GBP MCP (Google Business Profile)

**When:** Brand provides a Google Service Account JSON key or completes OAuth.

**Note:** GBP MCP is a lightweight custom server. If not yet deployed, guide the user to set it up first:
```
GBP MCP 需要先部署服务。
请访问：https://github.com/alextiannus/mcp-gbp（即将发布）
或跳过，之后在 Google Maps 回复评论时手动操作。
```

Once deployed:

```json
{
  "mcp": {
    "gbp": {
      "command": "npx",
      "args": ["-y", "@12eat-ai/mcp-gbp"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/service-account.json",
        "GBP_LOCATION_ID": "<location_id_from_user>"
      }
    }
  }
}
```

```bash
openclaw reload
```

---

## Procedure C · Connect Platform After Bootstrap

**Triggered by:** Lark message containing any of:
`连接账号` / `connect account` / `add postfast` / `add api key` / `配置PostFast`

**Script:**

```
1. Reply: "好的，请把 PostFast API Key 发给我，我来帮你配置。
          Please send me your PostFast API Key and I'll configure it now.
          (找到方式：postfa.st → Settings → API Keys)"

2. Wait for user to send the API key

3. Validate format: PostFast keys start with "pk_" or "sk_" — if wrong format, ask again

4. Run Procedure A above

5. Confirm to user
```

---

## Troubleshooting

| 症状 | 原因 | 解决 |
|---|---|---|
| `openclaw reload` 后 MCP 工具仍不可用 | `openclaw.json` key 写成了 `"mcpServers"` | 改为 `"mcp"` |
| `check_connection()` 返回 error | API key 格式错误或权限不足 | 让用户重新生成 API key |
| PostFast 发布失败 | 平台账号未在 PostFast 后台连接 | 引导用户登录 postfa.st 连接社媒账号 |
| GBP 连接失败 | Service account 缺少 GBP 权限 | 需要 `roles/businesscommunications.admin` |
