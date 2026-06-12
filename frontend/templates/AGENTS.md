# AGENTS.md

> Entry router for AI coding agents. Keep this file short (50–200 lines).
> Topic details live in `docs/` — load on demand, not all at once.

## Project overview

<!-- 1–2 sentences: stack, purpose, repo layout -->

- **Stack:**
- **Purpose:**

## Quick start

```bash
make setup    # install dependencies (or: npm install / pip install -e .)
make dev      # run dev server
make test     # run test suite
make check    # lint + typecheck + test (full verification)
```

If `Makefile` is missing, document equivalent commands here.

## Session startup (every session)

1. Read `PROGRESS.md` and `DECISIONS.md`
2. Read `docs/feature_list.json` — find the single `active` feature (WIP=1)
3. Run `make check` (or `make test`) to confirm baseline is green
4. Only then start implementation

## Session exit (required before "done")

- [ ] `make build` passes
- [ ] `make test` passes (all tests, including pre-existing)
- [ ] `PROGRESS.md` updated
- [ ] No debug code (`console.log`, `debugger`, stray `TODO`)
- [ ] Feature state updated only via harness verification (pass-state gating)

## Hard constraints (non-negotiable)

<!-- Max ~15 rules. Critical rules at TOP of this list (lost-in-the-middle). -->

1. Work on **one feature at a time** (WIP=1). Finish verification before starting the next.
2. **Do not** mark a feature `passing` yourself — submit verification; harness decides.
3. **Do not** refactor unrelated code until the active feature passes E2E verification.
4. All project knowledge agents need must live **in this repo** (not Slack/Confluence only).

## Definition of done

A feature is done only when:

1. Its `verification` command in `docs/feature_list.json` exits 0
2. Harness updates state from `active` → `passing` (pass-state gating)
3. `PROGRESS.md` records evidence (commit hash, test output summary)

"Code looks fine" is **not** done.

## Topic docs (read when relevant)

| Doc | When to read |
|-----|----------------|
| `docs/feature_list.json` | Always — scope & verification |
| `docs/api-patterns.md` | Adding/changing API endpoints |
| `docs/testing-standards.md` | Writing or reviewing tests |

## Architecture (one paragraph + link)

<!-- Brief pointer; details in docs/ or module ARCHITECTURE.md -->

See `docs/` or per-module `ARCHITECTURE.md` next to code.
