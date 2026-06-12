# CONSTRAINTS.md — Hard rules (Lab 2)

1. **WIP=1** — một feature `active` trong `feature_list.json`.
2. Agent **không** tự set `state: passing` — dùng `scripts/harness_verify.py`.
3. Mọi feature phải có lệnh `verification` chạy được (pytest).
4. Không thêm dependency ngoài `pytest` cho lab core.
5. Logic giỏ hàng chỉ trong `src/harness_lab/cart.py` (không Flask/API ở lab này).
