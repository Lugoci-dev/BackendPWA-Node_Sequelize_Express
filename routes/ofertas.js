const express = require('express');
const { verificarToken, verificarRol } = require('../middlewares/auth');
// const { getOfertas, createOferta, updateOferta, deleteOferta } = require('../controllers/ofertasController');
const ofertasController = require('../controllers/ofertasController');
const router = express.Router();


router.get('/',  verificarToken, verificarRol([1, 2]), ofertasController.getAllOfertas);

router.post('/',  verificarToken, verificarRol([1]), ofertasController.createOferta);

router.get('/:id', verificarToken, verificarRol([1, 2]) , ofertasController.getOfertaById);

router.put('/:id', verificarToken, verificarRol([1]), ofertasController.updateOferta);

router.delete('/:id',  verificarToken, verificarRol([1]), ofertasController.deleteOferta);


// router.get('/proyecto/:projectId', ofertasController.getOfertasByProyecto);

// Ruta para listar ofertas (acceso para ambos roles: admin y cliente)
// router.get('/', verificarToken, verificarRol([1, 2]), getOfertas);

// // Ruta para crear una oferta (solo admin)
// router.post('/', verificarToken, verificarRol([1]), createOferta);

// // Ruta para actualizar una oferta (solo admin)
// router.put('/:id', verificarToken, verificarRol([1]), updateOferta);

// // Ruta para eliminar una oferta (solo admin)
// router.delete('/:id', verificarToken, verificarRol([1]), deleteOferta);


module.exports = router;