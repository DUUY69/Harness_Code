# SOSBIKE Landing Page

Landing page 1 trang de gioi thieu du an SOSBIKE.

## Cac file chinh

- `index.html`: cau truc noi dung landing page
- `styles.css`: giao dien va responsive
- `main.js`: animation reveal va active navigation
- `assets/`: logo va anh chup tu du an

## Chay nhanh

Co the mo truc tiep `index.html` trong trinh duyet.

Neu muon chay qua local server:

```powershell
cd D:\FPT\EXE\MainProject\SOSBIKE_LANDINGPAGE
python -m http.server 4173
```

Sau do mo `http://localhost:4173`.

Blog section se lay du lieu tu BE `/api/blogs`. Neu chay local, mac dinh dung `http://localhost:5200/api`; khi deploy co the override bang `window.SOSBIKE_API_BASE_URL`.
