const Empresa = require('../models/empresasModel');

// Obtener todas las empresas
async function getAllEmpresas(req, res) {
  try {
    const empresas = await Empresa.getAll();
    res.status(200).json(empresas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear una nueva política
async function createEmpresa(req, res) {
  try {
    const {
      cedula_juridica,
      nombre,
      cedula_empleador
    } = req.body;

    // Llama a la función createPolitica que inserta en la tabla "Politica"
    const success = await Empresa.createPolitica(
     cedula_juridica,
      nombre,
      cedula_empleador
    );

    if (success) {
      res.status(201).json({ message: 'added Empresa' });
    } else {
      res.status(500).json({ message: 'Error adding empresa' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getEmpresaByCedula(req, res) {
  console.log("hola");
  try {
    const { cedula_juridica } = req.params;
    console.log("cedula juridica: ");
    console.log(cedula_juridica);
    const empresa = await Empresa.getEmpresaByCedula(cedula_juridica);

    if (empresa !== null) {
      res.status(200).json(empresa);
    } else {
      res.status(404).json({ error: 'Empresa no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllEmpresas,
  createEmpresa,
  getEmpresaByCedula,
};

