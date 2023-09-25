const Politica = require('../models/politicasModel');

// Obtener todas las politicas
async function getAllPoliticas(req, res) {
  try {
    const politicas = await Politica.getAll();
    res.status(200).json(politicas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
