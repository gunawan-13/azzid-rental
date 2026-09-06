const express = require('express');
const controller = require('../controllers/rental.controller');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();
router.get('/', asyncHandler(controller.list));
router.get('/:id', asyncHandler(controller.getById));
router.post('/', asyncHandler(controller.create));
router.patch('/:id', asyncHandler(controller.update));

module.exports = router;
