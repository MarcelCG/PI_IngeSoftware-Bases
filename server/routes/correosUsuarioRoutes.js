const express = require('express');
const router = express.Router();
const CorreosUsuarioController = require('../controllers/correosUsuarioController');

// Definir rutas para correos de empresas
router.get('/', CorreosUsuarioController.getAllCorreosUsuarios);
router.post('/', CorreosUsuarioController.createCorreoUsuario);
router.get('/byUsuario/:cedula_usuario', CorreosUsuarioController.getCorreosUsuarioByCedula)

module.exports = router;