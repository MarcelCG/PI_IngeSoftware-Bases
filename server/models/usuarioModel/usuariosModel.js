const sql = require('mssql');
const dbConfig = require('../../config/dbconfig');

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
async function createUsuario(cedula, contrasena, nombre, primer_apellido, segundo_apellido,
                             telefono1, telefono2, correo1, correo2, activo) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('cedula', sql.NVarChar, cedula)
            .input('contrasena', sql.NVarChar, contrasena)
            .input('nombre', sql.NVarChar, nombre)
            .input('primer_apellido', sql.NVarChar, primer_apellido)
            .input('segundo_apellido', sql.NVarChar, segundo_apellido)
            .input('telefono1', sql.NVarChar, telefono1)
            .input('telefono2', sql.NVarChar, telefono2)
            .input('correo1', sql.NVarChar, correo1)
            .input('correo2', sql.NVarChar, correo2)
            .input('activo', sql.Bit, activo)
            .query(
                `INSERT INTO Usuario (
                    cedula, contrasena, nombre, primer_apellido, segundo_apellido,
                    telefono1, telefono2, correo1, correo2, activo
                )
                VALUES (
                    @cedula, @contrasena, @nombre, @primer_apellido, @segundo_apellido,
                    @telefono1, @telefono2, @correo1, @correo2, @activo
                )`
            );
        return result.rowsAffected > 0;
    } catch (error) {
        throw error;
    }
}

// Obtener un usuario por su cedulaj
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

module.exports = {
    getAll,
    createUsuario,
    getByCedula
};
