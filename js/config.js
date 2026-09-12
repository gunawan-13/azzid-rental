// Konfigurasi frontend.
// URL backend otomatis menyesuaikan lingkungan (lokal vs production).
window.API_BASE_URL = (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
)
  ? 'http://localhost:3000/api'
  : 'https://azzid-rental-api-production.up.railway.app/api';

// Isi Client ID Google dari Google Cloud Console agar tombol Login dengan Google aktif.
window.GOOGLE_CLIENT_ID = '';