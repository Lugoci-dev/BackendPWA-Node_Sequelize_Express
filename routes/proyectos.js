const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');

router.get('/', proyectoController.getAll);   
router.get('/:id', proyectoController.getById);  
router.post('/', proyectoController.create);   
router.put('/:id', proyectoController.update);  
router.delete('/:id', proyectoController.delete); 

module.exports = router;
