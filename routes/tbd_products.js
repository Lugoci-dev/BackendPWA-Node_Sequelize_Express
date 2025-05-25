// routes/productRoutes.js
const express = require('express');
const { verificarToken, verificarRol } = require('../middlewares/auth');
const {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} = require('../controllers/tbd_productController');

const router = express.Router();

// Get all products (Admin only)
router.get('/', obtenerProductos);

// Get product by ID (Admin only)
router.get('/:id', obtenerProductoPorId);

// Create a new product (Admin only)
router.post('/', crearProducto);

// Update a product (Admin only)
router.put('/:id', actualizarProducto);

// Delete a product (Admin only)
router.delete('/:id', eliminarProducto);

module.exports = router;