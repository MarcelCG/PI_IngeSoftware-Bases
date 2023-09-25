const sql = require('mssql');
const dbConfig = require('../config/dbconfig'); // Importa la configuración de la base de datos

// Obtener todas las Politicas
async function getAll() {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request().query('SELECT * FROM Politica');
      return result.recordset;
    } catch (error) {
      throw error;
    }
}

async function createPolitica(
  titulo,
  cedula_empresa,
  periodo,
  fecha_inicio,
  fecha_final,
  inicia_desde_contrato,
  horas_a_dar,
  incrementativo,
  acumulativo,
  activo
) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('titulo', sql.NVarChar, titulo)
      .input('cedula_empresa', sql.NVarChar, cedula_empresa)
      .input('periodo', sql.Decimal(5, 2), periodo)
      .input('fecha_inicio', sql.Date, fecha_inicio)
      .input('fecha_final', sql.Date, fecha_final)
      .input('inicia_desde_contrato', sql.Bit, inicia_desde_contrato)
      .input('horas_a_dar', sql.Decimal(5, 2), horas_a_dar)
      .input('incrementativo', sql.Bit, incrementativo)
      .input('acumulativo', sql.Bit, acumulativo)
      .input('activo', sql.Bit, activo)
      .query(
        `INSERT INTO Politica (
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


module.exports = {
  getAll,
  createPolitica,
};