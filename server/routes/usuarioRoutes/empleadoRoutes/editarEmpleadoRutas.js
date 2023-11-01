const express = require('express');
const router = express.Router();
const editarEmpleadoController = require('../../../controllers/usuarioController/Empleado/editarEmpleadoController');

router.post('/', editarEmpleadoController.EditarEmpleado);

module.exports = router;