#!/usr/bin/env bash
# bump-version.sh — Bump version across all manifest files
# Usage: ./bump-version.sh 0.5.6

set -euo pipefail

NEW="${1:-}"
if [[ -z "$NEW" ]]; then
  echo "Usage: ./bump-version.sh <new-version>  (e.g. 0.5.6)"
  exit 1
fi

# Validate semver format
if ! [[ "$NEW" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Error: version must be semver (e.g. 0.5.6)"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

OLD=$(node -p "require('./package.json').version")
echo "Bumping $OLD → $NEW"

# ── JSON files (package.json, openclaw.plugin.json) ──────────
sed -i.bak "s/\"version\": \"${OLD}\"/\"version\": \"${NEW}\"/" \
  package.json openclaw.plugin.json

# ── YAML (plugin.yaml) ───────────────────────────────────────
sed -i.bak "s/^version: \"${OLD}\"/version: \"${NEW}\"/" \
  plugin.yaml

# ── Markdown / text files ────────────────────────────────────
for f in HOOK.md README.md SKILL.md; do
  sed -i.bak "s/v${OLD}/v${NEW}/g" "$f"
done

# ── Clean up .bak files created by sed -i on macOS ───────────
find . -maxdepth 1 -name "*.bak" -delete

echo ""
echo "✅ Version bumped to $NEW in:"
echo "   package.json · openclaw.plugin.json · plugin.yaml"
echo "   HOOK.md · README.md · SKILL.md"
echo ""
echo "Next steps:"
echo "  git add -A && git commit -m \"chore: bump version to $NEW\""
echo "  git tag v$NEW && git push origin main --tags"
