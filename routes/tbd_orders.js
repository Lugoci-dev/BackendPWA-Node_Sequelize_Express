// routes/orderRoutes.js
const express = require('express');
const { verificarToken, verificarRol } = require('../middlewares/auth');
const {
  obtenerPedidos,
  obtenerPedidoPorId,
  obtenerPedidosPorUsuarioId,
  obtenerPedidosPorToken,
  crearPedido,
  actualizarPedido,
  eliminarPedido
} = require('../controllers/tbd_orderController');

const router = express.Router();

// Get all orders (Admin only)
router.get('/', obtenerPedidos);

// Get order by ID (Admin only)
router.get('/:id', obtenerPedidoPorId);

// Get orders by user ID (Admin only)
router.get('/user/:userId', obtenerPedidosPorUsuarioId);

// Get orders of authenticated user
router.get('/my-orders', obtenerPedidosPorToken);

// Create a new order (Authenticated user)
router.post('/', crearPedido);

// Update an order (Admin only)
router.put('/:id', actualizarPedido);

// Delete an order (Admin only)
router.delete('/:id', eliminarPedido);

module.exports = router;