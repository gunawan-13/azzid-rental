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
- `database/schema.sql` bukan sumber data aktif. Login dan data bisnis menggunakan Supabase; `localStorage` hanya menyimpan cache/tampilan lokal.
- Semua URL gambar kendaraan/hero tetap menggunakan URL sumber yang sama.
- Tidak ada npm/package installation yang diperlukan untuk versi ini; Tailwind dan font tetap memakai CDN seperti source.

## Autentikasi live

Login dan data bisnis menggunakan Supabase. Jalankan `database/supabase_auth.sql`, lalu `database/supabase_live_data.sql` di Supabase SQL Editor sebelum deploy frontend. Migrasi data mengimpor katalog kendaraan, promo, dan settings awal hanya jika tabel terkait kosong; driver contoh tidak diimpor. Ikuti [LIVE_AUTH_SETUP.md](./LIVE_AUTH_SETUP.md) untuk langkah lengkap.

Jangan gunakan atau menambahkan kredensial demo/admin ke source code atau README.

## Verifikasi

Target pemisahan ini adalah **behavior-preserving refactor**: kode aplikasi sumber tidak didesain ulang; hanya dipindahkan dari satu HTML ke file-file yang diminta.
