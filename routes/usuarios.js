
const express = require('express');
const { verificarToken, verificarRol } = require('../middlewares/auth');
const {
    getUsuarios,
    registroUsuario,
    createUsuario,
    loginUsuario,
    getPerfilUsuario,
    deleteUsuario,
    getUsuarioById, // Nueva ruta
    updateUsuario,  // Nueva ruta
} = require('../controllers/usuariosController');

const router = express.Router();

// Obtener todos los usuarios (Solo admin)
router.get('/', verificarToken, verificarRol([1]), getUsuarios);

// Crear un nuevo usuario (Solo admin)
router.post('/', verificarToken, verificarRol([1]), createUsuario);

// Registro de clientes (Abierto a todos)
router.post('/registro', registroUsuario);

// Login de usuario (Abierto a todos)
router.post('/login', loginUsuario);

// Obtener perfil del usuario autenticado (Todos los roles)
router.get('/perfil', verificarToken, getPerfilUsuario);

router.delete('/:id', verificarToken, verificarRol([1]), deleteUsuario);

router.get('/:id', verificarToken, verificarRol([1]), getUsuarioById); // Nueva ruta

router.put('/:id', verificarToken, verificarRol([1]), updateUsuario); // Nueva ruta

module.exports = router;



// const express = require('express');
// const { Usuario } = require('../models');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { verificarToken, verificarRol } = require('../middlewares/auth');
// const router = express.Router();

// // Obtener todos los usuarios (Solo admin)
// router.get('/', verificarToken, verificarRol([1]), async (req, res) => {
//     try {
//         const usuarios = await Usuario.findAll();
//         res.json(usuarios);
//     } catch (error) {
//         res.status(500).json({ error: 'Error al obtener los usuarios.' });
//     }
// });

// // Crear un nuevo usuario (Sin restricciones)
// router.post('/', async (req, res) => {
//     try {
//         const { nombre, email, password, rolId } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const nuevoUsuario = await Usuario.create({
//             nombre,
//             email,
//             password: hashedPassword,
//             rolId,
//         });
//         res.status(201).json(nuevoUsuario);
//     } catch (error) {
//         res.status(400).json({ error: 'Error al crear el usuario.' });
//     }
// });

// // Login de usuario (Sin restricciones)
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const usuario = await Usuario.findOne({ where: { email } });

//         if (!usuario) {
//             return res.status(404).json({ error: 'Usuario no encontrado' });
//         }

//         const isValid = await bcrypt.compare(password, usuario.password);
//         if (!isValid) {
//             return res.status(401).json({ error: 'Contraseña incorrecta' });
//         }

//         const token = jwt.sign(
//             { id: usuario.id, rol: usuario.rolId },
//             process.env.JWT_SECRET || 'secreto',
//             { expiresIn: '1h' }
//         );

//         res.json({ token });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Obtener perfil del usuario autenticado (Todos los roles)
// router.get('/perfil', verificarToken, async (req, res) => {
//     try {
//         const usuario = await Usuario.findByPk(req.user.id);
//         res.json(usuario);
//     } catch (error) {
//         res.status(500).json({ error: 'Error al obtener el perfil del usuario.' });
//     }
// });

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const { Usuario } = require('../models');

// router.get('/', async (req, res) => {
//     try {
//         const usuarios = await Usuario.findAll();
//         res.json(usuarios);
//     } catch (error) {
//         res.status(500).json({ error: 'Error al obtener los usuarios.' });
//     }
// });

// router.post('/', async (req, res) => {
//     try {
//         const nuevoUsuario = await Usuario.create(req.body);
//         res.status(201).json(nuevoUsuario);
//     } catch (error) {
//         res.status(400).json({ error: 'Error al crear el usuario.' });
//     }
// });

// router.put('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const [updated] = await Usuario.update(req.body, { where: { id } });
//         if (updated) {
//             const usuarioActualizado = await Usuario.findOne({ where: { id } });
//             res.json(usuarioActualizado);
//         } else {
//             res.status(404).json({ error: 'Usuario no encontrado.' });
//         }
//     } catch (error) {
//         res.status(400).json({ error: 'Error al actualizar el usuario.' });
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deleted = await Usuario.destroy({ where: { id } });
//         if (deleted) {
//             res.json({ mensaje: 'Usuario eliminado con éxito.' });
//         } else {
//             res.status(404).json({ error: 'Usuario no encontrado.' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Error al eliminar el usuario.' });
//     }
// });

// module.exports = router;




// const express = require('express');
// const { Usuario } = require('../models');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const router = express.Router();

// router.get('/', async (req, res) => {
//     try {
//         const usuarios = await Usuario.findAll();
//         res.json(usuarios);
//     } catch (error) {
//         res.status(500).json({ error: 'Error al obtener los usuarios.' });
//     }
// });

// router.post('/', async (req, res) => {
//     try {
//         const { nombre, email, password, rolId } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const nuevoUsuario = await Usuario.create({
//             nombre,
//             email,
//             password: hashedPassword,
//             rolId,
//         });
//         res.status(201).json(nuevoUsuario);
//     } catch (error) {
//         res.status(400).json({ error: 'Error al crear el usuario.' });
//     }
// });

// router.put('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const [updated] = await Usuario.update(req.body, { where: { id } });
//         if (updated) {
//             const usuarioActualizado = await Usuario.findOne({ where: { id } });
//             res.json(usuarioActualizado);
//         } else {
//             res.status(404).json({ error: 'Usuario no encontrado.' });
//         }
//     } catch (error) {
//         res.status(400).json({ error: 'Error al actualizar el usuario.' });
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deleted = await Usuario.destroy({ where: { id } });
//         if (deleted) {
//             res.json({ mensaje: 'Usuario eliminado con éxito.' });
//         } else {
//             res.status(404).json({ error: 'Usuario no encontrado.' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Error al eliminar el usuario.' });
//     }
// });

// // Nueva ruta: login
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const usuario = await Usuario.findOne({ where: { email } });

//         if (!usuario) {
//             return res.status(404).json({ error: 'Usuario no encontrado' });
//         }

//         const isValid = await bcrypt.compare(password, usuario.password);
//         if (!isValid) {
//             return res.status(401).json({ error: 'Contraseña incorrecta' });
//         }

//         const token = jwt.sign(
//             { id: usuario.id, rol: usuario.rolId },
//             process.env.JWT_SECRET || 'secreto',
//             { expiresIn: '1h' }
//         );

//         res.json({ token });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// module.exports = router;
