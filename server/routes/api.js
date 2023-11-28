const express = require('express');
const router = express.Router();

// Rutas
//-----usuarios-----//
const UsuariosRoutes = require('./usuarioRoutes/usuariosRoutes');
const registroRoutes = require('./usuarioRoutes/registroRoutes');
router.use('/usuario', UsuariosRoutes);
router.use('/registro', registroRoutes);

//-----empleador-----//
const EmpleadorRoutes = require('./usuarioRoutes/empleadorRoutes/empleadorRoutes');

const editarEmpleadorRoutes = require('./usuarioRoutes/empleadorRoutes/editarEmpleadorRoutes');
router.use('/empleador', EmpleadorRoutes);
router.use('/editarEmpleador', editarEmpleadorRoutes);

//-----empleado------//
const editarEmpleadoRutas = require('./usuarioRoutes/empleadoRoutes/editarEmpleadoRutas');
const empleadoRoutes = require('./usuarioRoutes/empleadoRoutes/empleadoRoutes');
const registroEmpleado = require('./usuarioRoutes/empleadoRoutes/registroEmpleadoRoutes');
router.use('/registrarEmpleado', registroEmpleado);
router.use('/empleados', empleadoRoutes);
router.use('/editarEmpleado', editarEmpleadoRutas);

//-----empresa-----//
const EmpresasRoutes = require('./empresaRoutes/empresaRoutes');
router.use('/empresa', EmpresasRoutes);

//-----solicitudes-----//
const solicitudRoutes = require('./solicitudRoutes/solicitudRoutes');
router.use('/solicitudes', solicitudRoutes);

//-----jornada-----//
const jornadaRoutes = require('./jornadaRoutes/jornadaRoutes');
router.use('/jornadas', jornadaRoutes);

//-----libres-----//
const libresRoutes = require('./libresRoutes/libresRoutes');
router.use('/libres', libresRoutes);

//-----politicas-----//
const politicasRoutes = require('./politicaRoutes/politicasRoutes');
router.use('/politicas', politicasRoutes);

//-----reportes-----//
const reportesEmpleadorRutas = require('./reportesRutas/reportesEmpleadorRutas/reportesEmpleadorRutas');
router.use('/reportesEmpleador', reportesEmpleadorRutas);

module.exports = router;
