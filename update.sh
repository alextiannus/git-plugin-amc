#!/bin/bash
# ─────────────────────────────────────────────────────────────
# F&B Content Engine — Plugin Update Script
# ─────────────────────────────────────────────────────────────
#
# RECOMMENDED: Let the agent handle updates via Lark.
#   → Reply "更新插件" or "update plugin" to the Lark Bot
#   → Agent runs this script and confirms via Lark when done.
#
# ALSO WORKS: OpenClaw native command
#   openclaw plugins update fb-content-engine
#
# USE THIS SCRIPT DIRECTLY ONLY IF:
#   - You need to force-update from CLI outside normal flow
#   - OpenClaw native update is unavailable
#
# PROTECTED FILES (never touched by this script or git pull):
#   skills/localization/brand-voice.md     ← brand voice, written by Bootstrap
#   skills/compliance/allergen-gate.md     ← allergen table, written by Bootstrap
#   skills/localization/bilingual-gate.md  ← dish name map, written by Bootstrap
#
#   These files are in .gitignore — git pull cannot overwrite them.
#   Generic defaults live in the corresponding .template files.
#
# ─────────────────────────────────────────────────────────────

set -e

PLUGIN_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET_VERSION=""

while [[ "$#" -gt 0 ]]; do
  case $1 in
    --version) TARGET_VERSION="$2"; shift ;;
    --help)
      echo "Usage: ./update.sh [--version v0.5.0]"
      echo ""
      echo "  --version TAG   Pin to specific git tag (default: latest main)"
      echo ""
      echo "RECOMMENDED: Reply '更新插件' to the Lark Bot — the agent handles it."
      exit 0 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
  shift
done

CURRENT_VERSION=$(grep '^version:' "$PLUGIN_DIR/plugin.yaml" | awk '{print $2}' | tr -d '"')

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  F&B Content Engine — Plugin Update"
echo "  Current version: $CURRENT_VERSION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$PLUGIN_DIR"

# ── Pull latest ───────────────────────────────────────────────
# Brand-customized files are in .gitignore — git pull cannot touch them.
if [[ -n "$TARGET_VERSION" ]]; then
  echo "🔄 Fetching version: $TARGET_VERSION..."
  git fetch origin
  git checkout "$TARGET_VERSION"
else
  echo "🔄 Pulling latest from main..."
  git pull origin main
fi

NEW_VERSION=$(grep '^version:' plugin.yaml | awk '{print $2}' | tr -d '"')

# ── Reload OpenClaw ───────────────────────────────────────────
echo ""
echo "🔄 Reloading OpenClaw to apply updated skills..."
if command -v openclaw &>/dev/null; then
  openclaw reload && echo "✅ OpenClaw reloaded." || echo "⚠️  openclaw reload failed — restart manually."
else
  echo "⚠️  openclaw not found in PATH — restart the gateway manually."
fi

# ── Done ──────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ $CURRENT_VERSION → $NEW_VERSION"
echo ""
echo "  Updated (git-managed):"
echo "  ├── plugin.yaml, HOOK.md, SKILL.md"
echo "  ├── skills/core/, skills/compliance/*.md (generic)"
echo "  ├── skills/platforms/, skills/operations/"
echo "  └── bootstrap/onboarding-flow.md"
echo ""
echo "  Protected (untouched — in .gitignore):"
echo "  ├── skills/localization/brand-voice.md"
echo "  ├── skills/compliance/allergen-gate.md"
echo "  └── skills/localization/bilingual-gate.md"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Agent will send update confirmation to Lark."
echo ""
