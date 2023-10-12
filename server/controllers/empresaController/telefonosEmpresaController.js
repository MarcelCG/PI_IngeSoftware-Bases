const TelefonosEmpresas = require('../../models/empresaModel/telefonosEmpresaModel');

// Obtener todos los teléfonos de una empresa
async function getAllTelefonosEmpresas(req, res) {
    try {
        const telefonos = await TelefonosEmpresas.getAll();
        res.status(200).json(telefonos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo teléfono para una empresa
async function createTelefonoEmpresa(req, res) {
    try {
        const { cedula_empresa, telefono } = req.body;
        const success = await TelefonosEmpresas.create(cedula_empresa, telefono);
        if (success) {
            res.status(201).json({ message: 'Teléfono creado exitosamente' });
        } else {
            res.status(500).json({ message: 'No se pudo crear el teléfono' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener todos los teléfonos de una empresa
async function getTelefonosByEmpresa(req, res) {
    try {

        const { cedula_empresa } = req.params;
        console.log("GET EMPRESA CORR: ", cedula_empresa);
        const telefonos = await TelefonosEmpresas.getByEmpresa(cedula_empresa);
        if (telefonos.length > 0) {
            res.status(200).json(telefonos);
        } else {
            res.status(404).json({ message: 'No se encontraron teléfonos para esta empresa' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllTelefonosEmpresas,
    createTelefonoEmpresa,
    getTelefonosByEmpresa
};
