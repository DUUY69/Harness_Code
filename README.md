# Harness_Code

Repository cho khóa học **Harness Engineering** — landing FE + **Lab C# (Nhóm OPS)**.

## Nhóm OPS — Labs Python (Lab 1–3)

| Path | Mô tả |
|------|--------|
| `labs/python-harness/` | **Lab chính** — giỏ hàng, pytest, pass-state gating |
| `labs/ops-csharp/` | Tùy chọn (.NET demo) |
| `labs/ops-group/` | Đề xuất ngôn ngữ, chia việc |

```powershell
cd labs/python-harness
pip install -e ".[dev]"
pytest -q
python scripts/harness_verify.py
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
