const sql = require('mssql');
const dbConfig = require('../config/dbconfig'); // Importa la configuración de la base de datos

// Función para obtener datos de un Empleador por su cédula
async function getEmpleadorDataByCedula(cedula_empleador) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('cedula_empleador', sql.NVarChar, cedula_empleador)
        .query(`
          SELECT U.nombre, U.primer_apellido, U.segundo_apellido, U.correo, U.cedula, E.nombre AS nombre_empresa
          FROM Usuario U
          JOIN Empresa E ON U.cedula = E.cedula_empleador
          WHERE U.cedula = @cedula_empleador
        `);
  
      if (result.recordset.length > 0) {
        return result.recordset[0];
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
}

module.exports = {
  getEmpleadorDataByCedula,
};
