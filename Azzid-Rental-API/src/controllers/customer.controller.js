const pool = require('../config/database');

async function list(req, res) {
  const { search, status } = req.query;
  const conditions = [];
  const params = [];
  if (status) { conditions.push('status = ?'); params.push(status); }
  if (search) { conditions.push('(name LIKE ? OR email LIKE ? OR whatsapp LIKE ?)'); params.push(`%${search}%`, `%${search}%`, `%${search}%`); }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const [rows] = await pool.query(`SELECT * FROM customers ${where} ORDER BY created_at DESC`, params);
  res.json({ success: true, data: rows });
}

async function getById(req, res) {
  const [rows] = await pool.query('SELECT * FROM customers WHERE id = ?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ success: false, message: 'Customer tidak ditemukan' });
  res.json({ success: true, data: rows[0] });
}

async function create(req, res) {
  const { id, name, whatsapp, email, address, status } = req.body;
  if (!id || !name || !whatsapp || !email) return res.status(400).json({ success: false, message: 'Field id, name, whatsapp, dan email wajib diisi' });
  await pool.query('INSERT INTO customers (id, name, whatsapp, email, address, status) VALUES (?, ?, ?, ?, ?, ?)', [id, name, whatsapp, email, address || null, status || 'New']);
  const [rows] = await pool.query('SELECT * FROM customers WHERE id = ?', [id]);
  res.status(201).json({ success: true, data: rows[0] });
}

async function update(req, res) {
  const allowed = ['name', 'whatsapp', 'email', 'address', 'status'];
  const changes = allowed.filter((field) => req.body[field] !== undefined);
  if (!changes.length) return res.status(400).json({ success: false, message: 'Tidak ada field yang diubah' });
  await pool.query(`UPDATE customers SET ${changes.map((field) => `${field} = ?`).join(', ')} WHERE id = ?`, [...changes.map((field) => req.body[field]), req.params.id]);
  return getById(req, res);
}

async function remove(req, res) {
  const [result] = await pool.query('DELETE FROM customers WHERE id = ?', [req.params.id]);
  if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Customer tidak ditemukan' });
  res.status(204).send();
}

module.exports = { list, getById, create, update, remove };
