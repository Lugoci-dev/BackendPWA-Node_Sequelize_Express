// routes/shippingRoutes.js
const express = require('express');
const { verificarToken, verificarRol } = require('../middlewares/auth');
const {
  obtenerEnvios,
  obtenerEnvioPorId,
  crearEnvio,
  actualizarEnvio,
  eliminarEnvio
} = require('../controllers/tbd_shippingController');

const router = express.Router();

// Get all shippings (Admin only)
router.get('/', obtenerEnvios);

// Get shipping by ID (Admin only)
router.get('/:id', obtenerEnvioPorId);

// Create a new shipping (Authenticated user)
router.post('/', crearEnvio);

// Update a shipping (Admin only)
router.put('/:id', actualizarEnvio);

// Delete a shipping (Admin only)
router.delete('/:id', eliminarEnvio);

module.exports = router;