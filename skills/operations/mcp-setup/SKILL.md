---
name: mcp-setup
description: "配置 GBP Location ID — 所有社交媒体操作通过 AMC Kanban 完成；仅 GBP 需要本地配置"
plugin: git-plugin-amc
---

# MCP Setup — 平台凭证配置

> **架构说明**：安装插件后，用户所有社交媒体操作均通过 **AMC Kanban** 完成。
> Agent 只需持有 `KANBAN_AGENT_API_KEY`，无需在本地配置任何第三方发布平台 API Key。
> 仅当 AMC Kanban 确实无法完成某项操作时，Agent 才自主寻找替代路径（浏览器自动化、直接平台 API 等）。

运行以下 Procedure 的时机：
- Bootstrap Q6 首次配置
- Lark 命令触发（`连接账号`、`add google`）
- 启动时自动检测到凭证缺失（见运行时检测）

---

## 运行时凭证检测（自动）

插件在每次启动的 normal ops 模式下自动检查：

**触发条件：** `KANBAN_AGENT_API_KEY` 未配置，但 `active_platforms` 包含社交媒体平台。

**自动行为：**
1. 立即通过 Lark 发送告警消息给品牌团队
2. 等待团队回复
3. 收到 API Key 后，执行 Procedure A 配置
4. 凭证配置完成前挂起所有 cron job 和平台操作

**自动发送的 Lark 消息模板：**
```
⚠️ AMC Kanban 凭证未配置 / AMC Kanban credentials missing

🔑 KANBAN_AGENT_API_KEY 缺失
   影响平台：所有已激活社交媒体平台
   获取方式：联系 AMC Kanban 管理员获取 Agent API Key
   配置方式：在 OpenClaw MCP 环境变量中设置 KANBAN_AGENT_API_KEY=<key>

请把 API Key 发给我，我来帮你立即配置。
Please send me the API key and I'll configure it right away.
```

**收到凭证后：** 直接执行 Procedure A。

---

## Procedure A · 配置 AMC Kanban Agent API Key

> **触发规则（必须遵守）**：收到任何第三方平台凭证（API Key、OAuth Token、账号密码、Location ID 等），**第一动作是存入 AMC Kanban brand-config**，无需确认，直接调用，完成后再告知结果。**只有写入 Kanban 失败时**，才将凭证保存到本地配置（openclaw.json）作为兜底，并在 Kanban 恢复后重试写入。

**Step 1 — 优先写入 AMC Kanban brand-config：**

```bash
curl -s -X PATCH https://amc-kanban.immedi.ai/api/agent/brand-config \
  -H "Authorization: Bearer $KANBAN_AGENT_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"brandId\": \"$BRAND_ID\",
    \"<credentialField>\": \"<value>\"
  }"
# 常用字段：googlePlaceId / googleApiKey / larkAppId / larkAppSecret 等
```

> 如果上述 curl 返回非 2xx 状态码（写入失败），执行 Step 1b。

**Step 1b — 仅当 Kanban 写入失败时，保存到本地配置（兜底）：**

```bash
node scripts/set-mcp-env.js <tool> <KEY_NAME> <value>
# 并在 Kanban 任务中记录：Kanban 写入失败，已临时保存到本地，待 Kanban 恢复后重试
```

**Step 2 — 验证连接：**

```bash
curl -s -H "Authorization: Bearer $KANBAN_AGENT_API_KEY" \
  "https://amc-kanban.immedi.ai/api/agent/tasks?limit=1"
```

**Step 3 — 完成后告知结果：**
```
✅ 凭证已安全存入 AMC Kanban brand-config。
   所有 Agent 自动共享，无需再次配置。

✅ Credential saved to AMC Kanban brand-config.
   All agents inherit it automatically.
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
`连接账号` / `connect account` / `add api key` / `配置看板` / `add google` / `配置GBP`

**Script:**

```
1. Ask which credential is needed (if ambiguous):
   "需要配置哪个？AMC Kanban API Key 还是 Google Business Profile ID（用于 Google Maps）？
    Which do you need to set up? AMC Kanban API Key or Google Business Profile ID (for Google Maps)?"

2. For AMC Kanban:
   → Ask for API Key → run Procedure A

3. For GBP:
   → Guide user to find Location ID (Procedure B Step 1) → run Procedure B Steps 3-4
```

---

## Autonomous Fallback — When Kanban Cannot Complete

> **核心原则**：AMC Kanban 是所有社交媒体操作的首选工具。只有在 Kanban 确实无法完成时，才启用自主替代路径。
> **强制规则**：一旦 API 路径失败，必须立即调用 `skills/operations/fallback-execution/SKILL.md`，并改走其他 skill（含浏览器自动化）继续执行。

| 情况 | 首选路径 | 替代路径（Kanban 失败时） |
|---|---|---|
| 发布 Instagram/Facebook/TikTok 等 | AMC Kanban 发布端点 | 平台直接 API → 浏览器自动化 |
| 回复评论/私信 | AMC Kanban 评论管理 | 浏览器自动化模拟回复 |
| Google Maps 评论回复 | GBP MCP | 浏览器自动化 |
| 数据抓取/分析 | AMC Kanban 数据端点 | 平台直接 API → 浏览器抓取 |

**无论使用哪种替代路径，都必须在 Kanban 任务 description 中记录：**
1. Kanban 为何无法完成（错误信息、不支持的功能等）
2. 实际使用的替代路径
3. 执行结果证据（链接、截图描述、API 返回值）

---

## Troubleshooting

| 症状 | 原因 | 解决 |
|---|---|---|
| `openclaw gateway restart` 后 MCP 工具仍不可用 | `openclaw.json` key 写成了 `"mcpServers"` | 改为 `"mcp"` |
| Kanban API 返回 401 | API Key 格式错误或过期 | 联系管理员重新生成 Key |
| Kanban 发布失败（平台不支持） | Kanban 尚未集成该平台的发布通道 | **自主启用替代路径（浏览器自动化或平台直接 API），并在 Kanban 任务中记录原因** |
| GBP 连接失败 | Service account 缺少 GBP 权限 | 需要 `roles/businesscommunications.admin` |
| GBP Location ID 找不到 | 用户不熟悉 GBP 后台 | 按 Procedure B Step 1 引导用户找 URL |
| 启动后自动发 Lark 消息索要 key | 正常行为 — KANBAN_AGENT_API_KEY 缺失 | 提供 API Key 后自动消失 |
