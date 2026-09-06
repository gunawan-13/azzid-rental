function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} tidak ditemukan`
  });
}

function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.statusCode || ({
    ER_DUP_ENTRY: 409,
    ER_NO_REFERENCED_ROW_2: 400,
    ER_ROW_IS_REFERENCED_2: 409,
    ER_DATA_TOO_LONG: 400,
    ER_TRUNCATED_WRONG_VALUE: 400,
    ER_BAD_NULL_ERROR: 400,
    ER_NO_DEFAULT_FOR_FIELD: 400,
    ER_CHECK_CONSTRAINT_VIOLATED: 400
  }[err.code] || 500);
  res.status(status).json({
    success: false,
    message: status === 500 ? 'Terjadi kesalahan pada server' : status === 409 ? 'Data sudah ada atau masih digunakan' : err.message
  });
}

module.exports = { notFound, errorHandler };
