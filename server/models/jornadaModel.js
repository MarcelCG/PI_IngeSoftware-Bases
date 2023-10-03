const sql = require('mssql');
const dbConfig = require('../config/dbconfig'); // Importa la configuración de la base de datos

// Obtener todas las jornadas
async function getAll() {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM Jornada');
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

// Crear una nueva jornada
async function createJornada(
    cedula_empleado,
    dia_inicial,
    dia_final,
    hora_inicio,
    cantidad_horas
) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('cedula_empleado', sql.NVarChar, cedula_empleado)
            .input('dia_inicial', sql.NVarChar, dia_inicial)
            .input('dia_final', sql.NVarChar, dia_final)
            .input('hora_inicio', sql.Date, hora_inicio)
            .input('cantidad_horas', sql.Decimal(5, 2), cantidad_horas)
            .query(
                `INSERT INTO Jornada (
                    cedula_empleado, dia_inicial, dia_final, hora_inicio, cantidad_horas
                )
                VALUES (
                    @cedula_empleado, @dia_inicial, @dia_final, @hora_inicio, @cantidad_horas
                )`
            );
        return result.rowsAffected > 0;
    } catch (error) {
        throw error;
    }
}

// Función para obtener una jornada por la cédula del empleado
async function getJornadaByCedula(cedula_empleado) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('cedula_empleado', sql.NVarChar, cedula_empleado)
            .query('SELECT * FROM Jornada WHERE cedula_empleado = @cedula_empleado');
        if (result.recordset.length > 0) {
            // Si se encontró una jornada, se retorna
            return result.recordset[0];
        } else {
            // Si no se encontró ninguna jornada, retornamos null
            return null;
        }
    } catch (error) {
        throw error;
    }
}

// Exportar el modelo
module.exports = {
    getAll,
    createJornada,
    getJornadaByCedula,
};
