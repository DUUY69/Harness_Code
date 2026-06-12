# Python Harness Labs — Nhóm OPS

Ba bài Lab (Project) theo khóa Harness Engineering — **Python + pytest**.

| Lab | File hướng dẫn | Nội dung |
|-----|----------------|----------|
| **Lab 1** | `docs/LAB01-EXPERIMENT.md` | Prompt-only vs AGENTS.md + feature_list + PROGRESS |
| **Lab 2** | `docs/LAB02-FRESH-SESSION.md` | `ARCHITECTURE.md`, `CONSTRAINTS.md`, fresh session |
| **Lab 3** | `docs/LAB03-PASS-STATE.md` | WIP=1, pytest verify, `harness_verify.py` |

**Task mẫu:** giỏ hàng (`Cart.add`, `total_items`).

## Chạy nhanh

```bash
cd labs/python-harness
pip install -e ".[dev]"
make test          # hoặc: pytest -q
make verify        # pass-state gating cho feature active
```

Windows:

```powershell
pip install -e ".[dev]"
pytest -q
python scripts/harness_verify.py
```

## Chia nhóm (5 người gợi ý)

| Người | Lab |
|-------|-----|
| 1 | Lab 1 — chạy 2 lần, điền bảng experiment |
| 2 | Lab 2 — fresh session test + bổ sung docs |
| 3 | Lab 3 — `harness_verify.py` + feature F03 |
| 4 | CI pytest trên GitHub Actions |
| 5 | Landing mục **Dự án** + quay video demo 3 phút |

## Tài liệu thầy

- [Harness Engineering là gì?](https://goonnguyen.substack.com/p/harness-engineering-la-gi)
- [Martin Fowler](https://martinfowler.com/articles/harness-engineering.html)
- [12-factor-agents](https://github.com/humanlayer/12-factor-agents)
