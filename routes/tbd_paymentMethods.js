// routes/paymentMethodRoutes.js
const express = require('express');
const { verificarToken, verificarRol } = require('../middlewares/auth');
const {
  obtenerMetodosPago,
  obtenerMetodoPagoPorId,
  crearMetodoPago,
  actualizarMetodoPago,
  eliminarMetodoPago
} = require('../controllers/tbd_paymentMethodController');

const router = express.Router();

// Get all payment methods (Admin only)
router.get('/', obtenerMetodosPago);

// Get payment method by ID (Admin only)
router.get('/:id', obtenerMetodoPagoPorId);

// Create a new payment method (Admin only)
router.post('/', crearMetodoPago);

// Update a payment method (Admin only)
router.put('/:id', actualizarMetodoPago);

// Delete a payment method (Admin only)
router.delete('/:id', eliminarMetodoPago);

module.exports = router;