const express = require('express');
const router = express.Router();
const PoliticaController = require('../controllers/politicasController');

// Definir rutas para politicas
router.get('/', PoliticaController.getAllPoliticas);
router.post('/', PoliticaController.createPolitica);
router.get('/byTitulo/:titulo', PoliticaController.getPoliticaByTitulo);
router.get('/byCedula/:cedula_empresa', PoliticaController.getPoliticaByCedulaEmpresa);
router.get('/searchPolitica/:titulo/:cedula_empresa', PoliticaController.getPoliticaByTituloAndCedula)

module.exports = router;