# Đề xuất ngôn ngữ — Nhóm OPS (Nhóm 3)

**Thành viên:** Lê Hoàng Tuấn Kiệt, Nhã Uyên, Trần Nhật Duy, Hoàng Anh Khoa

## Đề xuất

Nhóm OPS chọn **C# (.NET 8)** làm ngôn ngữ **chính** cho các bài Lab (Project thực hành).

| Công nghệ | Vai trò |
|-----------|---------|
| **C# / .NET 8 + xUnit** | Logic lab, verification, pass-state gating qua `dotnet test` |
| **PowerShell** | Script harness local (`verify.ps1`, `deploy.ps1`) |
| **YAML** | GitHub Actions CI/CD |
| **HTML/CSS/JS** | Landing khóa học (đã deploy) |

**Giai đoạn 2 (nếu thầy duyệt):** BAML generate client C# cho structured agent output.

## Vì sao C#?

1. **Verification rõ:** `dotnet build` + `dotnet test` = harness pipeline chuẩn production
2. **Phù hợp OPS:** deploy, CI, Windows/server stack nhóm đang dùng
3. **Agent-readable:** `AGENTS.md` + test filter map 1-1 với `feature_list.json`
4. Khác nhóm BE9/STE (Python/TS) — tránh trùng, OPS ôm pipeline + .NET lab

## Deliverable tuần 1

- [x] Scaffold `labs/ops-csharp/` (solution + tests + harness files)
- [ ] CI: `dotnet test labs/ops-csharp` trên push `main`
- [ ] Nội dung Lab trên landing (mục **Dự án**)
- [ ] Project 01 script: so sánh baseline vs có harness (doc + video ngắn)

## Repo

https://github.com/DUUY69/Harness_Code

Landing: http://168.144.38.133:8093/
