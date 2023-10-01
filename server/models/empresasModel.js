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

async function createEmpresa(
  cedula_juridica,
  nombre,
  cedula_empleador,
) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('cedula_juridica', sql.NVarChar, titulo)
      .input('nombre', sql.NVarChar, cedula_empresa)
      .input('cedula_empleador', sql.NVarChar, periodo)
      .query(
        `INSERT INTO Empresa (
          titulo, cedula_empresa, periodo, fecha_inicio, fecha_final,
          inicia_desde_contrato, horas_a_dar, incrementativo, acumulativo, activo
        )
        VALUES (
          @titulo, @cedula_empresa, @periodo, @fecha_inicio, @fecha_final,
          @inicia_desde_contrato, @horas_a_dar, @incrementativo, @acumulativo, @activo
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


module.exports = {
  getAll,
  createEmpresa,
  getEmpresaByCedula,
};