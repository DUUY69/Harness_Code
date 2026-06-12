# CLAUDE.md

Claude Code reads this file from the repo root. Content mirrors `AGENTS.md`.

**Canonical harness entry:** see [AGENTS.md](./AGENTS.md) in this `templates/` folder — copy both to your repo root.

## Rules (summary)

- WIP=1 — one `active` feature in `docs/feature_list.json`
- Pass-state gating — you cannot set `passing`; run verification, harness updates state
- Read `PROGRESS.md` + `DECISIONS.md` at session start; update before session end
- Run `make check` before and after substantive changes

Full instructions: copy `AGENTS.md` to repo root and follow it.
