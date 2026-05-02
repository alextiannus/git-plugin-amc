# F&B Content Engine
### OpenClaw Plugin · Git Starter Kit · v0.4.0

A complete social media operations plugin for F&B brands.  
Manages content from idea to publish across 7 platforms, with bilingual support,  
compliance gates, owner escalation, and automated reporting.

---

## 快速开始 / Quick Start

### 1. 下载 Plugin（一次性）

```bash
git clone https://github.com/[your-org]/fb-content-engine
cd fb-content-engine
```

### 2. 安装新品牌（每个品牌执行一次）

```bash
./install.sh --brand goldendragon --lark-id ou_xxxxxxxx
```

完成后输出：
```
✅ Installation complete!
Next steps:
  1. Load SOUL_goldendragon.md into your OpenClaw instance
  2. Connect the agent to the brand owner's Lark
  3. The agent will run Bootstrap Mode automatically
```

### 3. 加载进 OpenClaw

将 `SOUL_goldendragon.md` 作为配置文件加载进新的 OpenClaw 实例。  
Agent 启动后自动检测 `{{PLACEHOLDER}}`，进入 Bootstrap Mode，  
主动联系品牌主完成访谈，无需人工干预。

---

## 自动更新 / Auto Update

```bash
# 更新某个品牌的 Plugin（保留品牌定制文件）
./update.sh --brand goldendragon

# 预览更新内容，不实际执行
./update.sh --brand goldendragon --dry-run

# 锁定到特定版本
./update.sh --brand goldendragon --version v0.5.0
```

**更新策略：**
- ✅ 自动更新：通用技能文件、合规规则、平台策略、cron 计划
- 🔒 永不覆盖：`brand-voice.md`、`allergen-gate.md`、`bilingual-gate.md`（品牌定制内容）
- 🔒 永不覆盖：`vault-{brand}/` 下的所有运营记录

---

## Plugin 结构

```
fb-content-engine/
├── plugin.yaml              ← Plugin 清单（版本、技能列表、配置 Schema）
├── SOUL.md.template         ← 品牌专属薄层（只需填 7 个参数）
├── install.sh               ← 新品牌安装脚本
├── update.sh                ← Plugin 更新脚本
│
├── skills/                  ← 21 个技能模块
│   ├── core/                   repurpose chain, hooks, scheduling, content types
│   ├── compliance/             FDA/FTC, allergen gate, platform policies, image rights
│   ├── localization/           bilingual gate, brand voice
│   ├── platforms/              instagram, tiktok, rednote, facebook, youtube, googlemap, x
│   └── operations/             owner approval, vault manager, cron jobs, reporting
│
├── bootstrap/               ← 首次启动：访谈脚本 + SOUL.md 填写逻辑
│   └── onboarding-flow.md
│
└── vault-templates/         ← 运营模板（安装时复制到 vault-{brand}/）
    ├── vault-index.md
    ├── brand/
    ├── media/
    ├── post/
    └── report/
```

---

## 品牌定制文件（安装后修改）

安装完成后，以下 3 个文件需要品牌定制（Bootstrap Mode 会通过访谈自动填写）：

| 文件 | 内容 | 如何填写 |
|---|---|---|
| `skills/localization/brand-voice.md` | 品牌个性、词汇表、禁用语 | Bootstrap Mode 访谈 Q12/Q13 |
| `skills/compliance/allergen-gate.md` | 菜品过敏原对照表 | Bootstrap Mode 访谈 Q14 |
| `skills/localization/bilingual-gate.md` | 中英文菜单词典 | Bootstrap Mode 访谈 Q14 |

其余 18 个技能文件为通用内容，无需修改。

---

## 版本历史

| 版本 | 日期 | 变更 |
|---|---|---|
| v0.4.0 | 2026-05 | 初始发布，7平台支持，Bootstrap Mode，3级升级协议 |

---

## 路线图

- [ ] v0.5 · OpenClaw 官方 Plugin 格式打包，提交 awesome-openclaw-agents
- [ ] v0.5 · Lark Drive 托管技能文件（零本地安装）
- [ ] v0.6 · 多品牌 Dashboard（Mission Control 集成）
- [ ] v0.6 · 自动更新推送（GitHub Webhook → Agent 自动 pull）

---

## License

MIT · Built by 12eat AI Lab
