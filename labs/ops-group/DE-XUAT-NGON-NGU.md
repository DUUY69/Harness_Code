# Đề xuất ngôn ngữ — Nhóm OPS (cập nhật)

**Thành viên:** Lê Hoàng Tuấn Kiệt, Nhã Uyên, Trần Nhật Duy, Hoàng Anh Khoa (+ …)

## Đề xuất chính: Python

| Công nghệ | Vai trò |
|-----------|---------|
| **Python 3.11 + pytest** | **Lab 1–3** (agent, verification, feature_list) |
| **YAML** | GitHub Actions |
| **PowerShell / Bash** | Deploy landing, script harness |
| **HTML/CSS/JS** | Landing khóa (`frontend/`) |

**Tùy chọn:** C# (`labs/ops-csharp/`) — ai rành .NET làm CI demo, **không bắt buộc cả nhóm**.

## Vì sao Python cho Lab (không ép C#)?

1. AI coding (Cursor, Claude) mặc định Python — cả nhóm làm Lab dễ hơn
2. Khóa dùng `pytest` / verification commands — map 1-1 `feature_list.json`
3. OPS vẫn ôm **CI/CD + landing**; ngôn ngữ lab ≠ ngôn ngữ deploy
4. Lab task đơn giản (giỏ hàng) — không cần .NET stack

## Repo Lab

`labs/python-harness/` — scaffold sẵn 3 lab + `harness_verify.py` (pass-state gating)

## Deliverable

- [x] Python lab scaffold
- [ ] Mỗi người 1 run Lab 1 (bảng so sánh)
- [ ] Lab 2 fresh session (checklist)
- [ ] Lab 3 + CI `pytest` trên push

https://github.com/DUUY69/Harness_Code
