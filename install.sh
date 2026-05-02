#!/bin/bash
# ─────────────────────────────────────────────────────────────
# F&B Content Engine — Installation Script
# Usage: ./install.sh --brand SLUG --lark-id OWNER_ID [options]
# ─────────────────────────────────────────────────────────────

set -e

PLUGIN_VERSION=$(grep '^version:' plugin.yaml | awk '{print $2}' | tr -d '"')
PLUGIN_DIR="$(cd "$(dirname "$0")" && pwd)"

# ── Defaults ─────────────────────────────────────────────────
BRAND_SLUG=""
OWNER_LARK_ID=""
INSTALL_DIR="$PLUGIN_DIR"
TRENDING_RADAR_URL="https://12eat-ai.sg.larksuite.com/docx/TPb8d2B7Yo16SXxdBDwljnJAg2e"
LARK_WORKSPACES_URL="https://12eat-ai.sg.larksuite.com/drive/folder/PbugfutjllCDM0dqMiIlN0orgZd"

# ── Parse Args ────────────────────────────────────────────────
while [[ "$#" -gt 0 ]]; do
  case $1 in
    --brand)           BRAND_SLUG="$2"; shift ;;
    --lark-id)         OWNER_LARK_ID="$2"; shift ;;
    --dir)             INSTALL_DIR="$2"; shift ;;
    --radar-url)       TRENDING_RADAR_URL="$2"; shift ;;
    --workspaces-url)  LARK_WORKSPACES_URL="$2"; shift ;;
    --help)
      echo "Usage: ./install.sh --brand SLUG --lark-id OWNER_LARK_ID [options]"
      echo ""
      echo "Required:"
      echo "  --brand SLUG          Brand slug (lowercase, no spaces, e.g. goldendragon)"
      echo "  --lark-id ID          Owner's Lark user ID (e.g. ou_xxxxxxxx)"
      echo ""
      echo "Optional:"
      echo "  --dir PATH            Installation directory (default: plugin directory)"
      echo "  --radar-url URL       Trending Radar Lark Doc URL"
      echo "  --workspaces-url URL  AI Workspaces folder URL"
      exit 0 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
  shift
done

# ── Validation ────────────────────────────────────────────────
if [[ -z "$BRAND_SLUG" ]]; then
  echo "❌ Error: --brand is required. Run ./install.sh --help for usage."
  exit 1
fi

if [[ -z "$OWNER_LARK_ID" ]]; then
  echo "❌ Error: --lark-id is required. Run ./install.sh --help for usage."
  exit 1
fi

if [[ ! "$BRAND_SLUG" =~ ^[a-z0-9]+$ ]]; then
  echo "❌ Error: Brand slug must be lowercase alphanumeric only (e.g. goldendragon, 12eat)"
  exit 1
fi

SKILL_GRAPH_DIR="$INSTALL_DIR/content-skill-graph-$BRAND_SLUG"
VAULT_DIR="$INSTALL_DIR/vault-$BRAND_SLUG"
SOUL_FILE="$INSTALL_DIR/SOUL_$BRAND_SLUG.md"

# ── Pre-flight check ─────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  F&B Content Engine v$PLUGIN_VERSION"
echo "  Installing brand: $BRAND_SLUG"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [[ -d "$SKILL_GRAPH_DIR" ]]; then
  echo "⚠️  Skill graph already exists: $SKILL_GRAPH_DIR"
  read -p "   Overwrite? (y/N): " confirm
  [[ "$confirm" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 0; }
fi

# ── Step 1 · Copy skill graph from plugin ────────────────────
echo "📁 [1/4] Creating skill graph: content-skill-graph-$BRAND_SLUG/"
cp -r "$PLUGIN_DIR/skills/" "$SKILL_GRAPH_DIR/"
echo "    ✓ 21 skill files copied"

# ── Step 2 · Copy vault templates ────────────────────────────
echo "📁 [2/4] Creating vault: vault-$BRAND_SLUG/"
cp -r "$PLUGIN_DIR/vault-templates/" "$VAULT_DIR/"

# Replace {{BRAND_SLUG}} in vault-index.md
sed -i.bak "s/{{BRAND_SLUG}}/$BRAND_SLUG/g" "$VAULT_DIR/vault-index.md"
sed -i.bak "s|{{TRENDING_RADAR_URL}}|$TRENDING_RADAR_URL|g" "$VAULT_DIR/vault-index.md"
sed -i.bak "s/{{OWNER_LARK_ID}}/$OWNER_LARK_ID/g" "$VAULT_DIR/vault-index.md"
find "$VAULT_DIR" -name "*.bak" -delete
echo "    ✓ 9 vault templates initialized"

# ── Step 3 · Generate thin SOUL.md ───────────────────────────
echo "📄 [3/4] Generating SOUL_$BRAND_SLUG.md"
cp "$PLUGIN_DIR/SOUL.md.template" "$SOUL_FILE"

# Apply known values
sed -i.bak "s/{{BRAND_SLUG}}/$BRAND_SLUG/g" "$SOUL_FILE"
sed -i.bak "s/{{OWNER_LARK_ID}}/$OWNER_LARK_ID/g" "$SOUL_FILE"
sed -i.bak "s|{{TRENDING_RADAR_URL}}|$TRENDING_RADAR_URL|g" "$SOUL_FILE"
sed -i.bak "s|{{LARK_WORKSPACES_URL}}|$LARK_WORKSPACES_URL|g" "$SOUL_FILE"
sed -i.bak "s/{{PLUGIN_VERSION}}/$PLUGIN_VERSION/g" "$SOUL_FILE"
find "$INSTALL_DIR" -name "SOUL_*.bak" -delete

echo "    ✓ SOUL file created (remaining placeholders filled by Bootstrap Mode)"

# ── Step 4 · Write version lock file ─────────────────────────
echo "🔒 [4/4] Writing version lock"
cat > "$INSTALL_DIR/.fb-engine-lock-$BRAND_SLUG.yaml" << EOF
brand: $BRAND_SLUG
plugin_version: $PLUGIN_VERSION
installed_at: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
plugin_dir: $PLUGIN_DIR
skill_graph: $SKILL_GRAPH_DIR
vault: $VAULT_DIR
soul: $SOUL_FILE
EOF
echo "    ✓ Lock file written"

# ── Done ──────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ Installation complete!"
echo ""
echo "  Next steps:"
echo "  1. Load $SOUL_FILE into your OpenClaw instance"
echo "  2. Connect the agent to the brand owner's Lark"
echo "  3. The agent will run Bootstrap Mode automatically"
echo "     and conduct the onboarding interview with the owner"
echo ""
echo "  To update this plugin later:"
echo "  ./update.sh --brand $BRAND_SLUG"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
