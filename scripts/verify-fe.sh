#!/usr/bin/env bash
# Verify unified frontend static assets (CI + local).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../frontend" && pwd)"
cd "$ROOT"

echo "→ Checking required files..."
required=(
  index.html
  styles.css
  main.js
  assets/hero-cover.jpg
  assets/logo.png
  assets/brand-mark.png
  article/index.html
  article/styles.css
  article/main.js
  templates/AGENTS.md
  templates/CLAUDE.md
  templates/feature_list.json
  templates/PROGRESS.md
  templates/DECISIONS.md
  templates/init.sh
  templates/README.md
  sosbike/index.html
  sosbike/styles.css
  sosbike/main.js
  sosbike/api-config.prod.js
  sosbike/assets/hero-cover.jpg
  sosbike/assets/logo.png
)
for f in "${required[@]}"; do
  if [[ ! -f "$f" ]]; then
    echo "Missing required file: $f"
    exit 1
  fi
done

echo "→ HTML validation..."
npx --yes html-validate@9.4.0 \
  --config ../.github/html-validate.json \
  index.html article/index.html sosbike/index.html

echo "→ Internal link check..."
node ../scripts/check-internal-links.mjs

echo "✓ FE verification passed"
