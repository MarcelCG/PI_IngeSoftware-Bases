const express = require('express');
const router = express.Router();
const JornadaController = require('../../controllers/jornadaController/jornadaController');

// Definir rutas para jornadas
router.get('/', JornadaController.getAllJornadas);
router.post('/', JornadaController.createJornada);
router.get('/searchJornada/:cedula_empleado', JornadaController.getJornadaByCedula);

module.exports = router;