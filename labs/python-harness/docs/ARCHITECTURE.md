# ARCHITECTURE.md — Harness Lab (giỏ hàng)

## Stack

- Python 3.11+
- pytest (verification harness)
- Package: `src/harness_lab/`

## Layout

```
src/harness_lab/cart.py   # domain: Cart
tests/test_cart.py        # verification maps to feature_list.json
docs/                     # rules & feature list (repo = source of truth)
```

## Commands (fresh session)

```bash
pip install -e ".[dev]"
pytest -q
python scripts/harness_verify.py
```

Agent đọc file này + `AGENTS.md` + `CONSTRAINTS.md` trước khi code.
