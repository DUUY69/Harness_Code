# Lab 3 — Runtime feedback & pass-state gating

## Nguyên tắc

- **WIP=1:** chỉ một feature `active`.
- **Verification:** lệnh trong `feature_list.json` (pytest).
- **Pass-state gating:** agent không tick `passing`; chạy:

```bash
python scripts/harness_verify.py
```

Script chạy lệnh `verification` của feature `active`. Exit 0 → harness có thể promote `active` → `passing`.

## Thử cố tình

1. Agent claim "F03 done" nhưng không chạy pytest → state vẫn `active`.
2. Chạy `harness_verify.py` → nếu test pass, state → `passing`.
