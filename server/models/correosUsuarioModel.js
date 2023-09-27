const sql = require('mssql');
const dbConfig = require('../config/dbconfig');

// Obtener todos los correos de usuarios en la base de datos
async function getAll() {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .query('SELECT * FROM CorreosUsuarios');
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

// Crear un nuevo correo de usuario
async function createCorreoUsuario(cedula_usuario, correo) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('cedula_usuario', sql.NVarChar, cedula_usuario)
            .input('correo', sql.NVarChar, correo)
            .query(
                `INSERT INTO CorreosUsuarios (cedula_usuario, correo)
                VALUES (@cedula_usuario, @correo)`
            );
        return result.rowsAffected > 0;
    } catch (error) {
        throw error;
    }
}

// Obtener correos de usuario por su cédula
async function getByUsuario(cedula_usuario) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('cedula_usuario', sql.NVarChar, cedula_usuario)
            .query('SELECT * FROM CorreosUsuarios WHERE cedula_usuario = @cedula_usuario');
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAll,
    createCorreoUsuario,
    getByUsuario
};
