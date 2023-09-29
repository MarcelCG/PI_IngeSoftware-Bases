const Empleador = require('../models/empleadorModel');

// Obtener datos de un Empleador por su cédula
async function getEmpleadorByCedula(req, res) {
  try {
    const { cedula_empleador } = req.params;
    const empleador = await Empleador.getEmpleadorDataByCedula(cedula_empleador);

    if (empleador !== null) {
      res.status(200).json(empleador);
    } else {
      res.status(404).json({ error: 'Empleador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getEmpleadorByCedula,
};

