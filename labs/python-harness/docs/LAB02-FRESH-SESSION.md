# Lab 2 — Fresh session test

## Protocol

1. Mở session AI **mới** (không chat history).
2. Chỉ nói: *"Đọc repo `labs/python-harness` và chạy test. Cho biết dự án làm gì và feature active là gì."*
3. Không giải thích thêm bằng miệng.

## Pass nếu agent (không người) làm được:

- [ ] Chạy `pip install -e ".[dev]"` hoặc `pytest`
- [ ] Đọc `AGENTS.md`, `docs/ARCHITECTURE.md`, `PROGRESS.md`
- [ ] Biết feature `active` trong `feature_list.json`
- [ ] Không hỏi "project này dùng gì?"

## Repo = single source of truth

Mọi luật trong `docs/`, không chỉ trong prompt chat.
