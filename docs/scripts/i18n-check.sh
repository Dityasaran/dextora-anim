#!/bin/bash
# i18n sync checker
# Detects missing translations and one-sided page changes.

set -euo pipefail

DOCS_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PAGES_DIR="$DOCS_DIR/src/pages"
EN_DIR="$PAGES_DIR"
JA_DIR="$PAGES_DIR/ja"

errors=0

# ── 1. Check for missing counterpart files ──

# Collect English page files (exclude ja/ directory)
en_files=()
while IFS= read -r f; do
  rel="${f#"$EN_DIR/"}"
  en_files+=("$rel")
done < <(find "$EN_DIR" -maxdepth 1 -type f \( -name '*.astro' -o -name '*.mdx' \) | sort)

while IFS= read -r f; do
  rel="${f#"$EN_DIR/docs/"}"
  en_files+=("docs/$rel")
done < <(find "$EN_DIR/docs" -type f \( -name '*.astro' -o -name '*.mdx' \) 2>/dev/null | sort)

# Check each English file has a Japanese counterpart
for rel in "${en_files[@]}"; do
  if [ ! -f "$JA_DIR/$rel" ]; then
    echo "❌ Missing Japanese translation: ja/$rel"
    errors=$((errors + 1))
  fi
done

# Check each Japanese file has an English counterpart
if [ -d "$JA_DIR" ]; then
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    rel="${f#"$JA_DIR/"}"
    if [ ! -f "$EN_DIR/$rel" ]; then
      echo "❌ Japanese page has no English counterpart: ja/$rel"
      errors=$((errors + 1))
    fi
  done < <(find "$JA_DIR" -type f \( -name '*.astro' -o -name '*.mdx' \) 2>/dev/null | sort)
fi

# ── 2. Check git staged/unstaged changes for one-sided edits ──

if git -C "$DOCS_DIR" rev-parse --git-dir > /dev/null 2>&1; then
  # Get changed files (staged + unstaged) relative to docs/src/pages/
  changed=$(git -C "$DOCS_DIR" diff --name-only HEAD -- "$PAGES_DIR" 2>/dev/null || true)
  staged=$(git -C "$DOCS_DIR" diff --cached --name-only -- "$PAGES_DIR" 2>/dev/null || true)
  all_changed=$(echo -e "$changed\n$staged" | sort -u | grep -v '^$' || true)

  if [ -n "$all_changed" ]; then
    en_changed=false
    ja_changed=false

    while IFS= read -r f; do
      case "$f" in
        *src/pages/ja/*) ja_changed=true ;;
        *src/pages/*) en_changed=true ;;
      esac
    done <<< "$all_changed"

    if [ "$en_changed" = true ] && [ "$ja_changed" = false ]; then
      echo ""
      echo "⚠️  English pages were modified but Japanese pages were not."
      echo "   Please update the corresponding files in src/pages/ja/ as well."
      echo ""
      echo "   Changed English files:"
      echo "$all_changed" | grep -v '/ja/' | sed 's/^/     /'
      errors=$((errors + 1))
    elif [ "$ja_changed" = true ] && [ "$en_changed" = false ]; then
      echo ""
      echo "⚠️  Japanese pages were modified but English pages were not."
      echo "   Please update the corresponding files in src/pages/ as well."
      echo ""
      echo "   Changed Japanese files:"
      echo "$all_changed" | grep '/ja/' | sed 's/^/     /'
      errors=$((errors + 1))
    fi
  fi
fi

# ── Result ──

if [ "$errors" -eq 0 ]; then
  echo "✅ i18n sync check passed. All pages have translations."
else
  echo ""
  echo "Found $errors i18n issue(s)."
  exit 1
fi
