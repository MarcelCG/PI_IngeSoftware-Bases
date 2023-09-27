const sql = require('mssql');
const dbConfig = require('../config/dbconfig'); // Importa la configuración de la base de datos

// Obtener todos los registros de la tabla Libres
async function getAll() {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM Libres');
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

// Obtener registros de la tabla Libres por cédula de empleado
async function getByEmpleado(cedula_empleado) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('cedula_empleado', sql.NVarChar, cedula_empleado)
            .query('SELECT * FROM Libres WHERE cedula_empleado = @cedula_empleado');
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

// Obtener registros de la tabla Libres por título de política y cédula de empresa
async function getByPolitica(titulo_politica, cedula_empresa) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('titulo_politica', sql.NVarChar, titulo_politica)
            .input('cedula_empresa', sql.NVarChar, cedula_empresa)
            .query('SELECT * FROM Libres WHERE titulo_politica = @titulo_politica AND cedula_empresa = @cedula_empresa');
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

// Obtener registros de la tabla Libres por cédula de empleado, título de política y cédula de empresa
async function getByEmpleadoAndPolitica(cedula_empleado, titulo_politica, cedula_empresa) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('cedula_empleado', sql.NVarChar, cedula_empleado)
            .input('titulo_politica', sql.NVarChar, titulo_politica)
            .input('cedula_empresa', sql.NVarChar, cedula_empresa)
            .query('SELECT * FROM Libres WHERE cedula_empleado = @cedula_empleado AND titulo_politica = @titulo_politica AND cedula_empresa = @cedula_empresa');
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

// Crear un nuevo registro en la tabla Libres
async function createLibre(cedula_empleado, titulo_politica, cedula_empresa, dias_libres_disponibles, dias_libres_utilizados) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('cedula_empleado', sql.NVarChar, cedula_empleado)
            .input('titulo_politica', sql.NVarChar, titulo_politica)
            .input('cedula_empresa', sql.NVarChar, cedula_empresa)
            .input('dias_libres_disponibles', sql.Decimal(5, 2), dias_libres_disponibles)
            .input('dias_libres_utilizados', sql.Decimal(5, 2), dias_libres_utilizados)
            .query(
                `INSERT INTO Libres (
                  cedula_empleado, titulo_politica, cedula_empresa, dias_libres_disponibles, dias_libres_utilizados
                )
                VALUES (
                  @cedula_empleado, @titulo_politica, @cedula_empresa, @dias_libres_disponibles, @dias_libres_utilizados
                )`
            );
        return result.rowsAffected > 0;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAll,
    getByEmpleado,
    getByPolitica,
    getByEmpleadoAndPolitica,
    createLibre
};
