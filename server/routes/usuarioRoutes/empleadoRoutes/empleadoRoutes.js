const express = require('express');
const router = express.Router();
const EmpleadoController = require('../../../controllers/usuarioController/Empleado/empleadoController');

// Definir rutas para empleados
router.get('/', EmpleadoController.getAllEmpleados);
router.get('/allByEmpresa/:cedula_empresa', EmpleadoController.getAllEmpleadosByEmpresa);
router.post('/', EmpleadoController.createEmpleado);
router.get('/byCedula/:cedula_empleado', EmpleadoController.getEmpleadoByCedula);
router.get('/viewByCedula/:cedula_empleado', EmpleadoController.getEmpleadoConCedulaYEmpresa);
router.get('/byEmpresa/:cedula_empresa', EmpleadoController.getEmpleadoByEmpresa);
router.get('/buscarEmpleado/:cedula_empleado/:cedula_empresa', EmpleadoController.getEmpleadoByCedulaAndEmpresa)


module.exports = router;