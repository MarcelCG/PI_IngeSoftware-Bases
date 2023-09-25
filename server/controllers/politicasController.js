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

// Crear una nueva política
async function createPolitica(req, res) {
  try {
    const {
      titulo,
      cedula_empresa,
      periodo,
      fecha_inicio,
      fecha_final,
      inicia_desde_contrato,
      horas_a_dar,
      incrementativo,
      acumulativo,
      activo,
    } = req.body;

    // Llama a la función createPolitica que inserta en la tabla "Politica"
    const success = await Politica.createPolitica(
      titulo,
      cedula_empresa,
      periodo,
      fecha_inicio,
      fecha_final,
      inicia_desde_contrato,
      horas_a_dar,
      incrementativo,
      acumulativo,
      activo
    );

    if (success) {
      res.status(201).json({ message: 'Política creada exitosamente' });
    } else {
      res.status(500).json({ message: 'No se pudo crear la política' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
  getAllPoliticas,
  createPolitica,
};