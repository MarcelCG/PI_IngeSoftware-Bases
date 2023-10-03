const CorreosUsuarios = require('../models/correosUsuarioModel');

// Obtener todos los correos de usuarios
async function getAllCorreosUsuarios(req, res) {
    try {
        const correosUsuarios = await CorreosUsuarios.getAll();
        res.status(200).json(correosUsuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo correo de usuario
async function createCorreoUsuario(req, res) {
    try {
        const { cedula_usuario, correo } = req.body;

        const success = await CorreosUsuarios.createCorreoUsuario(cedula_usuario, correo);

        if (success) {
            res.status(201).json({ message: 'Correo de usuario creado exitosamente' });
        } else {
            res.status(500).json({ message: 'No se pudo crear el correo de usuario' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener correos de usuario por su cédula
async function getCorreosUsuarioByCedula(req, res) {
    try {
        const { cedula_usuario } = req.params;
        const correosUsuario = await CorreosUsuarios.getByUsuario(cedula_usuario);

        if (correosUsuario.length > 0) {
            res.status(200).json(correosUsuario);
        } else {
            res.status(404).json({ message: 'No se encontraron correos de usuario para esta cédula' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllCorreosUsuarios,
    createCorreoUsuario,
    getCorreosUsuarioByCedula
};
