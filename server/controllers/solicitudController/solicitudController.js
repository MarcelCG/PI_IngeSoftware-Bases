const Solicitud = require('../../models/solicitudModel/solicitudModel');
const Servicio = require('../../servicios/solicitudServicios/solicitudServicios')

// Obtener todas las solicitudes
async function getAllSolicitudes(req, res) {
  try {
    const solicitudes = await Solicitud.getAll();
    res.status(200).json(solicitudes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear una nueva solicitud
async function createSolicitud(req, res) {
  try {
    const {
      id,
      cedula_empleado,
      titulo,
      cedula_empresa,
      dias_libres_solicitados,
      fecha_solicitud,
      inicio_fechas_solicitadas,
      estado,
    } = req.body;

    // Llama a la función createSolicitud que inserta en la tabla "Solicitud"
    const success = await Solicitud.createSolicitud(
      id,
      cedula_empleado,
      titulo,
      cedula_empresa,
      dias_libres_solicitados,
      fecha_solicitud,
      inicio_fechas_solicitadas,
      estado
    );

    if (success) {
      res.status(201).json({ message: 'Solicitud creada exitosamente' });
    } else {
      res.status(500).json({ message: 'No se pudo crear la solicitud' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function aprobarSolicitud(req, res) {
  try {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL
    // Llama al servicio de solicitudes
    const accion = Servicio.aprobarSolicitud(id);

    if (accion) {
      // Si se pudo aprobar la solicitud, mensaje de exito
      res.status(200).json('Solicitud aprobada correctamente');
    } else {
      // Si no se aprobó una solicitud con ese ID, respondemos con un mensaje de error
      res.status(404).json({ error: 'Error al aprobar solicitud, recargue la página e intente de nuevo' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function rechazarSolictud(req,res) {
  try {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL
    // Llama al servicio de solicitudes
    const accion = Servicio.rechazarSolictud(id);

    if (accion) {
      // Si se pudo aprobar la solicitud, mensaje de exito
      res.status(200).json('Solicitud rechazada correctamente');
    } else {
      // Si no se aprobó una solicitud con ese ID, respondemos con un mensaje de error
      res.status(404).json({ error: 'Error al rechazar solicitud, recargue la página e intente de nuevo' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controlador para obtener una solicitud por su ID
async function getSolicitudById(req, res) {
  try {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL
    // Llama a la función getSolicitudById en el modelo de Solicitud
    const solicitud = await Solicitud.getSolicitudById(id);

    if (solicitud !== null) {
      // Si se encontró una solicitud con ese ID, la retornamos
      res.status(200).json(solicitud);
    } else {
      // Si no se encontró ninguna solicitud con ese ID, respondemos con un mensaje de error
      res.status(404).json({ error: 'Solicitud no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controlador para obtener solicitudes por cédula del empleado
async function getSolicitudByCedula(req, res) {
  try {
    const { cedula_empleado } = req.params;
    // Llama a la función getSolicitudByCedulaEmpleado en el modelo de Solicitud
    const solicitudes = await Solicitud.getSolicitudByCedula(cedula_empleado);

    if (solicitudes.length > 0) {
      res.status(200).json(solicitudes);
    } else {
      res.status(404).json({ message: 'No se encontraron solicitudes para este empleado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controlador para obtener solicitudes por cédula de la empresa
async function getSolicitudByEmpresa(req, res) {
  try {
    const { cedula_empresa } = req.params;
    // Llama a la función getSolicitudByEmpresa en el modelo de Solicitud
    const solicitudes = await Solicitud.getSolicitudByEmpresa(cedula_empresa);

    if (solicitudes.length > 0) {
      res.status(200).json(solicitudes);
    } else {
      res.status(404).json({ message: 'No se encontraron solicitudes para esta empresa' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controlador para obtener una solicitud por cédula de empleado y cédula de empresa
async function getSolicitudByCedulaAndEmpresa(req, res) {
    try {
      const { cedula_empleado, cedula_empresa } = req.params;
  
      // Llama a la función getSolicitudByCedulaAndEmpresa en el modelo de Solicitud
      const solicitud = await Solicitud.getSolicitudByCedulaAndEmpresa(cedula_empleado, cedula_empresa);
  
      if (solicitud !== null) {
        // Si se encontró una solicitud con esos criterios, la retornamos
        res.status(200).json(solicitud);
      } else {
        // Si no se encontró ninguna solicitud con esos criterios, respondemos con un mensaje de error
        res.status(404).json({ error: 'Solicitud no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

module.exports = {
  getAllSolicitudes,
  createSolicitud,
  getSolicitudById,
  getSolicitudByCedula,
  getSolicitudByEmpresa,
  getSolicitudByCedulaAndEmpresa,
  aprobarSolicitud,
  rechazarSolictud,
};