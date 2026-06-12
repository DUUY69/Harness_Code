# DECISIONS.md

## 2026-06-12 — Labs dùng Python (không C#)

- **Decision:** Lab 1–3 dùng **Python + pytest** — AI tooling và cả nhóm dễ làm
- **Why:** Cursor/Claude examples chủ yếu Python; pytest = verification commands trong khóa
- **C#:** Giữ `labs/ops-csharp/` tùy chọn / demo CI .NET, không bắt buộc mọi người

## 2026-06-12 — Task domain = Cart (giỏ hàng)

- **Decision:** Lab task cố định là `Cart` class, không API full stack
- **Why:** Lab 1 so sánh harness, không phụ thuộc framework
