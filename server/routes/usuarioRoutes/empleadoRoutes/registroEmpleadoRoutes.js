const express = require('express');
const router = express.Router();
const registroEmpleadoController = require('../../../controllers/usuarioController/Empleado/registroEmpleadoController');

router.post('/', registroEmpleadoController.RegistrarEmpleado);

module.exports = router;