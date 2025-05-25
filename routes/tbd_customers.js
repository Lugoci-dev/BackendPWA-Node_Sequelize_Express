// routes/customerRoutes.js
const express = require('express');
const { verificarToken, verificarRol } = require('../middlewares/auth');
const {
  obtenerClientes,
  obtenerClientePorId,
  obtenerClientesPorUsuarioId,
  crearCliente,
  actualizarCliente,
  eliminarCliente
} = require('../controllers/tbd_customerController');

const router = express.Router();

// Get all customers (Admin only)
router.get('/', obtenerClientes);

// Get customer by ID (Admin only)
router.get('/:id', obtenerClientePorId);

// Get customers by user ID (Admin only)
router.get('/user/:userId', obtenerClientesPorUsuarioId);

// Create a new customer (Authenticated user)
router.post('/', crearCliente);

// Update a customer (Admin only)
router.put('/:id', actualizarCliente);

// Delete a customer (Admin only)
router.delete('/:id', eliminarCliente);

module.exports = router;