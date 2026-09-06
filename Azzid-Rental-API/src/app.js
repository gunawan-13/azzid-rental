const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const pool = require('./config/database');
const apiRoutes = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(morgan('combined'));

app.get('/health', (req, res) => {
  res.json({ success: true, service: 'azzid-rental-api', status: 'ok' });
});

app.get('/health/db', async (req, res, next) => {
  try {
    await pool.query('SELECT 1');
    res.json({ success: true, database: 'connected' });
  } catch (error) {
    next(error);
  }
});

app.use('/api/v1', apiRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
