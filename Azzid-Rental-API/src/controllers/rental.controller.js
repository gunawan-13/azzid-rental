const pool = require('../config/database');

async function list(req, res) {
  const { status, customer_id, vehicle_id } = req.query;
  const conditions = [];
  const params = [];
  if (status) { conditions.push('r.status = ?'); params.push(status); }
  if (customer_id) { conditions.push('r.customer_id = ?'); params.push(customer_id); }
  if (vehicle_id) { conditions.push('r.vehicle_id = ?'); params.push(vehicle_id); }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const [rows] = await pool.query(`
    SELECT r.*, c.name AS customer_name, v.name AS vehicle_name, v.plate_number
    FROM rentals r
    JOIN customers c ON c.id = r.customer_id
    JOIN vehicles v ON v.id = r.vehicle_id
    ${where} ORDER BY r.created_at DESC
  `, params);
  res.json({ success: true, data: rows });
}

async function getById(req, res) {
  const [rows] = await pool.query(`
    SELECT r.*, c.name AS customer_name, c.whatsapp, v.name AS vehicle_name, v.plate_number
    FROM rentals r JOIN customers c ON c.id = r.customer_id JOIN vehicles v ON v.id = r.vehicle_id
    WHERE r.id = ?
  `, [req.params.id]);
  if (!rows.length) return res.status(404).json({ success: false, message: 'Rental tidak ditemukan' });
  res.json({ success: true, data: rows[0] });
}

async function create(req, res) {
  const required = ['id', 'customer_id', 'vehicle_id', 'start_date', 'end_date', 'rental_type', 'subtotal', 'total'];
  const missing = required.filter((field) => req.body[field] === undefined);
  if (missing.length) return res.status(400).json({ success: false, message: `Field wajib: ${missing.join(', ')}` });

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [vehicleRows] = await connection.query('SELECT status FROM vehicles WHERE id = ? FOR UPDATE', [req.body.vehicle_id]);
    if (!vehicleRows.length) {
      await connection.rollback();
      return res.status(400).json({ success: false, message: 'Kendaraan tidak ditemukan' });
    }
    if (vehicleRows[0].status !== 'available') {
      await connection.rollback();
      return res.status(409).json({ success: false, message: 'Kendaraan tidak tersedia' });
    }

    const fields = ['id', 'customer_id', 'vehicle_id', 'start_date', 'end_date', 'rental_type', 'pickup_location', 'dropoff_location', 'driver_id', 'subtotal', 'driver_cost', 'discount', 'total', 'status', 'payment_method', 'payment_status', 'transaction_id'];
    const values = fields.map((field) => req.body[field] === undefined ? (field === 'status' ? 'Pending' : field === 'payment_status' ? 'UNPAID' : field === 'driver_cost' || field === 'discount' ? 0 : null) : req.body[field]);
    await connection.query(`INSERT INTO rentals (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`, values);
    await connection.query("UPDATE vehicles SET status = 'rented' WHERE id = ?", [req.body.vehicle_id]);
    await connection.commit();
    const [rows] = await pool.query('SELECT * FROM rentals WHERE id = ?', [req.body.id]);
    res.status(201).json({ success: true, data: rows[0] });
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function update(req, res) {
  const allowed = ['start_date', 'end_date', 'rental_type', 'pickup_location', 'dropoff_location', 'driver_id', 'subtotal', 'driver_cost', 'discount', 'total', 'status', 'payment_method', 'payment_status', 'transaction_id', 'paid_at', 'user_email'];
  const changes = allowed.filter((field) => req.body[field] !== undefined);
  if (!changes.length) return res.status(400).json({ success: false, message: 'Tidak ada field yang diubah' });
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query(`UPDATE rentals SET ${changes.map((field) => `${field} = ?`).join(', ')} WHERE id = ?`, [...changes.map((field) => req.body[field]), req.params.id]);
    if (req.body.status === 'Completed' || req.body.status === 'Cancelled') {
      const [rentalRows] = await connection.query('SELECT vehicle_id FROM rentals WHERE id = ?', [req.params.id]);
      if (rentalRows.length) await connection.query("UPDATE vehicles SET status = 'available' WHERE id = ?", [rentalRows[0].vehicle_id]);
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
  return getById(req, res);
}

module.exports = { list, getById, create, update };
