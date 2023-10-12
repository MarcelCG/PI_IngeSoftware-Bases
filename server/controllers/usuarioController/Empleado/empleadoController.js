const Empleado = require('../../../models/usuarioModel/Empleado/empleadoModel');

// Obtener todos los empleados
async function getAllEmpleados(req, res) {
    try {
      const empleados = await Empleado.getAll();
      res.status(200).json(empleados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

// Obtener todos los empleados
async function getAllEmpleadosByEmpresa(req, res) {
  try {
    const { cedula_empresa } = req.params; // Obtiene la cedula de los parámetros de la URL
    const empleados = await Empleado.getAllByEmpresa(cedula_empresa);
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

// Controlador para obtener un empleado por su cedula
async function getEmpleadoByCedula(req, res) {
    try {
      const { cedula_empleado } = req.params; // Obtiene la cedula de los parámetros de la URL
      // Llama a la función getByCedula en el modelo de Empleado
      const empleado = await Empleado.getByCedula(cedula_empleado);
  
      if (empleado !== null) {
        // Si se encontró un empleado, lo retornamos
        res.status(200).json(empleado);
      } else {
        // Si no se encontró ningun empleado, respondemos con un mensaje de error
        res.status(404).json({ error: 'Empleado no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

// Controlador para obtener un empleado por su empresa
async function getEmpleadoByEmpresa(req, res) {
    try {
      const { cedula_empresa } = req.params; // Obtiene la cedula de los parámetros de la URL
      // Llama a la función getByEmpresa en el modelo de Empleado
      const empleado = await Empleado.getByEmpresa(cedula_empresa);
  
      if (empleado !== null) {
        // Si se encontró un empleado, lo retornamos
        res.status(200).json(empleado);
      } else {
        // Si no se encontró ningun empleado, respondemos con un mensaje de error
        res.status(404).json({ error: 'Empleado no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

// Funcion para obtener un empleado por su cedula y su empresa (Este es el que se deberia usar)
async function getEmpleadoByCedulaAndEmpresa(req, res) {
    try {
      const { cedula_empleado, cedula_empresa } = req.params; // Obtiene la cedula de los parámetros de la URL
      // Llama a la función getByCedulaAndEmpresa en el modelo de Empleado
      const empleado = await Empleado.getByCedula(cedula_empleado, cedula_empresa);
  
      if (empleado !== null) {
        // Si se encontró un empleado, lo retornamos
        res.status(200).json(empleado);
      } else {
        // Si no se encontró ningun empleado, respondemos con un mensaje de error
        res.status(404).json({ error: 'Empleado no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

// Controlador para obtener un empleado por su cédula y cédula de empresa
async function getEmpleadoConCedulaYEmpresa(req, res) {
  try {
    const { cedula_empleado, cedula_empresa } = req.params; // Obtiene las cédulas de los parámetros de la URL
    // Llama a la función getEmpleadoByCedulaYEmpresa en el modelo de Empleado
    const empleado = await Empleado.getEmpleadoByCedulaYEmpresa(cedula_empleado, cedula_empresa);

    if (empleado !== null) {
      // Si se encontró un empleado, lo retornamos
      res.status(200).json(empleado);
    } else {
      // Si no se encontró ningún empleado, respondemos con un mensaje de error
      res.status(404).json({ error: 'Empleado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Otros controladores para operaciones adicionales con Empleados pueden ser agregados aquí

module.exports = {
  getAllEmpleados,
  getAllEmpleadosByEmpresa,
  createEmpleado,
  getEmpleadoByCedula,
  getEmpleadoByEmpresa,
  getEmpleadoByCedulaAndEmpresa,
  getEmpleadoConCedulaYEmpresa
};
