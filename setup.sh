#!/bin/bash
# ─────────────────────────────────────────────────────────────
# F&B Content Engine — Setup Script
# Injects the plugin config block into SOUL.md and reloads OpenClaw.
# Run this ONCE per OpenClaw instance after git clone.
#
# Usage:
#   ./setup.sh                         # auto-detect SOUL.md location
#   ./setup.sh --soul /path/to/SOUL.md  # specify SOUL.md manually
# ─────────────────────────────────────────────────────────────

set -e

PLUGIN_DIR="$(cd "$(dirname "$0")" && pwd)"
SOUL_PATH=""

while [[ "$#" -gt 0 ]]; do
  case $1 in
    --soul) SOUL_PATH="$2"; shift ;;
    --help)
      echo "Usage: ./setup.sh [--soul /path/to/SOUL.md]"
      exit 0 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
  shift
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  F&B Content Engine — Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ── Step 1: Locate SOUL.md ────────────────────────────────────
if [[ -z "$SOUL_PATH" ]]; then
  # Search common locations
  for candidate in \
    "$PWD/SOUL.md" \
    "$HOME/.openclaw/SOUL.md" \
    "$HOME/.openclaw/agents/default/SOUL.md" \
    "/etc/openclaw/SOUL.md"
  do
    if [[ -f "$candidate" ]]; then
      SOUL_PATH="$candidate"
      break
    fi
  done
fi

if [[ -z "$SOUL_PATH" ]]; then
  # No SOUL.md found — create one at the standard location
  SOUL_PATH="$HOME/.openclaw/SOUL.md"
  echo "⚠️  No SOUL.md found. Creating one at: $SOUL_PATH"
  touch "$SOUL_PATH"
fi

echo "📄 SOUL.md: $SOUL_PATH"
echo ""

# ── Step 2: Check if plugin block already exists ──────────────
if grep -q "PLUGIN · fb-content-engine" "$SOUL_PATH" 2>/dev/null; then
  echo "✅ Plugin block already present in SOUL.md. Skipping injection."
  echo "   (Run with --force to re-inject: not yet implemented)"
else
  echo "🔧 Injecting F&B Content Engine config block into SOUL.md..."
  echo ""

  # Extract just the plugin block from SOUL.md.template
  # (everything from "## STARTUP BEHAVIOR" to end of file, excluding header comments)
  TEMPLATE="$PLUGIN_DIR/SOUL.md.template"

  if [[ ! -f "$TEMPLATE" ]]; then
    echo "❌ SOUL.md.template not found at: $TEMPLATE"
    exit 1
  fi

  # Append a separator + the full template block (minus the comment header)
  echo "" >> "$SOUL_PATH"
  echo "# ── F&B Content Engine (injected by setup.sh) ──────────────────" >> "$SOUL_PATH"
  # Skip the comment header (lines starting with #) at top of template
  sed '/^# F&B Content Engine/,/^# ─────.*$/d' "$TEMPLATE" >> "$SOUL_PATH"

  echo "✅ Plugin block injected into SOUL.md."
fi

echo ""

# ── Step 3: Reload OpenClaw ───────────────────────────────────
echo "🔄 Reloading OpenClaw gateway..."
if command -v openclaw &>/dev/null; then
  openclaw reload 2>&1 && echo "✅ OpenClaw reloaded." || {
    echo "⚠️  openclaw reload failed. Trying gateway restart..."
    openclaw gateway restart 2>&1 || echo "⚠️  Gateway restart also failed. Please restart manually."
  }
else
  echo "⚠️  openclaw not found in PATH. Please restart the gateway manually."
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ Setup complete!"
echo ""
echo "  Next: Open Lark and wait for the AI Content"
echo "  Manager to send you the first message."
echo ""
echo "  If no message arrives in 60 seconds, send"
echo "  any message to the Lark Bot to trigger it."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
