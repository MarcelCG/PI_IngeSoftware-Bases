const express = require('express');
const router = express.Router();
const UsuariosController = require('../../controllers/usuarioController/usuariosController');

// Definir rutas para telefonos de usuarios
router.get('/', UsuariosController.getAllUsuarios);
router.post('/', UsuariosController.createUsuario);
router.get('/byCedula/:cedula', UsuariosController.getUsuarioByCedula);
router.get('/infoUser/:cedula', UsuariosController.infoUser);
router.post('/login', UsuariosController.loginUser);
router.get('/test', (req, res) => {
    res.status(200).send('Conexión exitosa');
});

module.exports = router;