// routes/userRolRoutes.js
const express = require('express');
// const {equire('../middlewares/auth');
const {
  obtenerUserRoles,
  obtenerUserRolPorId,
  crearUserRol,
  actualizarUserRol,
  eliminarUserRol,
  obtenerUserRolesPorUsuarioId
} = require('../controllers/tbr_userRolController');

const router = express.Router();

// Get all user roles (Admin only)
router.get('/', obtenerUserRoles);

// Get user role by ID (Admin only)
router.get('/:id', obtenerUserRolPorId);

router.get('/user/:userId', obtenerUserRolesPorUsuarioId);

// Create a new user role (Admin only)
router.post('/', crearUserRol);

// Update a user role (Admin only)
router.put('/:id', actualizarUserRol);

// Delete a user role (Admin only)
router.delete('/:id', eliminarUserRol);

module.exports = router;