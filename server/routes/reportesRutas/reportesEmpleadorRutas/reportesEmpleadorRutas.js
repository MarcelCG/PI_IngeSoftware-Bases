const express = require('express');
const router = express.Router();
const ReporteController = require('../../../controllers/reportesControlador/reportesEmpleadorControlador/reportesEmpleadorControlador');

// Definir rutas para solicitudes
router.get('/reporteDiasSolicitadosPorPolitica/:cedula_empresa', ReporteController.obtenerInfoReporteDiasSolicitadosPorPolitica)

module.exports = router;