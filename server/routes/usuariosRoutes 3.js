const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/usuariosController');

// Definir rutas para telefonos de usuarios
router.get('/', UsuariosController.getAllUsuarios);
router.post('/', UsuariosController.createUsuario);
router.get('/byCedula/:cedula', UsuariosController.getUsuarioByCedula);

module.exports = router;