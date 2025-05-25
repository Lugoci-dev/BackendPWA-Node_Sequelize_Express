const express = require('express');
const router = express.Router();
const { verificarToken, verificarRol } = require('../middlewares/auth');
const {
  registroUsuario,
  loginUsuario,
  obtenerPerfilUsuario,
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarioPorId
} = require('../controllers/tbd_userController');

// Registro y login públicos
router.post('/register', registroUsuario);
router.post('/login', loginUsuario);

// Perfil autenticado
router.get('/profile', verificarToken, obtenerPerfilUsuario);

// ADMIN: gestión de usuarios
// router.get('/', verificarToken, verificarRol(['Admin']), obtenerUsuarios);
router.get('/', obtenerUsuarios);

router.post('/',verificarToken, verificarRol(['Admin']), crearUsuario);

// Actualizar un usuario (Solo admin)
// router.put('/:id',verificarToken, verificarRol(['Admin']), actualizarUsuario);
router.put('/:id', actualizarUsuario);

// Eliminar un usuario (Solo admin)
router.delete('/:id',verificarToken, verificarRol(['Admin']), eliminarUsuario);

// Obtener un usuario por ID (Solo admin)
// router.get('/:id',verificarToken, verificarRol(['Admin']), obtenerUsuarioPorId);
router.get('/:id', obtenerUsuarioPorId);

module.exports = router;

// // routes/userRoutes.js
// const express = require('express');
// const { verificarToken, verificarRol } = require('../middlewares/auth');
// const {
//   obtenerUsuarios,
//   registroUsuario,
//   crearUsuario,
//   loginUsuario,
//   obtenerPerfilUsuario,
//   obtenerUsuarioPorId,
//   actualizarUsuario,
//   eliminarUsuario
// } = require('../controllers/tbd_userController');

// const router = express.Router();

// // Obtener todos los usuarios (Solo admin)
// // router.get('/', verificarToken, verificarRol([1]), obtenerUsuarios);
// router.get('/', obtenerUsuarios);

// // Obtener un usuario por ID (Solo admin)
// router.get('/:id', obtenerUsuarioPorId);

// // Registro de usuarios (Abierto a todos)
// router.post('/register', registroUsuario);

// // Login de usuarios (Abierto a todos)
// router.post('/login', loginUsuario);

// // Crear un nuevo usuario (Solo admin)
// // router.post('/', verificarToken, verificarRol([1]), crearUsuario);
// router.post('/', crearUsuario);

// // Obtener el perfil del usuario autenticado
// router.get('/profile', verificarToken, obtenerPerfilUsuario);

// // Actualizar un usuario (Solo admin)
// router.put('/:id', actualizarUsuario);

// // Eliminar un usuario (Solo admin)
// router.delete('/:id', eliminarUsuario);

// module.exports = router;