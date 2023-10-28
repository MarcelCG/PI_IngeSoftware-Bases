const sql = require('mssql');
const dbConfig = require('../../config/dbconfig'); // Importa la configuración de la base de datos

// Obtener todas las Politicass
async function getAll() {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request().query('SELECT * FROM Empresa');
      return result.recordset;
    } catch (error) {
      throw error;
    }
}
async function createEmpresa(cedula_juridica, nombre, cedula_empleador,
                             telefono1, telefono2, correo1, correo2) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('cedula_juridica', sql.NVarChar, cedula_juridica)
      .input('nombre', sql.NVarChar, nombre)
      .input('cedula_empleador', sql.NVarChar, cedula_empleador)
      .input('telefono1', sql.NVarChar, telefono1)
      .input('telefono2', sql.NVarChar, telefono2)
      .input('correo1', sql.NVarChar, correo1)
      .input('correo2', sql.NVarChar, correo2)
      .query(
        `INSERT INTO Empresa (
          cedula_juridica, nombre, cedula_empleador,
          telefono1, telefono2, correo1, correo2
        )
        VALUES (
          @cedula_juridica, @nombre, @cedula_empleador,
          @telefono1, @telefono2, @correo1, @correo2
        )`
      );
    return result.rowsAffected > 0;
  } catch (error) {
    throw error;
  }
}

async function getEmpresaByCedula(cedula_juridica){
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
    .request()
    .input('cedula_juridica', sql.NVarChar, cedula_juridica)
    .query('SELECT * FROM Empresa WHERE cedula_juridica = @cedula_juridica');
    if(result.recordset.length > 0) {
      return result.recordset[0];
    } else {
      return null;
    }
      
  } catch (error) {
    throw(error);
  }
}

async function obtenerEmpresaPorCedulaEmpleado(cedula_empleado){
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
    .request()
    .input('cedula_empleado', sql.NVarChar, cedula_empleado)
    .query('SELECT * FROM Empresa WHERE cedula_juridica = '
      + '(SELECT cedula_empresa FROM Empleado WHERE cedula_empleado = @cedula_empleado)');

    if(result.recordset.length > 0) {
      return result.recordset[0];
    } else {
      return null;
    }
      
  } catch (error) {
    throw(error);
  }
}

async function getEmpresaByCedulaEmpleador(cedula_empleador){
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
    .request()
    .input('cedula_empleador', sql.NVarChar, cedula_empleador)
    .query('SELECT * FROM Empresa WHERE cedula_empleador = @cedula_empleador');

    if(result.recordset.length > 0) {
      return result.recordset[0];
    } else {
      return null;
    }
      
  } catch (error) {
    throw(error);
  }
}

async function editarEmpresa(cedula_juridica, nuevosDatosEmpresa) {
  try {
    const pool = await sql.connect(dbConfig);
    const resultado = await pool
      .request()
      .input('cedula_juridica', sql.VarChar, cedula_juridica)
      .input('nombre', sql.VarChar, nuevosDatosEmpresa.nombre)
      .input('cedula_empleador', sql.VarChar, nuevosDatosEmpresa.cedula_empleador)
      .query(`
        UPDATE Empresa
        SET
          nombre = @nombre,
          cedula_empleador = @cedula_empleador
        WHERE cedula_juridica = @cedula_juridica
      `);
    return resultado.rowsAffected > 0;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  getAll,
  createEmpresa,
  getEmpresaByCedula,
  getEmpresaByCedulaEmpleador,
  editarEmpresa,
  obtenerEmpresaPorCedulaEmpleado,
};
