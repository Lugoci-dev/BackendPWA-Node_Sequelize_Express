// routes/paymentRoutes.js
const express = require('express');
const { verificarToken, verificarRol } = require('../middlewares/auth');
const {
  obtenerPagos,
  obtenerPagoPorId,
  crearPago,
  actualizarPago,
  eliminarPago
} = require('../controllers/tbd_paymentController');

const router = express.Router();

// Get all payments (Admin only)
router.get('/', obtenerPagos);

// Get payment by ID (Admin only)
router.get('/:id', obtenerPagoPorId);

// Create a new payment (Authenticated user)
router.post('/', crearPago);

// Update a payment (Admin only)
router.put('/:id', actualizarPago);

// Delete a payment (Admin only)
router.delete('/:id', eliminarPago);

module.exports = router;