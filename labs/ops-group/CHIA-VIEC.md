# Chia việc Nhóm OPS — chuẩn bị Lab (C#)

## Tuần này

| Người | Việc | Deadline gợi ý |
|-------|------|----------------|
| **Duy** | CI `dotnet test` lab, deploy landing, gửi đề xuất C# cho thầy | 2 ngày |
| **Tuấn Kiệt** | Viết GitHub Actions job + doc Project 01 (baseline vs harness) | 3 ngày |
| **Nhã Uyên** | Soạn mô tả Lab trên landing + đọc Substack/Martin Fowler (Khái niệm) | 3 ngày |
| **Hoàng Anh Khoa** | Review test F03, bổ sung xUnit cho feature mới, đọc 12-factor (factor 8–9) | 3 ngày |

## Project 01 — kịch bản thực hành

1. **Baseline:** Agent chỉ có code C#, không `AGENTS.md` → dễ claim “xong” sai
2. **Minimal harness:** Thêm `AGENTS.md`, `feature_list.json`, `dotnet test` → pass-state gating
3. **Đo:** số lần agent claim done vs test thực sự pass

## Project 02 — checklist workspace

- [ ] `AGENTS.md` (C# commands)
- [ ] `docs/feature_list.json`
- [ ] `PROGRESS.md` / `DECISIONS.md`
- [ ] `scripts/verify.ps1`
- [ ] xUnit test cho mỗi feature

## Họp nhóm (30 phút)

1. Chốt đề xuất C# → copy `DE-XUAT-NGON-NGU.md` gửi chat lớp
2. Chốt ai làm F03 (CI) tuần này
3. Hỏi thầy: Lab nộp trước Chủ nhậy là draft repo hay video demo?
