#!/bin/bash
# ─────────────────────────────────────────────────────────────
# F&B Content Engine — Update Script
# Usage: ./update.sh --brand SLUG [--version v0.5.0]
#
# Update strategy:
#   Plugin files (skills/, tools/, bootstrap/) → always overwrite from git
#   Brand files (brand-voice, compliance, bilingual) → NEVER overwrite
#   Vault files (post records, reports) → NEVER overwrite
# ─────────────────────────────────────────────────────────────

set -e

PLUGIN_DIR="$(cd "$(dirname "$0")" && pwd)"
BRAND_SLUG=""
TARGET_VERSION=""
DRY_RUN=false

# ── Parse Args ────────────────────────────────────────────────
while [[ "$#" -gt 0 ]]; do
  case $1 in
    --brand)    BRAND_SLUG="$2"; shift ;;
    --version)  TARGET_VERSION="$2"; shift ;;
    --dry-run)  DRY_RUN=true ;;
    --help)
      echo "Usage: ./update.sh --brand SLUG [--version v0.5.0] [--dry-run]"
      echo ""
      echo "  --brand SLUG       Brand slug to update"
      echo "  --version TAG      Pin to specific git tag (default: latest stable)"
      echo "  --dry-run          Preview changes without applying"
      exit 0 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
  shift
done

if [[ -z "$BRAND_SLUG" ]]; then
  echo "❌ Error: --brand is required."
  exit 1
fi

LOCK_FILE="$PLUGIN_DIR/.fb-engine-lock-$BRAND_SLUG.yaml"
SKILL_GRAPH_DIR="$PLUGIN_DIR/content-skill-graph-$BRAND_SLUG"

if [[ ! -f "$LOCK_FILE" ]]; then
  echo "❌ No installation found for brand: $BRAND_SLUG"
  echo "   Run ./install.sh --brand $BRAND_SLUG first."
  exit 1
fi

CURRENT_VERSION=$(grep 'plugin_version:' "$LOCK_FILE" | awk '{print $2}')

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  F&B Content Engine — Update"
echo "  Brand: $BRAND_SLUG"
echo "  Current version: $CURRENT_VERSION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ── Step 1 · Fetch latest from git ───────────────────────────
echo ""
echo "🔄 [1/4] Fetching latest plugin from git..."
cd "$PLUGIN_DIR"
git fetch origin

if [[ -n "$TARGET_VERSION" ]]; then
  echo "    Pinning to: $TARGET_VERSION"
  git checkout "$TARGET_VERSION" -- skills/ vault-templates/ bootstrap/ plugin.yaml
else
  git pull origin main
fi

NEW_VERSION=$(grep '^version:' plugin.yaml | awk '{print $2}' | tr -d '"')

if [[ "$CURRENT_VERSION" == "$NEW_VERSION" ]]; then
  echo "    ✓ Already on latest version ($CURRENT_VERSION). Nothing to update."
  exit 0
fi

echo "    ✓ New version available: $CURRENT_VERSION → $NEW_VERSION"

# ── Step 2 · Identify what changed ───────────────────────────
echo ""
echo "🔍 [2/4] Identifying changed files..."

# Files that are SAFE to update (generic skills, no brand customization)
SAFE_TO_UPDATE=(
  "skills/core/"
  "skills/compliance/fda-ftc-rules.md"
  "skills/compliance/platform-policies.md"
  "skills/compliance/image-rights.md"
  "skills/platforms/"
  "skills/operations/cron-jobs.md"
  "skills/operations/reporting.md"
  "skills/operations/owner-approval.md"
  "skills/operations/vault-manager.md"
  "bootstrap/"
)

# Files that are PROTECTED (contain brand customization — never overwrite)
PROTECTED=(
  "skills/localization/brand-voice.md"
  "skills/compliance/allergen-gate.md"
  "skills/localization/bilingual-gate.md"
)

if [[ "$DRY_RUN" == true ]]; then
  echo ""
  echo "  [DRY RUN] Files that WOULD be updated:"
  for f in "${SAFE_TO_UPDATE[@]}"; do
    echo "    ✓ $SKILL_GRAPH_DIR/$f"
  done
  echo ""
  echo "  [DRY RUN] Files that are PROTECTED (will NOT be touched):"
  for f in "${PROTECTED[@]}"; do
    echo "    🔒 $SKILL_GRAPH_DIR/$f"
  done
  echo ""
  echo "  Run without --dry-run to apply."
  exit 0
fi

# ── Step 3 · Apply safe updates to skill graph ───────────────
echo ""
echo "📁 [3/4] Applying updates to content-skill-graph-$BRAND_SLUG/..."

for item in "${SAFE_TO_UPDATE[@]}"; do
  src="$PLUGIN_DIR/skills/${item#skills/}"
  dst="$SKILL_GRAPH_DIR/${item#skills/}"
  if [[ -d "$src" ]]; then
    cp -r "$src" "$(dirname "$dst")/"
    echo "    ✓ Updated: $item"
  elif [[ -f "$src" ]]; then
    cp "$src" "$dst"
    echo "    ✓ Updated: $item"
  fi
done

for f in "${PROTECTED[@]}"; do
  echo "    🔒 Protected (skipped): $f"
done

# ── Step 4 · Update lock file ─────────────────────────────────
echo ""
echo "🔒 [4/4] Updating lock file..."
sed -i.bak "s/plugin_version: .*/plugin_version: $NEW_VERSION/" "$LOCK_FILE"
echo "    updated_at: $(date -u +"%Y-%m-%dT%H:%M:%SZ")" >> "$LOCK_FILE"
find "$PLUGIN_DIR" -name "*.bak" -delete

# ── Done ──────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ Update complete: $CURRENT_VERSION → $NEW_VERSION"
echo ""
echo "  Protected files (brand-customized, NOT updated):"
echo "  ├── brand-voice.md     (your brand personality)"
echo "  ├── allergen-gate.md   (your dish allergen table)"
echo "  └── bilingual-gate.md  (your dish name dictionary)"
echo ""
echo "  ⚠️  Restart your OpenClaw instance to apply changes."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
