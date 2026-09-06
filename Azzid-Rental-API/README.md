# Azzid Rental API

REST API untuk manajemen kendaraan, customer, dan rental menggunakan Node.js, Express.js, dan MariaDB/MySQL.

## Menjalankan lokal

1. Salin `.env.example` menjadi `.env`, lalu isi kredensial database.
2. Jalankan `database/schema.sql` pada MariaDB/MySQL.
3. Opsional, jalankan `database/seed.sql` untuk data demo.
4. Install dan jalankan server:

```bash
npm install
npm run dev
```

Server tersedia di `http://localhost:3000`.

## Endpoint

Semua endpoint resource memakai prefix `/api/v1`.

- `GET /health` - health check tanpa database
- `GET /health/db` - health check koneksi database
- `GET|POST /api/v1/vehicles`
- `GET|PATCH|DELETE /api/v1/vehicles/:id`
- `GET|POST /api/v1/customers`
- `GET|PATCH|DELETE /api/v1/customers/:id`
- `GET|POST /api/v1/rentals`
- `GET|PATCH /api/v1/rentals/:id`

List kendaraan mendukung query `status`, `category`, dan `search`. List customer mendukung `status` dan `search`. List rental mendukung `status`, `customer_id`, dan `vehicle_id`.

## Deployment Railway

1. Push repository ke GitHub.
2. Buat project baru di Railway dan deploy dari repository tersebut.
3. Tambahkan service MySQL Railway, atau gunakan database MySQL kompatibel.
4. Isi variable service API: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, dan opsional `CORS_ORIGIN`.
5. Import `database/schema.sql` ke database production, kemudian deploy. Railway otomatis menjalankan `npm start` berdasarkan `railway.json`.

Railway biasanya menyediakan `PORT`; aplikasi sudah menggunakannya secara otomatis.

## Catatan keamanan

API ini adalah fondasi CRUD dan belum memiliki autentikasi/otorisasi, rate limiting, atau integrasi payment gateway. Tambahkan lapisan tersebut sebelum dipakai untuk data production.
