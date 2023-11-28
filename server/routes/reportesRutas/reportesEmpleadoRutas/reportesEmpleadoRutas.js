const express = require('express');
const router = express.Router();
const reportesEmpleadoControlador = require('../../../controllers/reportesControlador/reportesEmpleadoControlador/reportesEmpleadoControlador');

router.get('/diasUsados/:cedula_empleado', reportesEmpleadoControlador.reporteDiasUsados);
router.get('/diasAcumulados/:cedula_empleado', reportesEmpleadoControlador.reporteDiasAcumulados);
router.get('/dashboard/:cedula_empleado', reportesEmpleadoControlador.reporteDashboard);

module.exports = router;