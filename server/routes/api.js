const express = require('express');
const router = express.Router();

// Importa rutas
const politicasRoutes = require('./politicasRoutes')
const empleadoRoutes = require('./empleadoRoutes')
const solicitudRoutes = require('./solicitudRoutes')
const jornadaRoutes = require('./jornadaRoutes')
const libresRoutes = require('./libresRoutes')


// Asocia las rutas
router.use('/politicas', politicasRoutes);
router.use('/empleados', empleadoRoutes);
router.use('/solicitudes', solicitudRoutes);
router.use('/jornadas', jornadaRoutes);
router.use('/libres', libresRoutes);

module.exports = router;
