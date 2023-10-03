const sql = require('mssql');
const dbConfig = require('../config/dbconfig'); // Importa la configuración de la base de datos

// Obtener todas las Politicas
async function getAll() {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request().query('SELECT * FROM Empresa');
      return result.recordset;
    } catch (error) {
      throw error;
    }
}
async function createEmpresa(cedula_juridica,nombre,cedula_empleador) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('cedula_juridica', sql.NVarChar, cedula_juridica)
      .input('nombre', sql.NVarChar, nombre)
      .input('cedula_empleador', sql.NVarChar, cedula_empleador)
      .query(
        `INSERT INTO Empresa (
          cedula_juridica, nombre, cedula_empleador
        )
        VALUES (
          @cedula_juridica, @nombre, @cedula_empleador
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
    .query('SELECT E.nombre AS nombre_empresa,E.cedula_juridica,(SELECT TOP 1 T.telefono FROM TelefonosEmpresas T WHERE T.cedula_empresa = E.cedula_juridica) AS telefono,(SELECT TOP 1 C.correo FROM CorreosEmpresas C WHERE C.cedula_empresa = E.cedula_juridica) AS correo FROM Empresa E WHERE E.cedula_juridica = @cedula_juridica');

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

module.exports = {
  getAll,
  createEmpresa,
  getEmpresaByCedula,
  getEmpresaByCedulaEmpleador
};