# F&B Content Engine
### OpenClaw Plugin · v0.4.1

A complete social media operations plugin for F&B brands.  
Manages content from idea to publish across 7 platforms, with bilingual support,  
compliance gates, owner escalation, and automated reporting.

---

## 安装流程 / Installation (6 Steps)

### Step 1 · 创建 OpenClaw 实例 + 配置 Lark Bot

在 OpenClaw 里新建一个 Agent 实例，配置 Lark 机器人作为消息渠道。

> Create a new OpenClaw instance and configure the Lark bot as the messaging channel.

---

### Step 2 · 安装 Plugin（一次性 per 实例）

```bash
# 克隆仓库到 OpenClaw extensions 目录
git clone https://github.com/alextiannus/git-plugin-amc \
  ~/.openclaw/extensions/git-plugin-amc

# 启用插件
openclaw plugins enable git-plugin-amc

# 验证安装
openclaw plugins list          # 应显示 git-plugin-amc (fb-content-engine v0.4.6)
openclaw skills list           # 应显示 22 个技能模块
```

> **注意**：`openclaw plugins install git:...` 格式在部分版本不支持，
> 请使用上方的手动 `git clone` 方式。仓库必须为 Public。

---

### Step 3 · 配置 SOUL.md → 启动网关

```bash
# 复制模板（每个品牌一次）
cp ~/.openclaw/extensions/git-plugin-amc/SOUL.md.template ./SOUL.md

# 如果你的 OpenClaw 实例已有 SOUL.md（有其他配置），手动合并：
# 将 SOUL.md.template 中的 "PLUGIN · fb-content-engine" 整块追加到你的 SOUL.md 末尾

# 重载配置（Lark Bot 正在运行时）
openclaw reload

# 或重启网关（冷启动）
openclaw gateway stop
openclaw gateway start
```

Agent 启动后读取 SOUL.md，检测到 `{{PLACEHOLDER}}`，自动进入 Bootstrap Mode，等待第一条 Lark 消息。

> **注意**：OpenClaw 没有 `openclaw start --soul` 命令。启动命令是 `openclaw gateway start`（或 `openclaw reload` 热重载）。

> The agent reads SOUL.md on startup. If any `{{PLACEHOLDER}}` is found,  
> it enters Bootstrap Mode and waits for the first Lark message to begin the interview.

---

### Step 4 · Bootstrap Mode 完成配置

Agent 通过 Lark 向品牌主提问（约 15 个问题，30 分钟），自动完成：

- 填写所有 `{{PLACEHOLDER}}` → 保存 `SOUL_{brand}.md`
- 更新品牌定制文件（brand-voice、allergen-gate、bilingual-gate）
- 调用 `mcp.lark.drive` 在 Lark 云盘创建品牌专属 vault 文件夹
- 上传 vault-templates/ 到 Lark Drive vault

> The agent self-configures via conversation. No human needs to edit any files.

---

### Step 5 · 正式开始运营

配置完成后 Agent 发送确认消息给品牌主，立即按 cron-jobs.md 日程开始运营。  
第一批内容（3条）进入 Tier-1 审批队列，等待品牌主在 Lark 确认后发布。

> Setup complete. Agent begins the daily automation schedule immediately.

---

### Step 6 · 自动更新

OpenClaw 每周检查 Plugin 版本，有更新时通知品牌主确认后应用：

```bash
# OpenClaw 原生命令（推荐）
openclaw plugins update fb-content-engine

# 手动 git pull（备用，仅在 OpenClaw 管理外使用）
./update.sh
./update.sh --version v0.5.0   # 锁定特定版本
```

**更新策略：**
- ✅ 自动更新：21 个通用技能文件、合规规则、平台策略、cron 计划
- 🔒 永不覆盖：`brand-voice.md`、`allergen-gate.md`、`bilingual-gate.md`（品牌定制内容）
- 🔒 永不覆盖：Lark Drive vault 里的所有运营记录

---

## Plugin 结构

```
fb-content-engine/
├── plugin.yaml              ← Plugin 清单（版本、技能列表、更新策略）
├── SOUL.md.template         ← 品牌配置薄层（复制后填写 8 个参数即可）
├── update.sh                ← 手动更新脚本（备用；OpenClaw 原生更新优先）
│
├── skills/                  ← 21 个技能模块（OpenClaw plugin install 后自动就位）
│   ├── core/                   repurpose-chain, hook-engine, scheduling, content-types
│   ├── compliance/             fda-ftc-rules, allergen-gate*, platform-policies, image-rights
│   ├── localization/           brand-voice*, bilingual-gate*
│   ├── platforms/              instagram, tiktok, rednote, facebook, youtube, googlemap, x
│   └── operations/             owner-approval, vault-manager, cron-jobs, reporting
│                            (* = brand-customized by Bootstrap Mode, never auto-updated)
│
├── bootstrap/               ← Bootstrap Mode：15问访谈脚本 + 配置逻辑
│   └── onboarding-flow.md
│
└── vault-templates/         ← 运营模板（Bootstrap Mode 上传到 Lark Drive vault）
    ├── vault-index.md
    ├── brand/               ownerreview.md, owner-profile.md
    ├── media/               media-index.md
    ├── post/                postschedule.md, YYYYMMDD-post.md
    └── report/              report-rules.md, weekly-template.md, monthly-template.md
```

---

## 品牌定制文件

Bootstrap Mode 访谈结束后，3 个文件会被品牌信息自动填写：

| 文件 | 内容 | 填写来源 |
|---|---|---|
| `skills/localization/brand-voice.md` | 品牌个性、词汇表、禁用语 | 访谈 Q9/Q10 |
| `skills/compliance/allergen-gate.md` | 菜品过敏原对照表 | 访谈 Q12 |
| `skills/localization/bilingual-gate.md` | 中英文菜单词典 | 访谈 Q11 |

其余 18 个技能文件为通用内容，Plugin 更新时自动覆盖。

---

## 版本历史

| 版本 | 日期 | 变更 |
|---|---|---|
| v0.4.1 | 2026-05 | 架构重构：OpenClaw 原生 plugin install，删除 install.sh，Lark Drive vault 自动创建 |
| v0.4.0 | 2026-05 | 初始发布，7平台支持，Bootstrap Mode，3级升级协议 |

---

## 路线图

**v0.5 · 多品牌规模化**
- [ ] Mission Control 集成（`abhi1693/openclaw-mission-control`）
  — 一台服务器统一管理所有品牌 Agent 实例
  — Dashboard 创建/启停实例，无需 SSH + CLI
  — 统一监控所有品牌的 cron 状态、发布日志、异常告警
  — 一键向全部实例推送 plugin 更新
- [ ] VPS 部署指南（systemd / Docker，保障 24/7 稳定运行）
- [ ] 提交 awesome-openclaw-agents 官方目录
- [ ] ClawHub 注册（`openclaw plugins install clawhub:fb-content-engine`）

**v0.6 · 自动化升级**
- [ ] GitHub Webhook → plugin 发版后自动通知所有实例更新
- [ ] 多品牌跨平台数据聚合报告（Mission Control 层）

---

## License

MIT · Built by 12eat AI Lab
