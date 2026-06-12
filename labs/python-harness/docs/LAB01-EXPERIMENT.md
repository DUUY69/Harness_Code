# Lab 1 — Baseline vs Minimal Harness

**Task:** Tính năng giỏ hàng — `add(item)`, đếm `total_items()`.

## Lần 1 — Prompt-only (baseline)

- Không có `AGENTS.md`, không `feature_list.json`, không `PROGRESS.md`.
- Chỉ prompt: *"Implement a Cart class in Python with add and total_items."*
- Ghi lại: thời gian, agent có claim "done" không?, test có pass không?

## Lần 2 — Minimal harness (rules-first)

- Có 3 file: `AGENTS.md`, `docs/feature_list.json`, `PROGRESS.md`.
- Prompt: *"Read AGENTS.md. Complete feature F01 only (WIP=1). Run pytest before claiming done."*
- Ghi lại cùng các cột.

## Bảng so sánh (nhóm điền)

| Run | Harness? | Agent claim done? | pytest pass? | Thời gian | Ghi chú |
|-----|----------|-------------------|--------------|-----------|---------|
| 1   | Không    |                   |              |           |         |
| 2   | Có (3 file) |                   |              |           |         |

## Mục tiêu

Đo **verification gap**: agent nói xong nhưng test fail (false victory).
