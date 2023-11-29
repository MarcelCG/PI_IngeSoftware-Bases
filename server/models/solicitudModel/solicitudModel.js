const sql = require('mssql');
const dbConfig = require('../../config/dbconfig'); // Importa la configuración de la base de datos

// Obtener todas las solicitudes
async function getAll() {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request().query('SELECT * FROM Solicitud');
      return result.recordset;
    } catch (error) {
      throw error;
    }
}

// Crear una nueva solicitud
async function createSolicitud(
  cedula_empleado,
  titulo,
  cedula_empresa,
  inicio_fechas_solicitadas,
  dias_solicitados,
  hora_inicio,
  horas_solicitadas,
  comentarios
) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('cedula_empleado', sql.NVarChar, cedula_empleado)
      .input('titulo', sql.NVarChar, titulo)
      .input('cedula_empresa', sql.NVarChar, cedula_empresa)
      .input('inicio_fechas_solicitadas', sql.Date, inicio_fechas_solicitadas)
      .input('dias_solicitados', sql.Decimal(5, 2), dias_solicitados)
      .input('hora_inicio', sql.NVarChar, hora_inicio)
      .input('horas_solicitadas', sql.Int, horas_solicitadas)
      .input('comentarios', sql.NVarChar, comentarios)
      .query(
        `INSERT INTO Solicitud (
        cedula_empleado, titulo_politica, cedula_empresa,
        fecha_solicitud, inicio_fechas_solicitadas,
        dias_libres_solicitados, hora_de_inicio, horas_solicitadas,
        estado, comentarios
        )
        VALUES (
          @cedula_empleado, @titulo, @cedula_empresa,
          GETDATE(), @inicio_fechas_solicitadas, @dias_solicitados,
          @hora_inicio, @horas_solicitadas, 'Pendiente', @comentarios
        )`
      );
    return result.rowsAffected[0] > 0;
  } catch (error) {
    throw error;
  }
}

// Función para obtener una solicitud por su ID
async function getSolicitudById(id) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('id', sql.NVarChar, id)
      .query('SELECT * FROM Solicitud WHERE id = @id');
    if (result.recordset.length > 0) {
      // Si se encontró una solicitud, se retorna
      return result.recordset[0];
    } else {
      // Si no se encontró ninguna solicitud, retornamos null
      return null;
    }
  } catch (error) {
    throw error;
  }
}

async function aprobarSolicitud (id, estado) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('id', sql.BigInt, id)
      .input('estado', sql.NVarChar, estado)
      .execute('ActualizarEstadoSolicitud')
    return result.rowsAffected > 0;;
  } catch (error) {
    throw error;
  }
}

async function rechazarSolicitud (id, estado) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('id', sql.BigInt, id)
      .input('estado', sql.NVarChar, estado)
      .execute('ActualizarEstadoSolicitud')
    return result.rowsAffected > 0;;
  } catch (error) {
    throw error;
  }
}

async function cancelarSolicitud (id, estado) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('id', sql.BigInt, id)
      .input('estado', sql.NVarChar, estado)
      .execute('ActualizarEstadoSolicitud')
    return 1;;
  } catch (error) {
    throw error;
  }
}

// Función para obtener solicitudes por cédula del empleado
async function getSolicitudByCedula(cedula_empleado) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('cedula', sql.NVarChar, cedula_empleado)
        .execute('ObtenerSolicitudesDeEmpleado')
      return result.recordset;
    } catch (error) {
      throw error;
    }
  }
  
  // Función para obtener solicitudes por cédula de la empresa
  async function getSolicitudByEmpresa(cedula_empresa) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('cedula_empresa', sql.NVarChar, cedula_empresa)
        .execute(`ObtenerSolicitudesDeEmpresa`);
      return result.recordset;
    } catch (error) {
      throw error;
    }
  }

// Función para obtener una solicitud por cédula de empleado y cédula de empresa
async function getSolicitudByCedulaAndEmpresa(cedula_empleado, cedula_empresa) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('cedula_empleado', sql.NVarChar, cedula_empleado)
        .input('cedula_empresa', sql.NVarChar, cedula_empresa)
        .query('SELECT * FROM Solicitud WHERE cedula_empleado = @cedula_empleado AND cedula_empresa = @cedula_empresa');
      if (result.recordset.length > 0) {
        // Si se encontró una solicitud, se retorna
        return result.recordset[0];
      } else {
        // Si no se encontró ninguna solicitud, retornamos null
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

async function obtenerLibresPorPolitica(cedula_empleado) {
  try {
    const pool = await sql.connect(dbConfig);
    const resultado = await pool
      .request()
      .input('cedula_empleado', sql.NVarChar, cedula_empleado)
      .query(`SELECT l.titulo_politica,
              l.dias_libres_disponibles
              FROM Libres l, Usuario u, Politica p
              WHERE l.cedula_empleado=@cedula_empleado
              AND l.cedula_empleado=u.cedula
              AND u.activo=1
              AND p.activo=1
			        AND p.titulo=l.titulo_politica`);
      return resultado.recordset;
  } catch (error) {
    throw error;
  }
}

// Otras funciones relacionadas con las solicitudes pueden ser agregadas aquí

// Exportar el modelo
module.exports = {
  getAll,
  createSolicitud,
  getSolicitudById,
  getSolicitudByCedula,
  getSolicitudByEmpresa,
  getSolicitudByCedulaAndEmpresa,
  aprobarSolicitud,
  cancelarSolicitud,
  rechazarSolicitud,
  obtenerLibresPorPolitica
  // Agregar otras funciones relacionadas con las solicitudes según sea necesario
};
