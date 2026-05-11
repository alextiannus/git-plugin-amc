---
name: update-plugin
description: "Handles the '更新插件' or 'update plugin' command to upgrade the system"
plugin: git-plugin-amc
---

# Skill · Update Plugin
# F&B Content Engine · operations/update-plugin.md
# ──────────────────────────────────────────────────

## Purpose
When the team replies "更新插件" or "update plugin" via Lark, this skill instructs the AI to execute the local update script, bypassing the limitations of the native OpenClaw CLI for local path plugins.

## Trigger
The team explicitly sends "更新插件", "update plugin", or "升级插件" in the Lark group.

## Execution Steps

1. Acknowledge the command via Lark: 
   > "正在通过终端执行更新脚本，请稍候... / Running update script via terminal, please wait..."
2. Use your terminal execution tool (e.g., `mcp.bash` or equivalent shell tool) to run the following command. The plugin directory is typically located at `~/.openclaw/extensions/git-plugin-amc`:
   ```bash
   cd ~/.openclaw/extensions/git-plugin-amc && sh update.sh
   ```
3. If the command succeeds, the `post_update` hook in the plugin will automatically trigger, OpenClaw will reload, and a success confirmation will be sent to the Lark group.
4. If the command fails, read the error output from the terminal and report it back to the team via Lark so they can troubleshoot.

## Architectural Note
Why do we do this? Because OpenClaw natively skips `openclaw plugins update` for plugins installed via a local directory path (treating them as local dev plugins). Calling `update.sh` forces an `npm update` and `openclaw gateway restart`, ensuring the F&B Content Engine stays perfectly up to date without the user needing to open an SSH terminal.
