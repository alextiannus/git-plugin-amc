#!/bin/bash
# ─────────────────────────────────────────────────────────────
# F&B Content Engine — Manual Update Script
# ─────────────────────────────────────────────────────────────
#
# PREFERRED METHOD: Use OpenClaw's built-in plugin update mechanism:
#   openclaw plugins update fb-content-engine
#
# OpenClaw will:
#   - Pull the latest from git
#   - Apply updates to all instances using this plugin
#   - Respect the update_policy defined in plugin.yaml
#     (weekly check, auto_apply: false → prompts owner before applying)
#
# USE THIS SCRIPT ONLY IF:
#   - You installed the plugin manually via git clone (not via openclaw plugins install)
#   - You need to force-update outside of OpenClaw's update cycle
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
      echo "PREFERRED: Use 'openclaw plugins update fb-content-engine' instead."
      exit 0 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
  shift
done

CURRENT_VERSION=$(grep '^version:' "$PLUGIN_DIR/plugin.yaml" | awk '{print $2}' | tr -d '"')

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  F&B Content Engine — Manual Update"
echo "  Current version: $CURRENT_VERSION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⚠️  Reminder: OpenClaw's plugin update mechanism is preferred."
echo "   Run: openclaw plugins update fb-content-engine"
echo ""

cd "$PLUGIN_DIR"

if [[ -n "$TARGET_VERSION" ]]; then
  echo "🔄 Fetching and checking out version: $TARGET_VERSION..."
  git fetch origin
  git checkout "$TARGET_VERSION"
else
  echo "🔄 Pulling latest from main branch..."
  git pull origin main
fi

NEW_VERSION=$(grep '^version:' plugin.yaml | awk '{print $2}' | tr -d '"')

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ Plugin files updated: $CURRENT_VERSION → $NEW_VERSION"
echo ""
echo "  Protected (NEVER touched by this script):"
echo "  ├── skills/localization/brand-voice.md"
echo "  ├── skills/compliance/allergen-gate.md"
echo "  └── skills/localization/bilingual-gate.md"
echo ""
echo "  ⚠️  Restart your OpenClaw instance to apply changes."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
