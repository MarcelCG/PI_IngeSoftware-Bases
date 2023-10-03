const Usuario = require('../models/usuariosModel');

// Obtener todos los usuarios
async function getAllUsuarios(req, res) {
    try {
        const usuarios = await Usuario.getAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo usuario
async function createUsuario(req, res) {
    try {
        const {
            cedula,
            contrasena,
            nombre,
            primer_apellido,
            segundo_apellido,
            activo
        } = req.body;

        const success = await Usuario.createUsuario(
            cedula,
            contrasena,
            nombre,
            primer_apellido,
            segundo_apellido,
            activo
        );

        if (success) {
            res.status(201).json({ message: 'Usuario creado exitosamente' });
        } else {
            res.status(500).json({ message: 'No se pudo crear el usuario' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener un usuario por su cedula
async function getUsuarioByCedula(req, res) {
    try {
        const { cedula } = req.params;
        const usuario = await Usuario.getByCedula(cedula);

        if (usuario !== null) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        const usuario = await Usuario.getByUsername(username);

        if (!usuario) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        if (usuario.contrasena === password) {
            res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
    getAllUsuarios,
    createUsuario,
    loginUser,
    getUsuarioByCedula
};
