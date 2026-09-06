const express = require('express');
const controller = require('../controllers/customer.controller');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();
router.get('/', asyncHandler(controller.list));
router.get('/:id', asyncHandler(controller.getById));
router.post('/', asyncHandler(controller.create));
router.patch('/:id', asyncHandler(controller.update));
router.delete('/:id', asyncHandler(controller.remove));

module.exports = router;
