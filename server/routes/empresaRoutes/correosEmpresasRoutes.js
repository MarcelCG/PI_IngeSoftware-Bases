const express = require('express');
const router = express.Router();
const CorreosEmpresasController = require('../../controllers/empresaController/correosEmpresasController');

// Definir rutas para correos de empresas
router.get('/', CorreosEmpresasController.getAllCorreos);
router.post('/', CorreosEmpresasController.createCorreo);
router.get('/byEmpresa/:cedula_empresa', CorreosEmpresasController.getCorreosByEmpresa)

module.exports = router;