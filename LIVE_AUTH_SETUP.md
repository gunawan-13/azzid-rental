# Azzid Rental — LIVE Authentication

Frontend login tidak menyimpan JWT/session ke localStorage. Session autentikasi memakai HttpOnly cookie dari backend.

## Lokal
1. Jalankan backend: `npm start` di folder Azzid-Rental-B.
2. Jalankan frontend melalui VS Code Live Server, misalnya `http://localhost:5500`.
3. `js/config.js` default mengarah ke `http://localhost:3000/api`.
4. Registrasi user tersimpan ke MySQL.
5. Login admin menggunakan akun asli yang dibuat `npm run create-admin`.

## Google
Isi `window.GOOGLE_CLIENT_ID` pada `js/config.js` dengan OAuth Web Client ID Google. Origin frontend harus didaftarkan di Google Cloud.

## Lupa Password
Fitur login user menyediakan "Lupa password?". Backend mengirim link reset jika Resend dikonfigurasi. Link berlaku 30 menit.

## Production / Vercel
Ganti `window.API_BASE_URL` di `js/config.js` dengan URL backend production, contoh `https://api.domainanda.com/api`. Jangan gunakan `localhost` pada website production.
