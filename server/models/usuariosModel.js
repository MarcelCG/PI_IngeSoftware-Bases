const sql = require('mssql');
const dbConfig = require('../config/dbconfig');

// Obtener todos los usuarios
async function getAll() {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM Usuario');
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

// Crear un nuevo usuario
async function createUsuario(cedula, contrasena, nombre, primer_apellido, segundo_apellido, activo) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('cedula', sql.NVarChar, cedula)
            .input('contrasena', sql.NVarChar, contrasena)
            .input('nombre', sql.NVarChar, nombre)
            .input('primer_apellido', sql.NVarChar, primer_apellido)
            .input('segundo_apellido', sql.NVarChar, segundo_apellido)
            .input('activo', sql.Bit, activo)
            .query(
                `INSERT INTO Usuario (
                    cedula, contrasena, nombre, primer_apellido, segundo_apellido, activo
                )
                VALUES (
                    @cedula, @contrasena, @nombre, @primer_apellido, @segundo_apellido, @activo
                )`
            );
        return result.rowsAffected > 0;
    } catch (error) {
        throw error;
    }
}

// Obtener un usuario por su cedula
async function getByCedula(cedula) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('cedula', sql.NVarChar, cedula)
            .query('SELECT * FROM Usuario WHERE cedula = @cedula');
        if (result.recordset.length > 0) {
            return result.recordset[0];
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

async function getByUsername(username) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('username', sql.NVarChar, username)
            .query('SELECT * FROM Usuario WHERE cedula = @username');
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
    getAll,
    getByUsername,
    createUsuario,
    getByCedula
};
