const express = require('express');
const router = express.Router();

// Importa rutas
const politicasRoutes = require('./politicasRoutes')
const empleadoRoutes = require('./empleadoRoutes')
const solicitudRoutes = require('./solicitudRoutes')


// Asocia las rutas
router.use('/politicas', politicasRoutes);
router.use('/empleados', empleadoRoutes);
router.use('/solicitudes', solicitudRoutes);

module.exports = router;
