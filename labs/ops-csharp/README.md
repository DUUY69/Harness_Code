# OPS Lab — C# / .NET (Nhóm 3)

Lab thực hành **Harness Engineering** cho Nhóm OPS: Kiệt, Uyên, Duy, Khoa.

## Đề xuất ngôn ngữ (gửi thầy)

| Lớp | Công nghệ | Dùng cho |
|-----|-----------|----------|
| **Chính** | **C# / .NET 8** | Labs, xUnit, logic agent workspace |
| Phụ | TypeScript | GitHub Actions (nếu cần action custom) |
| Phụ | YAML + Bash | CI workflow |
| Phụ | HTML/CSS/JS | Landing khóa (`frontend/`) |
| Tùy chọn | BAML → C# client | Structured LLM output (phase 2) |

## Map Project khóa học

| Project khóa | Nội dung trong repo này |
|--------------|-------------------------|
| **Project 01** Baseline vs Minimal Harness | So sánh: code không harness vs có `AGENTS.md` + `feature_list.json` + `dotnet test` |
| **Project 02** Agent-readable workspace | `AGENTS.md`, `PROGRESS.md`, `DECISIONS.md`, `docs/feature_list.json` |
| **OPS bổ sung** | CI deploy landing + `dotnet test` lab (`F03`) |

## Chạy local

```powershell
cd labs/ops-csharp
dotnet restore
dotnet build
dotnet test
.\scripts\verify.ps1
```

## Cấu trúc

```
labs/ops-csharp/
  AGENTS.md              # Entry cho agent
  docs/feature_list.json # Scope + verification commands
  PROGRESS.md / DECISIONS.md
  src/HarnessOpsLab/     # Code lab
  tests/                 # xUnit = harness verify
  scripts/verify.ps1
```

## Tài liệu tham chiếu (thầy gửi)

- [Harness Engineering là gì?](https://goonnguyen.substack.com/p/harness-engineering-la-gi)
- [Martin Fowler — Harness Engineering](https://martinfowler.com/articles/harness-engineering.html)
- [12-factor-agents](https://github.com/humanlayer/12-factor-agents)
- [BAML](https://boundaryml.com) (structured output — giai đoạn sau)
