# Harness_Code

Repository cho khóa học **Harness Engineering** — một frontend static deploy qua CI/CD.

## Cấu trúc `frontend/`

| Đường dẫn | Mô tả |
|-----------|--------|
| `/` | Landing Harness Engineering (nội dung khóa học) |
| `/article/` | Bài viết long-read |
| `/templates/` | Template pack (AGENTS.md, feature_list.json, …) |
| `/sosbike/` | **Mẫu landing SOSBIKE** ([repo thầy](https://github.com/MinhTuan1804/SOSBIKE_LANDINGPAGE)) — cùng layout/CSS, so sánh 1:1 |
| `/assets/` | Hero cover + brand assets (đồng bộ mẫu SOSBIKE) |

Harness landing dùng cùng design system và `hero-cover.jpg` như mẫu SOSBIKE để dễ chỉnh UI theo template thầy.

## Chạy local

```powershell
cd frontend
python -m http.server 8093
```

- Harness: `http://localhost:8093/`
- Mẫu SOSBIKE: `http://localhost:8093/sosbike/`

## CI/CD (GitHub Actions)

| Workflow | Khi chạy | Việc làm |
|----------|----------|-----------|
| `fe-ci.yml` | PR / push `main` | Validate HTML, kiểm tra file + link nội bộ |
| `fe-deploy.yml` | Sau CI pass trên `main` | Deploy toàn bộ `frontend/` qua SSH/rsync |

### Secrets (Settings → Secrets → Actions)

| Secret | Ví dụ |
|--------|--------|
| `SSH_PRIVATE_KEY` | Private key SSH |
| `SSH_HOST` | `168.144.38.133` |
| `SSH_USER` | `root` |
| `DEPLOY_PATH` | `/var/www/harness-landing` |

Production: `http://168.144.38.133:8093/` · Mẫu SOSBIKE: `http://168.144.38.133:8093/sosbike/`

Deploy thủ công: `frontend/deploy.ps1`
