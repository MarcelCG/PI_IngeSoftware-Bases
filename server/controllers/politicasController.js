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

    // Verifica si ya existe un título
    const tituloExists = await checkTituloExistence(titulo);

    if (tituloExists) {
      res.status(400).json({ error: 'El título ya existe' });
      return;
    }

    // Verifica si la empresa existe
    const empresaExists = await checkEmpresaExistence(cedula_empresa);

    if (!empresaExists) {
      res.status(400).json({ error: 'La empresa no existe' });
      return;
    }

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

// Controlador para obtener una política por su título
async function getPoliticaByTitulo(req, res) {
  try {
    const { titulo } = req.params; // Obtiene el título de los parámetros de la URL
    // Llama a la función getByTitulo en el modelo de Política
    const politica = await Politica.getByTitulo(titulo);

    if (politica !== null) {
      // Si se encontró una política con ese título, la retornamos
      res.status(200).json(politica);
    } else {
      // Si no se encontró ninguna política con ese título, respondemos con un mensaje de error
      res.status(404).json({ error: 'Política no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPoliticaByCedulaEmpresa(req, res) {
  try {
    const { cedula_empresa } = req.params;
    
    // Llama a la función que busca políticas por cedula_empresa
    const politicas = await Politica.getByCedulaEmpresa(cedula_empresa);

    if (politicas.length > 0) {
      res.status(200).json(politicas);
    } else {
      res.status(404).json({ message: 'No se encontraron políticas para esta cedula_empresa' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPoliticaByTituloAndCedula(req, res) {
  try {
    const { titulo, cedula_empresa } = req.params;

    // Llama a la función getByTituloAndCedula en el modelo de Política
    const politica = await Politica.getByTituloAndCedula(titulo, cedula_empresa);

    if (politica !== null) {
      // Si se encontró una política con ese título y cédula de empresa, la retornamos
      res.status(200).json(politica);
    } else {
      // Si no se encontró ninguna política con esos criterios, respondemos con un mensaje de error
      res.status(404).json({ error: 'Política no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllPoliticas,
  createPolitica,
  getPoliticaByTitulo,
  getPoliticaByCedulaEmpresa,
  getPoliticaByTituloAndCedula,
};