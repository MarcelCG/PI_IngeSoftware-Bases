const express = require('express');
const router = express.Router();
const PerfilController = require('../../controllers/perfilController/perfilController');

// Definir rutas para politicas
router.post('/editarPerfil', PerfilController.editarPerfil);

module.exports = router;