const Usuario = require('../../models/usuarioModel/usuariosModel');
const Empleador = require('../../models/usuarioModel/Empleador/empleadorModel');
const Empleado = require('../../models/usuarioModel/Empleado/empleadoModel');
const UserCorreo = require('../../models/usuarioModel/correosUsuarioModel');
const UserTel = require('../../models/usuarioModel/telefonosUsuarioModel');

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
            telefono1,
            telefono2,
            correo1,
            correo2,
            activo
        } = req.body;

        const success = await Usuario.createUsuario(
            cedula,
            contrasena,
            nombre,
            primer_apellido,
            segundo_apellido,
            telefono1,
            telefono2,
            correo1,
            correo2,
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
        const usuario = await Usuario.CedulaActivo(username);

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

async function infoUser(req, res) {
  try {
    const { cedula } = req.params;

    const [userData, userCorreoData, userTelData, empleadorData] = await Promise.all([
      Usuario.getByCedula(cedula),
      UserCorreo.getByUsuario(cedula),
      UserTel.getByUsuario(cedula),
      Empleado.getByCedula(cedula), // This might return null if it's an empleador
    ]);

    const isEmpleado = !!empleadorData;

    const usuario = {
      ...userData,
      correo: userCorreoData,
      telefono: userTelData,
      esEmpleado: isEmpleado,
    };

    //console.log(usuario);
    if (usuario !== null) {
      res.status(200).json({ data: usuario });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}




module.exports = {
    getAllUsuarios,
    createUsuario,
    loginUser,
    getUsuarioByCedula,
    infoUser,
};
