# Supabase Authentication Setup

Login, pendaftaran penyewa, login Google, reset password, dan role admin menggunakan Supabase Auth. Profil dan role menggunakan tabel `public.users` yang sudah ada; password tidak disimpan di tabel aplikasi. Supabase Auth menggunakan session-nya sendiri.

## Siapkan Supabase

1. Pastikan project sudah mempunyai tabel `public.users` dengan kolom `id`, `email`, `name`, `phone`, `role`, `status`, dan `created_at`.
2. Buka **SQL Editor** pada project Supabase dan jalankan `database/supabase_auth.sql`. Script menambahkan relasi `auth_user_id`, mengaktifkan RLS, dan menghubungkan user Auth yang emailnya sudah terverifikasi ke baris `public.users` yang cocok. Baris pengguna yang sudah ada dan belum tertaut akan mempertahankan role/status-nya.
3. Setelah migrasi autentikasi berhasil, jalankan `database/supabase_live_data.sql` dari **SQL Editor**. Script ini mengatur akses RLS untuk tabel bisnis, menghubungkan data booking ke customer dan notifikasi, serta mengisi kendaraan, promo, dan settings awal hanya jika tabel masing-masing kosong. Script tidak membuat driver contoh.
4. Di Supabase **Authentication → URL Configuration**, tambahkan URL produksi frontend ke **Redirect URLs**, misalnya `https://azzid-rentcar.vercel.app/**`. Tambahkan URL Live Server yang digunakan saat development jika diperlukan.
5. Aktifkan **Email provider** di Authentication dan wajibkan konfirmasi email. Profil lama hanya ditautkan ke akun Auth setelah email akun diverifikasi.
6. Untuk Google login, aktifkan provider Google di Supabase Authentication dan isi OAuth Client ID/secret dari Google Cloud di pengaturan provider Supabase. Tambahkan URL callback Supabase yang ditampilkan di halaman pengaturan itu ke Google Cloud.
7. `js/supabase.js` memakai project URL dan publishable key frontend. Publishable/anon key memang digunakan di browser; jangan pernah menaruh `service_role` key di frontend.

## Buat akun admin

1. Daftarkan akun melalui form registrasi di aplikasi, lalu selesaikan konfirmasi email bila diminta.
2. Di SQL Editor, promosikan email admin yang benar:

```sql
UPDATE public.users
SET role = 'admin', status = 'Active'
WHERE LOWER(email) = LOWER('email-admin-anda@example.com');
```

Pastikan query mengubah tepat satu baris. Login admin memakai email dan password akun Supabase Auth yang sama. Jangan menaruh kredensial admin di JavaScript atau README.

## Migrasi akun sebelumnya

Akun Auth lama akan ditautkan otomatis ketika emailnya terverifikasi jika ada baris dengan email yang sama dan belum tertaut di `public.users`. Jika akun belum ada di Supabase Auth, daftarkan/undang pengguna melalui alur Supabase Auth dengan email yang sama lalu konfirmasi emailnya. Jangan menyalin password/hash ke browser.

## Catatan deployment

Autentikasi dan data bisnis menggunakan Supabase langsung dari frontend; rewrite Vercel ke Railway sudah tidak diperlukan. Pastikan kedua file migrasi SQL telah dijalankan sebelum menerbitkan perubahan frontend.
