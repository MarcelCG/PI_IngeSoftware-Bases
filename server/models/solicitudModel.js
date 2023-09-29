const sql = require('mssql');
const dbConfig = require('../config/dbconfig'); // Importa la configuración de la base de datos

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
  id,
  cedula_empleado,
  titulo,
  cedula_empresa,
  dias_libres_solicitados,
  fecha_solicitud,
  inicio_fechas_solicitadas,
  estado
) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('id', sql.NVarChar, id)
      .input('cedula_empleado', sql.NVarChar, cedula_empleado)
      .input('titulo', sql.NVarChar, titulo)
      .input('cedula_empresa', sql.NVarChar, cedula_empresa)
      .input('dias_libres_solicitados', sql.Decimal(5, 2), dias_libres_solicitados)
      .input('fecha_solicitud', sql.Date, fecha_solicitud)
      .input('inicio_fechas_solicitadas', sql.Date, inicio_fechas_solicitadas)
      .input('estado', sql.NVarChar, estado)
      .query(
        `INSERT INTO Solicitud (
          id, cedula_empleado, titulo, cedula_empresa,
          dias_libres_solicitados, fecha_solicitud,
          inicio_fechas_solicitadas, estado
        )
        VALUES (
          @id, @cedula_empleado, @titulo, @cedula_empresa,
          @dias_libres_solicitados, @fecha_solicitud,
          @inicio_fechas_solicitadas, @estado
        )`
      );
    return result.rowsAffected > 0;
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

// Función para obtener solicitudes por cédula del empleado
async function getSolicitudByCedula(cedula_empleado) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('cedula_empleado', sql.NVarChar, cedula_empleado)
        .query('SELECT * FROM Solicitud WHERE cedula_empleado = @cedula_empleado');
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
        .query('SELECT * FROM Solicitud WHERE cedula_empresa = @cedula_empresa');
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

// Otras funciones relacionadas con las solicitudes pueden ser agregadas aquí

// Exportar el modelo
module.exports = {
  getAll,
  createSolicitud,
  getSolicitudById,
  getSolicitudByCedula,
  getSolicitudByEmpresa,
  getSolicitudByCedulaAndEmpresa,
  // Agregar otras funciones relacionadas con las solicitudes según sea necesario
};
