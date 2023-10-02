const express = require('express');
const router = express.Router();
const registroEmpleadoController = require('../controllers/registroEmpleadoController');

router.post('/', registroEmpleadoController.RegistrarEmpleado);

module.exports = router;