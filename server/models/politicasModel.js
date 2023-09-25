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

module.exports = {
  getAll,
};