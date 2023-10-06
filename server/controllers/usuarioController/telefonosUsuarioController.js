const TelefonosUsuarios = require('../../models/usuarioModel/telefonosUsuarioModel');

// Obtener todos los teléfonos
async function getAllTelefonosUsuarios(req, res) {
    try {
        const telefonos = await TelefonosUsuarios.getAll();

        if (telefonos.length > 0) {
            res.status(200).json(telefonos);
        } else {
            res.status(404).json({ message: 'No se encontraron teléfonos para este usuario' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controlador para crear un nuevo teléfono para un usuario
async function createTelefonoUsuario(req, res) {
    try {
        const { cedula_usuario, telefono } = req.body;

        const success = await TelefonosUsuarios.createTelefonoUsuario(cedula_usuario, telefono);

        if (success) {
            res.status(201).json({ message: 'Teléfono de usuario creado exitosamente' });
        } else {
            res.status(500).json({ message: 'No se pudo crear el teléfono de usuario' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controlador para obtener los teléfonos de un usuario por su cédula
async function getTelefonosByUsuario(req, res) {
    try {
        const { cedula_usuario } = req.params; // Obtiene la cédula del usuario de los parámetros de la URL
        const telefonos = await TelefonosUsuarios.getByUsuario(cedula_usuario);

        if (telefonos.length > 0) {
            res.status(200).json(telefonos);
        } else {
            res.status(404).json({ message: 'No se encontraron teléfonos para este usuario' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllTelefonosUsuarios,
    getTelefonosByUsuario,
    createTelefonoUsuario,
};
