const express = require('express');
const router = express.Router();
const reportesEmpleadoControlador = require('../../../controllers/reportesControlador/reportesEmpleadoControlador/reportesEmpleadoControlador');

router.get('/diasUsados/:cedula_empleado', reportesEmpleadoControlador.reporteDiasUsados);
router.get('/diasAcumulados/:cedula_empleado', reportesEmpleadoControlador.reporteDiasAcumulados);

module.exports = router;