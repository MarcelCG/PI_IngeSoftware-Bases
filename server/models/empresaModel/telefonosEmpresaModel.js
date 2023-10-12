const sql = require('mssql');
const dbConfig = require('../../config/dbconfig'); // Importa la configuración de la base de datos

// Obtener todos los teléfonos de una empresa
async function getAll() {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .query('SELECT * FROM TelefonosEmpresas');
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

// Crear un nuevo teléfono para una empresa
async function create(cedula_empresa, telefono) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('cedula_empresa', sql.NVarChar, cedula_empresa)
            .input('telefono', sql.NVarChar, telefono)
            .query(
                `INSERT INTO TelefonosEmpresas (
                    cedula_empresa, telefono
                )
                VALUES (
                    @cedula_empresa, @telefono
                )`
            );
        return result.rowsAffected > 0;
    } catch (error) {
        throw error;
    }
}

// Obtener todos los teléfonos de una empresa
async function getByEmpresa(cedula_empresa) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('cedula_empresa', sql.NVarChar, cedula_empresa)
            .query('SELECT * FROM TelefonosEmpresas WHERE cedula_empresa = @cedula_empresa');
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
