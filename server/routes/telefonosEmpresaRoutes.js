const express = require('express');
const router = express.Router();
const TelefonosEmpresaController = require('../controllers/telefonosEmpresaController');

// Definir rutas para telefonos de empresa
router.get('/', TelefonosEmpresaController.getAllTelefonosEmpresas);
router.post('/', TelefonosEmpresaController.createTelefonoEmpresa);
router.get('/byEmpresa/:cedula_empresa', TelefonosEmpresaController.getTelefonosByEmpresa)

module.exports = router;