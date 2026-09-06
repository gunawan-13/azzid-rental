const express = require('express');
const vehicleRoutes = require('./vehicle.routes');
const customerRoutes = require('./customer.routes');
const rentalRoutes = require('./rental.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Azzid Rental API v1' });
});
router.use('/vehicles', vehicleRoutes);
router.use('/customers', customerRoutes);
router.use('/rentals', rentalRoutes);

module.exports = router;
