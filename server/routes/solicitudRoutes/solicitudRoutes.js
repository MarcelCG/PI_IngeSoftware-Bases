const express = require('express');
const router = express.Router();
const SolicitudController = require('../../controllers/solicitudController/solicitudController');

// Definir rutas para solicitudes
router.get('/', SolicitudController.getAllSolicitudes);
router.post('/', SolicitudController.createSolicitud);
router.get('/byId/:id', SolicitudController.getSolicitudById)
router.get('/byCedula/:cedula_empleado', SolicitudController.getSolicitudByCedula);
router.get('/byEmpresa/:cedula_empresa', SolicitudController.getSolicitudByEmpresa);
router.get('/searchSolicitudes/:cedula_empleado/:cedula_empresa', SolicitudController.getSolicitudByCedulaAndEmpresa)
router.post('/aprobar/:id', SolicitudController.aprobarSolicitud);
router.get('/rechazar/:id', SolicitudController.rechazarSolictud);

module.exports = router;