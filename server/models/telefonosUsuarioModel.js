const sql = require('mssql');
const dbConfig = require('../config/dbconfig'); // Importa la configuración de la base de datos

// Obtener todos los teléfonos
async function getAll() {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .query('SELECT * FROM TelefonosUsuarios');
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

// Funcion para crear un telefono de un usuario
async function createTelefonoUsuario(cedula_usuario, telefono) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('cedula_usuario', sql.NVarChar, cedula_usuario)
            .input('telefono', sql.NVarChar, telefono)
            .query(
                `INSERT INTO TelefonosUsuarios (cedula_usuario, telefono)
                VALUES (@cedula_usuario, @telefono)`
            );
        return result.rowsAffected > 0;
    } catch (error) {
        throw error;
    }
}

// Función para obtener los teléfonos de un usuario por su cédula
async function getByUsuario(cedula_usuario) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('cedula_usuario', sql.NVarChar, cedula_usuario)
            .query('SELECT * FROM TelefonosUsuarios WHERE cedula_usuario = @cedula_usuario');
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAll,
    getByUsuario,
    createTelefonoUsuario
};
