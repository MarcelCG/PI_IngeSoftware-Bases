const express = require('express');
const router = express.Router();
const reportesEmpleadoControlador = require('../../../controllers/reportesControlador/reportesEmpleadoControlador/reportesEmpleadoControlador');

router.get('/diasUsados/:cedula_empleado', reportesEmpleadoControlador.reporteDiasUsados);

module.exports = router;