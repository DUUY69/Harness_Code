# Harness_Code

Repository cho khóa học **Harness Engineering** — landing page FE và tài liệu liên quan.

## Cấu trúc

| Thư mục | Mô tả |
|---------|--------|
| `HARNESS_LANDINGPAGE/` | Landing page static (HTML/CSS/JS) — deploy tại `:8093` |
| `SOSBIKE_LANDINGPAGE/` | (Local only, không push) — landing SOSBIKE tham chiếu UI |
| `harness-slides-extract.txt` | Nội dung trích từ slide khóa học |

## Chạy FE local

```powershell
cd HARNESS_LANDINGPAGE
python -m http.server 8093
```

Mở `http://localhost:8093`.

## CI/CD (GitHub Actions)

| Workflow | Khi chạy | Việc làm |
|----------|----------|-----------|
| `fe-ci.yml` | PR / push vào `main` | Kiểm tra file bắt buộc, validate HTML, kiểm tra link nội bộ |
| `fe-deploy.yml` | Push `main` (sau CI pass) | Deploy `HARNESS_LANDINGPAGE/` qua SSH/rsync |

### Secrets cần thiết (Settings → Secrets → Actions)

| Secret | Ví dụ | Mô tả |
|--------|-------|--------|
| `SSH_PRIVATE_KEY` | `-----BEGIN OPENSSH PRIVATE KEY-----...` | Private key SSH (read/write deploy key) |
| `SSH_HOST` | `168.144.38.133` | Máy chủ deploy |
| `SSH_USER` | `root` | User SSH |
| `DEPLOY_PATH` | `/var/www/harness-landing` | Thư mục đích trên server |

Sau deploy, site: `http://168.144.38.133:8093/`

Deploy thủ công (Windows): `HARNESS_LANDINGPAGE/deploy.ps1`
