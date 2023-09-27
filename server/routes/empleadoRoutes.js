const express = require('express');
const router = express.Router();
const EmpleadoController = require('../controllers/empleadoController');

// Definir rutas para empleados
router.get('/', EmpleadoController.getAllEmpleados);
router.post('/', EmpleadoController.createEmpleado);
router.get('/byCedula/:cedula_empleado', EmpleadoController.getEmpleadoByCedula);
router.get('/byEmpresa/:cedula_empresa', EmpleadoController.getEmpleadoByEmpresa);
router.get('/searchEmpleado/:cedula_empleado/:cedula_empresa', EmpleadoController.getEmpleadoByCedulaAndEmpresa)

module.exports = router;