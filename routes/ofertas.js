const express = require('express');
const router = express.Router();
const ofertasController = require('../controllers/ofertasController');

router.get('/', ofertasController.getAllOfertas);
router.post('/', ofertasController.createOferta);
router.get('/:id', ofertasController.getOfertaById);
router.put('/:id', ofertasController.updateOferta);
router.delete('/:id', ofertasController.deleteOferta);
router.get('/proyecto/:projectId', ofertasController.getOfertasByProyecto);

module.exports = router;