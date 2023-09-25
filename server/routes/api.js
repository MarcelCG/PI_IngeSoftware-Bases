const express = require('express');
const router = express.Router();

// Importa rutas
const politicasRoutes = require('./politicasRoutes')


// Asocia las rutas
router.use('/politicas', politicasRoutes);

module.exports = router;
