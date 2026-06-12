# DECISIONS.md — OPS Lab

## 2026-06-12 — Ngôn ngữ chính: C#

- **Decision:** Nhóm OPS dùng **C# / .NET 8** cho Labs (xUnit verify, `dotnet` CLI cho harness)
- **Why:** Stack thống nhất cho backend agent tooling trên Windows; test + CI rõ ràng; phù hợp production OPS
- **Also use:** YAML (GitHub Actions), PowerShell (deploy script), HTML (landing FE — đã có)

## 2026-06-12 — Verification = dotnet test

- **Decision:** Mỗi feature trong `feature_list.json` map tới xUnit test filter
- **Why:** Pass-state gating — agent không tự claim done; test runner là harness
