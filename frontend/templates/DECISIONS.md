# DECISIONS.md

Design rationale log. Prevents re-deciding the same choices in a new session.

## Format

```markdown
### YYYY-MM-DD — Short title
- **Decision:**
- **Why:**
- **Alternatives rejected:**
- **Revisit when:**
```

---

### Example — 2026-06-09 — Use JSON feature list

- **Decision:** Store features in `docs/feature_list.json` with behavior + verification + state
- **Why:** Pass-state gating requires machine-readable state; markdown tables are harder to parse
- **Alternatives rejected:** Free-form PROGRESS notes only (high rebuild cost)
- **Revisit when:** Team adopts a harness tool that owns state in DB

---

<!-- Add new decisions below, newest first -->
