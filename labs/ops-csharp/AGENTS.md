# AGENTS.md — OPS Lab (C# / .NET)

> Entry router cho agent. Repo lab C# của **Nhóm OPS** — Harness Engineering course.

## Project overview

- **Stack:** C# 12, .NET 8, xUnit
- **Purpose:** Lab thực hành Project 01 (baseline vs minimal harness) và Project 02 (agent-readable workspace)
- **Nhóm OPS:** Kiệt, Uyên, Duy, Khoa

## Quick start (PowerShell)

```powershell
cd labs/ops-csharp
dotnet restore
dotnet build
dotnet test
.\scripts\verify.ps1
```

## Session startup

1. Đọc `PROGRESS.md` và `DECISIONS.md`
2. Đọc `docs/feature_list.json` — chỉ **một** feature `active` (WIP=1)
3. Chạy `dotnet test` — baseline phải xanh trước khi code
4. Bắt đầu feature `active`

## Session exit

- [ ] `dotnet build` pass
- [ ] `dotnet test` pass (toàn bộ, kể test cũ)
- [ ] `PROGRESS.md` cập nhật
- [ ] Không để `TODO` / debug tạm trong code C#
- [ ] Feature chuyển `passing` **chỉ** sau khi harness verify (pass-state gating)

## Hard constraints

1. **WIP=1** — một feature `active` tại một thời điểm
2. Agent **không** tự set `passing` trong `feature_list.json`
3. Verification = lệnh trong `feature_list.json` (thường `dotnet test --filter ...`)
4. Kiến thức harness phải nằm **trong repo** (AGENTS.md, docs/, tests)

## Definition of done

Feature done khi:

1. Lệnh `verification` trong `docs/feature_list.json` exit 0
2. Harness (script CI hoặc `verify.ps1`) cập nhật state → `passing`
3. `PROGRESS.md` ghi commit + output test

## Topic docs

| File | Khi đọc |
|------|---------|
| `docs/feature_list.json` | Luôn — scope & verify |
| `README.md` | Lộ trình Project 01 / 02 |
| `../ops-group/DE-XUAT-NGON-NGU.md` | Đề xuất ngôn ngữ nhóm |
