const express = require('express');
const router = express.Router();
const EmpleadorController = require('../controllers/empleadorController');

// Rutas para empleadores
router.get('/', EmpleadorController.getAll);
router.get('/byCedula/:cedula_empleador', EmpleadorController.getByCedula);

module.exports = router;
