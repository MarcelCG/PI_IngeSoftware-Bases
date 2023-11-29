const express = require('express');
const router = express.Router();
const ReporteController = require('../../../controllers/reportesControlador/reportesEmpleadorControlador/reportesEmpleadorControlador');

// Definir rutas para solicitudes
router.get('/reporteDiasSolicitadosPorPolitica/:cedula_empresa', ReporteController.obtenerInfoReporteDiasSolicitadosPorPolitica);
router.get('/reporteDiasGeneradosPorPolitica/:cedula_empresa', ReporteController.obtenerInfoReporteDiasGeneradosPorPolitica);
router.get('/reporteDiasGastadosPorEmpleadoPorPolitica/:cedula_empresa', ReporteController.obtenerinfoReporteDiasGastadosPorEmpleadoPorPolitica);

module.exports = router;