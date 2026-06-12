# Harness_Code

Repository cho khóa học **Harness Engineering** — landing FE + **Lab C# (Nhóm OPS)**.

## Nhóm OPS — Lab C# (.NET 8)

| Path | Mô tả |
|------|--------|
| `labs/ops-csharp/` | Project 01/02 scaffold, `AGENTS.md`, xUnit verify |
| `labs/ops-group/` | Đề xuất ngôn ngữ, chia việc, tin nhắn group |

```powershell
cd labs/ops-csharp
dotnet test
.\scripts\verify.ps1
```

## Cấu trúc `frontend/`

| Đường dẫn | Mô tả |
|-----------|--------|
| `/` | Landing — 6 mục: Trang chủ, Khái niệm, Nguyên lý, Dự án, Tài nguyên, Về chúng tôi |
| `/article/` | Bài viết long-read |
| `/templates/` | Template pack (AGENTS.md, feature_list.json, …) |

## Chạy local

```powershell
cd frontend
python -m http.server 8093
```

Mở `http://localhost:8093/`.

## CI/CD (GitHub Actions)

| Workflow | Khi chạy | Việc làm |
|----------|----------|-----------|
| `fe-ci.yml` | PR / push `main` | Validate HTML, kiểm tra file + link nội bộ |
| `fe-deploy.yml` | Sau CI pass / chạy tay | Deploy `frontend/` qua SSH |

### Cấu hình environment `production`

**Settings → Environments → production**

| Name | Nên để ở | Value |
|------|-----------|--------|
| `SSH_PRIVATE_KEY` | **Environment secrets** | Nội dung `id_ed25519` |
| `SSH_USER` | Secrets hoặc Variables | `root` |
| `DEPLOY_PATH` | Secrets hoặc Variables | `/var/www/harness-landing` |
| `SSH_HOST` | Variables | `168.144.38.133` |

Production: `http://168.144.38.133:8093/`

Deploy thủ công: `frontend/deploy.ps1`
