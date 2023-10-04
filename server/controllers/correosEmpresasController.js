const CorreosEmpresas = require('../models/correosEmpresasModel');

// Obtener todos los correos de una empresa
async function getAllCorreos(req, res) {
    try {
        const correos = await CorreosEmpresas.getAll();
        res.status(200).json(correos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo correo para una empresa
async function createCorreo(req, res) {
    try {
        const { cedula_empresa, correo } = req.body;

        // Llama a la función create del modelo para crear un nuevo correo
        const success = await CorreosEmpresas.create(cedula_empresa, correo);

        if (success) {
            res.status(201).json({ message: 'Correo creado exitosamente' });
        } else {
            res.status(500).json({ message: 'No se pudo crear el correo' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener todos los correos de una empresa
async function getCorreosByEmpresa(req, res) {
    try {
        const { cedula_empresa } = req.params;
        const correos = await CorreosEmpresas.getByEmpresa(cedula_empresa);

        if (correos.length > 0) {
            res.status(200).json(correos);
        } else {
            res.status(404).json({ message: 'No se encontraron correos para esta empresa' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllCorreos,
    createCorreo,
    getCorreosByEmpresa,
};
