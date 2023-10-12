const express = require('express');
const router = express.Router();
const LibresController = require('../../controllers/libresController/libresController');

// Definir rutas para libres
router.get('/', LibresController.getAllLibres);
router.post('/', LibresController.createLibre);
router.get('/byEmpleado/:cedula_empleado', LibresController.getLibresByEmpleado);
router.get('/byPolitica/:titulo_politica/:cedula_empresa', LibresController.getLibresByPolitica);
router.get('/searchLibres/:cedula_empleado/:titulo_politica/:cedula_empresa', LibresController.getLibresByEmpleadoAndPolitica)

module.exports = router;