// routes/productOrderRoutes.js
const express = require('express');
const { verificarToken, verificarRol } = require('../middlewares/auth');
const {
  obtenerProductOrders,
  obtenerProductOrderPorId,
  crearProductOrder,
  actualizarProductOrder,
  eliminarProductOrder,
  eliminarProductOrdersPorIds
} = require('../controllers/tbr_productOrderController');

const router = express.Router();

// Get all product orders (Admin only)
router.get('/', obtenerProductOrders);

// Get product order by ID (Admin only)
router.get('/:id', obtenerProductOrderPorId);

// Create a new product order (Authenticated user)
router.post('/', crearProductOrder);

// Update a product order (Admin only)
router.put('/:id', actualizarProductOrder);

// Delete a product order (Admin only)
router.delete('/:id', eliminarProductOrder);

// Delete a product order (Admin only)
router.delete('/', eliminarProductOrdersPorIds);



module.exports = router;