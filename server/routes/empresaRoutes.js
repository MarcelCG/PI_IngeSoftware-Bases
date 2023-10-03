const express = require('express');
const router = express.Router();
const EmpresaController = require('../controllers/empresaController');

// Definir rutas para politicas
router.get('/', EmpresaController.getAllEmpresas);
router.post('/', EmpresaController.createEmpresa);
router.get('/byCedula/:cedula_juridica', EmpresaController.getEmpresaByCedula);
router.get('/byCedulaEmpleador/:cedula_empleador', EmpresaController.getEmpresaByCedulaEmpleador);

module.exports = router;
