const express = require('express');
const router = express.Router();
const EmpleadorController = require('../controllers/empleadorController');

// Rutas para empleadores
router.get('/', EmpleadorController.getAllEmpleadores);
router.get('/:cedula_empleador', EmpleadorController.getEmpleadorByCedula);

module.exports = router;
