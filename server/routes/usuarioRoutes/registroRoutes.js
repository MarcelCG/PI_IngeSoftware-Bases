const express = require('express');
const router = express.Router();
const registroController = require('../../controllers/usuarioController/registroController');

router.post('/', registroController.Registrarse);

module.exports = router;