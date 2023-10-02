const sql = require('mssql');
const dbConfig = require('../config/dbconfig'); // Importa la configuración de la base de datos

// Obtener todos los correos de una empresa
async function getAll() {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .query('SELECT * FROM CorreosEmpresas');
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

// Crear un nuevo correo para una empresa
async function create(cedula_empresa, correo) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('cedula_empresa', sql.NVarChar, cedula_empresa)
            .input('correo', sql.NVarChar, correo)
            .query(
                `INSERT INTO CorreosEmpresas (
                    cedula_empresa, correo
                )
                VALUES (
                    @cedula_empresa, @correo
                )`
            );
        return result.rowsAffected > 0;
    } catch (error) {
        throw error;
    }
}

// Obtener todos los correos de una empresa
async function getByEmpresa(cedula_empresa) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('cedula_empresa', sql.NVarChar, cedula_empresa)
            .query('SELECT * FROM CorreosEmpresas WHERE cedula_empresa = @cedula_empresa');
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAll,
    create,
    getByEmpresa
};
