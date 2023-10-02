const express = require('express');
const router = express.Router();

// Importa rutas
const politicasRoutes = require('./politicasRoutes')
const empleadoRoutes = require('./empleadoRoutes')
const solicitudRoutes = require('./solicitudRoutes')
const jornadaRoutes = require('./jornadaRoutes')
const libresRoutes = require('./libresRoutes')
const telefonosEmpresaRoutes = require('./telefonosEmpresaRoutes')
const correosEmpresaRoutes = require('./correosEmpresasRoutes')
const EmpresasRoutes = require('./empresaRoutes')
const TelefonosUsuarioRoutes = require('./telefonosUsuarioRoutes')
const CorreosUsuarioRoutes = require('./correosUsuarioRoutes')
const UsuariosRoutes = require('./usuariosRoutes')


// Asocia las rutas
router.use('/politicas', politicasRoutes);
router.use('/empleados', empleadoRoutes);
router.use('/solicitudes', solicitudRoutes);
router.use('/jornadas', jornadaRoutes);
router.use('/libres', libresRoutes);
router.use('/telEmpresa', telefonosEmpresaRoutes);
router.use('/correoEmpresa', correosEmpresaRoutes);
router.use('/empresa', EmpresasRoutes);
router.use('/telUsuario', TelefonosUsuarioRoutes);
router.use('/correoUsuario', CorreosUsuarioRoutes);
router.use('/usuario', UsuariosRoutes);

module.exports = router;
