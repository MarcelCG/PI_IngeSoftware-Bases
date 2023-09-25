const express = require('express');
const router = express.Router();
const PoliticaController = require('../controllers/politicasController');

// Definir rutas para politicas
router.get('/', PoliticaController.getAllPoliticas);

module.exports = router;