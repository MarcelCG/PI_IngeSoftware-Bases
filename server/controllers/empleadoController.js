const Empleado = require('../models/empleadoModel');

// Obtener todos los empleados
async function getAllEmpleados(req, res) {
    try {
      const empleados = await Empleado.getAll();
      res.status(200).json(empleados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo empleado
async function createEmpleado(req, res) {
  try {
    const {
      cedula_empleado,
      cedula_empresa,
      rol,
      fecha_contratacion,
    } = req.body;

    // Llama a la función createEmpleado que inserta en la tabla "Empleado"
    const success = await Empleado.createEmpleado(
      cedula_empleado,
      cedula_empresa,
      rol,
      fecha_contratacion
    );

    if (success) {
      res.status(201).json({ message: 'Empleado creado exitosamente' });
    } else {
      res.status(500).json({ message: 'No se pudo crear el empleado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Otros controladores para operaciones adicionales con Empleados pueden ser agregados aquí

module.exports = {
  getAllEmpleados,
  createEmpleado,
};
