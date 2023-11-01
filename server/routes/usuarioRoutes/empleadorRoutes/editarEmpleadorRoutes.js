const express = require('express');
const router = express.Router();
const editarEmpleadoController = require('../../../controllers/usuarioController/Empleador/editarEmpleadorController');

router.post('/', editarEmpleadoController.EditarEmpleador);

module.exports = router;