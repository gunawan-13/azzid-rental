const express = require('express');
const cors = require('cors');
const apiV1Router = require('./routes'); // Sesuaikan jalur file router v1 di atas

const app = express();

// 1. Wajib dipasang paling atas: Izinkan CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Middleware Parser Body JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Daftarkan Endpoint Prefix API v1
app.use('/api/v1', apiV1Router);

// 4. Export app khusus untuk Vercel Serverless Function
module.exports = app;

// Jalankan server lokal jika tidak sedang di-deploy Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}