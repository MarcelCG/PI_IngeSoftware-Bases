const express = require('express');
const router = express.Router();
const EmpresaController = require('../../controllers/empresaController/empresaController');

// Definir rutas para politicas
router.get('/', EmpresaController.getAllEmpresas);
router.post('/', EmpresaController.createEmpresa);
router.get('/byCedula/:cedula_juridica', EmpresaController.getEmpresaByCedula);
router.get('/byCedulaEmpleador/:cedula_empleador', EmpresaController.getEmpresaByCedulaEmpleador);
router.get('/porCedulaEmpleado/:cedula_empleado', EmpresaController.obtenerEmpresaPorCedulaEmpleado);
router.get('/getEmpresaInfo/:empresa', EmpresaController.getEmpresaInfo);
router.put('/editar/:cedula_juridica', EmpresaController.editarEmpresa);

module.exports = router;
