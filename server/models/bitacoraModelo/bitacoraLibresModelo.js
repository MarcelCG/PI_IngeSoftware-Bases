const sql = require('mssql');
const dbConfig = require('../../config/dbconfig'); // Importa la configuración de la base de datos

async function obtenerTodosPorEmpleado(cedula_empleado) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
        .request()
        .input('cedula_empleado', sql.NVarChar, cedula_empleado)
        .query('SELECT * FROM bitacora_libres WHERE cedula_empleado = @cedula_empleado');
        return result.recordset;
    } catch (error) {
        console.error('Hubo un error en el modelo obtenerTodosPorEmpleado: ', error);
        throw error;
    }
}

module.exports = {
    obtenerTodosPorEmpleado,
}