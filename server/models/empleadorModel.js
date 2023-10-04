const sql = require('mssql');
const dbConfig = require('../config/dbconfig'); // Importa la configuración de la base de datos

// Obtener todos los empleados
async function getAll() {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request().query('SELECT * FROM Empleador');
      return result.recordset;
    } catch (error) {
      throw error;
    }
}

// Definir el modelo para la tabla Empleado
async function createEmpleador(cedula_empleador) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('cedula_empleador', sql.NVarChar, cedula_empleador)
      .query(
        `INSERT INTO Empleador (
          cedula_empleador
        )
        VALUES (
          @cedula_empleador
        )`
      );
    return result.rowsAffected > 0;
  } catch (error) {
    throw error;
  }
}

// Función para obtener un empleado por su cedula
async function getByCedula(cedula_empleador) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('cedula_empleador', sql.NVarChar, cedula_empleador)
      .query('SELECT u.cedula,'
        + ' u.nombre, u.primer_apellido, u.segundo_apellido,'
        + ' c.correo'
        + ' FROM Usuario u, Empleador e, CorreosUsuarios c '
        + ' WHERE u.cedula=e.cedula_empleador'
        + ' AND u.activo=1'
        + ' AND c.cedula_usuario=u.cedula');
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
      console.log("---------> ", cedula_empresa);
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
  createEmpleador,
  getByCedula,
  getByEmpresa,
  getByCedulaAndEmpresa
};
