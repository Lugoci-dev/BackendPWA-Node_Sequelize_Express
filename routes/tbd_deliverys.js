// routes/deliveryRoutes.js
const express = require('express');
const { verificarToken, verificarRol } = require('../middlewares/auth');
const {
  obtenerDeliveries,
  obtenerDeliveryPorId,
  crearDelivery,
  actualizarDelivery,
  eliminarDelivery
} = require('../controllers/tbd_deliveryController');

const router = express.Router();

// Get all deliveries (Admin only)
router.get('/', obtenerDeliveries);

// Get delivery by ID (Admin only)
router.get('/:id', obtenerDeliveryPorId);

// Create a new delivery (Admin only)
router.post('/', crearDelivery);

// Update a delivery (Admin only)
router.put('/:id', actualizarDelivery);

// Delete a delivery (Admin only)
router.delete('/:id', eliminarDelivery);

module.exports = router;