const express = require('express');
const router = express.Router();

// Rutas
//-----usuarios-----//
const UsuariosRoutes = require('./usuarioRoutes/usuariosRoutes');
const registroRoutes = require('./usuarioRoutes/registroRoutes');
const CorreosUsuarioRoutes = require('./usuarioRoutes/correosUsuarioRoutes');
router.use('/usuario', UsuariosRoutes);
router.use('/registro', registroRoutes);
router.use('/correoUsuario', CorreosUsuarioRoutes);

//-----empleador-----//
const EmpleadorRoutes = require('./usuarioRoutes/empleadorRoutes/empleadorRoutes');;
const TelefonosUsuarioRoutes = require('./usuarioRoutes/telefonosUsuarioRoutes');
router.use('/empleador', EmpleadorRoutes);
router.use('/telUsuario', TelefonosUsuarioRoutes);

//-----empleado------//
const editarEmpleadoRutas = require('./usuarioRoutes/empleadoRoutes/editarEmpleadoRutas');
const empleadoRoutes = require('./usuarioRoutes/empleadoRoutes/empleadoRoutes');
const registroEmpleado = require('./usuarioRoutes/empleadoRoutes/registroEmpleadoRoutes');
router.use('/registrarEmpleado', registroEmpleado);
router.use('/empleados', empleadoRoutes);
router.use('/editarEmpleado', editarEmpleadoRutas);

//-----empresa-----//
const EmpresasRoutes = require('./empresaRoutes/empresaRoutes');
const correosEmpresaRoutes = require('./empresaRoutes/correosEmpresasRoutes');
const telefonosEmpresaRoutes = require('./empresaRoutes/telefonosEmpresaRoutes');
router.use('/empresa', EmpresasRoutes);
router.use('/telEmpresa', telefonosEmpresaRoutes);
router.use('/correoEmpresa', correosEmpresaRoutes);

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


module.exports = router;
