const express = require('express');
const router = express.Router();
const EmpleadorController = require('../../../controllers/usuarioController/Empleador/empleadorController');

// Rutas para empleadores
router.get('/', EmpleadorController.getAll);
router.get('/byCedula/:cedula_empleador', EmpleadorController.getByCedula);
router.post('/editar')

module.exports = router;
