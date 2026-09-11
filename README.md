# Azzid-Rental-F

Struktur folder hasil pemisahan dari **1 file HTML sumber** tanpa mengubah desain, teks, route hash, data demo, atau perilaku JavaScript.

## Jalankan

Buka folder ini di VS Code lalu jalankan `index.html` menggunakan Live Server (disarankan), atau web server lokal.

## Struktur

```text
Azzid-Rental-F/
├── assets/
│   ├── css/
│   │   ├── custom.css
│   │   └── style.css
│   └── img/
├── database/
│   └── schema.sql
├── js/
│   ├── app.js
│   ├── crud.js
│   ├── data.js
│   ├── tailwind.config.js
│   └── utils.js
├── modules/
│   ├── customer.html
│   ├── dashboard.html
│   ├── landing.html
│   ├── mobil.html
│   └── rental.html
├── index.html
└── README.md
```

## Catatan penting

- `index.html` sekarang hanya menjadi shell/entry point.
- CSS inline asli dipindahkan ke `assets/css/style.css`.
- Konfigurasi Tailwind inline asli dipindahkan ke `js/tailwind.config.js`.
- Data demo + persistence/state dipindahkan ke `js/data.js`.
- Helper, icon, badge, dan customer-auth dipindahkan ke `js/utils.js`.
- Logika view, booking, admin dashboard, CRUD kendaraan/booking, invoice, dan router dipertahankan di `js/app.js` **secara utuh** agar tidak mengubah hasil render.
- `js/crud.js` dan file di `modules/` disiapkan sesuai struktur yang diminta, tetapi tidak digunakan sebagai partial/fetch karena memindahkan render ke partial HTML akan mengubah timing/behavior aplikasi sumber.
- `database/schema.sql` tidak dipakai oleh aplikasi saat ini karena source menggunakan `localStorage`, bukan database server.
- Semua URL gambar kendaraan/hero tetap menggunakan URL sumber yang sama.
- Tidak ada npm/package installation yang diperlukan untuk versi ini; Tailwind dan font tetap memakai CDN seperti source.

## Akun demo

Admin:
- Super Admin: `owner@azzidrentcar.id` / `owner123`
- Admin: `admin@azzidrentcar.id` / `admin123`
- Staff: `staff@azzidrentcar.id` / `staff123`
- Finance: `finance@azzidrentcar.id` / `finance123`

Customer:
- `penyewa@demo.id` / `demo123`

## Verifikasi

Target pemisahan ini adalah **behavior-preserving refactor**: kode aplikasi sumber tidak didesain ulang; hanya dipindahkan dari satu HTML ke file-file yang diminta.
# azzid-rental
