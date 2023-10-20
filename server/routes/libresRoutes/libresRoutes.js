const express = require('express');
const router = express.Router();
const LibresController = require('../../controllers/libresController/libresController');
const LibresServicio = require('../../servicios/libresServicios/libresServicios');


// Definir rutas para libres
router.get('/', LibresController.getAllLibres);
router.post('/', LibresController.createLibre);
router.get('/byEmpleado/:cedula_empleado', LibresController.getLibresByEmpleado);
router.get('/byPolitica/:titulo_politica/:cedula_empresa', LibresController.getLibresByPolitica);
router.get('/searchLibres/:cedula_empleado/:titulo_politica/:cedula_empresa', LibresController.getLibresByEmpleadoAndPolitica);

router.get('/actualizarTodos/:cedula_empresa', LibresServicio.actualizarTodos);
//http://localhost:4223/api/libres/actualizarTodos/1-234-567890

module.exports = router;