# AGENTS.md — Python Harness Lab (Nhóm OPS)

> Entry router. Đọc file này trước mọi session. ~50–150 dòng.

## Overview

- **Stack:** Python 3.11+, pytest
- **Task:** Giỏ hàng (`Cart` trong `src/harness_lab/cart.py`)
- **Harness:** `docs/feature_list.json` + pytest verification

## Quick start

```bash
cd labs/python-harness
pip install -e ".[dev]"
pytest -q
python scripts/harness_verify.py
```

## Session startup

1. Đọc `PROGRESS.md`, `DECISIONS.md`
2. Đọc `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`
3. Đọc `docs/feature_list.json` — **một** feature `active` (WIP=1)
4. `pytest -q` — baseline xanh trước khi sửa code

## Session exit

- [ ] `pytest -q` pass
- [ ] `PROGRESS.md` cập nhật
- [ ] **Không** tự sửa `state: passing` — chạy `python scripts/harness_verify.py`

## Hard constraints

1. WIP=1 — chỉ một feature `active`
2. Pass-state gating — harness quyết `passing`, không phải agent
3. Kiến thức trong repo (`docs/`), không chỉ chat

## Definition of done

Feature done khi lệnh `verification` trong `feature_list.json` exit 0 **và** harness đã promote state.

## Labs

| Lab | Doc |
|-----|-----|
| 1 Baseline vs minimal | `docs/LAB01-EXPERIMENT.md` |
| 2 Fresh session | `docs/LAB02-FRESH-SESSION.md` |
| 3 Pass-state gating | `docs/LAB03-PASS-STATE.md` |
