// routes/roleRoutes.js
const express = require('express');
// const {equire('../middlewares/auth');
const {
  obtenerRoles,
  obtenerRolPorId,
  crearRol,
  actualizarRol,
  eliminarRol
} = require('../controllers/tbd_roleController');

const router = express.Router();

// Get all roles (Admin only)
router.get('/', obtenerRoles);

// Get role by ID (Admin only)
router.get('/:id', obtenerRolPorId);

// Create a new role (Admin only)
router.post('/', crearRol);

// Update a role (Admin only)
router.put('/:id', actualizarRol);

// Delete a role (Admin only)
router.delete('/:id', eliminarRol);

module.exports = router;