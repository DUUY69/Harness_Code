#!/usr/bin/env bash
# Session initialization — run at start of every agent session
set -euo pipefail

echo "== Harness init =="

if [[ -f PROGRESS.md ]]; then
  echo "→ Read PROGRESS.md for handoff state"
else
  echo "⚠ PROGRESS.md missing — create from templates/PROGRESS.md"
fi

if [[ -f DECISIONS.md ]]; then
  echo "→ Read DECISIONS.md for design context"
fi

if [[ -f docs/feature_list.json ]]; then
  echo "→ Active features:"
  grep -E '"state": "active"' docs/feature_list.json || echo "  (none active — pick next not_started)"
else
  echo "⚠ docs/feature_list.json missing"
fi

if command -v make >/dev/null 2>&1 && [[ -f Makefile ]]; then
  echo "→ Running make check (baseline)..."
  make check
else
  echo "→ Skip make check (no Makefile or make)"
fi

echo "== Init complete =="
