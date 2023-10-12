const express = require('express');
const router = express.Router();
const TelefonosUsuariosController = require('../../controllers/usuarioController/telefonosUsuarioController');

// Definir rutas para telefonos de usuarios
router.get('/', TelefonosUsuariosController.getAllTelefonosUsuarios);
router.post('/', TelefonosUsuariosController.createTelefonoUsuario);
router.get('/byUsuario/:cedula_usuario', TelefonosUsuariosController.getTelefonosByUsuario);

module.exports = router;