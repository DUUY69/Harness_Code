# Harness template pack

Minimal files from the **Harness Engineering** course. Copy into your repo root (adjust paths as needed).

| File | Copy to | Role |
|------|---------|------|
| `AGENTS.md` | `./AGENTS.md` | Entry router for agents |
| `CLAUDE.md` | `./CLAUDE.md` | Claude Code entry (points to AGENTS.md) |
| `feature_list.json` | `./docs/feature_list.json` | Scope + verification + state (WIP=1, pass-state gating) |
| `PROGRESS.md` | `./PROGRESS.md` | Session handoff |
| `DECISIONS.md` | `./DECISIONS.md` | Design rationale |
| `init.sh` | `./scripts/init.sh` or repo root | Session startup script |

## Quick setup

```bash
mkdir -p docs scripts
cp AGENTS.md CLAUDE.md PROGRESS.md DECISIONS.md ../
cp feature_list.json ../docs/
cp init.sh ../scripts/
chmod +x ../scripts/init.sh
```

Then add to `AGENTS.md`: `bash scripts/init.sh` under session startup.

## Principles

- **WIP=1** — one `active` feature at a time
- **Pass-state gating** — agent runs verification; harness sets `passing`
- **PROGRESS.md** — update every session end (clean handoff)

See course lectures L07–L08 for feature lists and L12 for exit checklist.
