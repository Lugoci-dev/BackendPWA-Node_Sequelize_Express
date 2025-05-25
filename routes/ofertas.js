const express = require('express');
const { verificarToken, verificarRol } = require('../middlewares/auth');
// const { getOfertas, createOferta, updateOferta, deleteOferta } = require('../controllers/ofertasController');
const ofertasController = require('../controllers/ofertasController');
const router = express.Router();


// router.get('/',  verificarToken, verificarRol([1, 2]), ofertasController.getAllOfertas);
router.get('/', ofertasController.getAllOfertas);

router.post('/',  verificarToken, verificarRol([1]), ofertasController.createOferta);

router.get('/:id', verificarToken, verificarRol([1, 2]) , ofertasController.getOfertaById);

router.put('/:id', verificarToken, verificarRol([1]), ofertasController.updateOferta);

router.delete('/:id',  verificarToken, verificarRol([1]), ofertasController.deleteOferta);


module.exports = router;