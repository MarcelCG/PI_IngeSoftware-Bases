const sql = require('mssql');
const dbConfig = require('../config/dbconfig'); // Importa la configuración de la base de datos

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

// Exportar el modelo
module.exports = {
  createEmpleado,
};
