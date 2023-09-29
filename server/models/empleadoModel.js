const sql = require('mssql');
const dbConfig = require('../config/dbconfig'); // Importa la configuración de la base de datos

// Obtener todos los empleados
async function getAll() {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request().query('SELECT * FROM Empleado');
      return result.recordset;
    } catch (error) {
      throw error;
    }
}

// Definir el modelo para la tabla Empleado
async function createEmpleado(
  cedula_empleado,
  cedula_empresa,
  rol,
  fecha_contratacion
) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('cedula_empleado', sql.NVarChar, cedula_empleado)
      .input('cedula_empresa', sql.NVarChar, cedula_empresa)
      .input('rol', sql.NVarChar, rol)
      .input('fecha_contratacion', sql.Date, fecha_contratacion)
      .query(
        `INSERT INTO Empleado (
          cedula_empleado, cedula_empresa, rol, fecha_contratacion
        )
        VALUES (
          @cedula_empleado, @cedula_empresa, @rol, @fecha_contratacion
        )`
      );
    return result.rowsAffected > 0;
  } catch (error) {
    throw error;
  }
}

// Función para obtener un empleado por su cedula
async function getByCedula(cedula_empleado) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('cedula_empleado', sql.NVarChar, cedula_empleado)
        .query('SELECT * FROM Empleado WHERE cedula_empleado = @cedula_empleado');
      if (result.recordset.length > 0) {
        // Si se encontró un empleado, se retorna
        return result.recordset[0];
      } else {
        // Si no se encontró ningun empleado, retornamos null
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  // Función para obtener un empleado por su empresa
async function getByEmpresa(cedula_empresa) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('cedula_empresa', sql.NVarChar, cedula_empresa)
        .query('SELECT * FROM Empleado WHERE cedula_empresa = @cedula_empresa');
      if (result.recordset.length > 0) {
        // Si se encontró un empleado, se retorna
        return result.recordset[0];
      } else {
        // Si no se encontró ningun empleado, retornamos null
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  // Función para obtener un empleado por su empresa
async function getByCedulaAndEmpresa(cedula_empleado, cedula_empresa) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('cedula_empleado', sql.NVarChar, cedula_empleado)
        .input('cedula_empresa', sql.NVarChar, cedula_empresa)
        .query('SELECT * FROM Empleado WHERE cedula_empresa = @cedula_empresa AND cedula_empleado = @cedula_empleado');
      if (result.recordset.length > 0) {
        // Si se encontró un empleado, se retorna
        return result.recordset[0];
      } else {
        // Si no se encontró ningun empleado, retornamos null
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

// Exportar el modelo
module.exports = {
  getAll,
  createEmpleado,
  getByCedula,
  getByEmpresa,
  getByCedulaAndEmpresa,
};
