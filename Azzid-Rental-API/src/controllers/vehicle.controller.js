const pool = require('../config/database');

const fields = ['name', 'brand', 'model', 'category', 'year', 'plate_number', 'transmission', 'seats', 'fuel', 'color', 'doors', 'baggage', 'price_lepas_kunci', 'price_dengan_driver', 'status', 'image_url', 'description', 'features'];

function valuesFrom(body) {
  return fields.map((field) => field === 'features' && body[field] !== undefined ? JSON.stringify(body[field]) : body[field]);
}

async function list(req, res) {
  const { status, category, search } = req.query;
  const conditions = [];
  const params = [];
  if (status) { conditions.push('status = ?'); params.push(status); }
  if (category) { conditions.push('category = ?'); params.push(category); }
  if (search) { conditions.push('(name LIKE ? OR brand LIKE ? OR plate_number LIKE ?)'); params.push(`%${search}%`, `%${search}%`, `%${search}%`); }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const [rows] = await pool.query(`SELECT * FROM vehicles ${where} ORDER BY created_at DESC`, params);
  res.json({ success: true, data: rows });
}

async function getById(req, res) {
  const [rows] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ success: false, message: 'Kendaraan tidak ditemukan' });
  res.json({ success: true, data: rows[0] });
}

async function create(req, res) {
  const missing = ['id', 'name', 'brand', 'category', 'year', 'plate_number', 'transmission', 'seats', 'fuel', 'price_lepas_kunci', 'price_dengan_driver'].filter((field) => req.body[field] === undefined);
  if (missing.length) return res.status(400).json({ success: false, message: `Field wajib: ${missing.join(', ')}` });
  const providedFields = fields.filter((field) => req.body[field] !== undefined);
  const columns = ['id', ...providedFields];
  const values = [req.body.id, ...valuesFrom(req.body).filter((value, index) => req.body[fields[index]] !== undefined)];
  await pool.query(`INSERT INTO vehicles (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`, values);
  const [rows] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [req.body.id]);
  res.status(201).json({ success: true, data: rows[0] });
}

async function update(req, res) {
  const changes = fields.filter((field) => req.body[field] !== undefined);
  if (!changes.length) return res.status(400).json({ success: false, message: 'Tidak ada field yang diubah' });
  const values = changes.map((field) => field === 'features' ? JSON.stringify(req.body[field]) : req.body[field]);
  await pool.query(`UPDATE vehicles SET ${changes.map((field) => `${field} = ?`).join(', ')} WHERE id = ?`, [...values, req.params.id]);
  return getById(req, res);
}

async function remove(req, res) {
  const [result] = await pool.query('DELETE FROM vehicles WHERE id = ?', [req.params.id]);
  if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Kendaraan tidak ditemukan' });
  res.status(204).send();
}

module.exports = { list, getById, create, update, remove };
