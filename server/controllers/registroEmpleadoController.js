const UsuarioModel = require('../models/usuariosModel.js');
const UsuarioCorreoModel = require('../models/correosUsuarioModel.js');
const UsuarioTelModel = require('../models/telefonosUsuarioModel.js');
const EmpleadoModel = require('../models/empleadoModel.js');
const EmpresasModel = require('../models/empresasModel.js')

async function RegistrarUsuario(req, res) {
    try {
        const data = req.body;
        var success = await UsuarioModel.createUsuario(
            data["cedula"],
            data["contrasena"],
            data["nombre"],
            data["primer_apellido"],
            data["segundo_apellido"]
        );
        
        success += await EmpleadoModel.createEmpleado(
            data["cedula"],
            '3-101-291924',
            data["rol"],
            data["fecha_contratacion"]
        )

        success += await UsuarioTelModel.createTelefonoUsuario(
            data["cedula"],
            data["telefono1"]
        )
        if (data["telefono2"] != "") {
            success += await UsuarioTelModel.createTelefonoUsuario(
                data["cedula"],
                data["telefono2"]
            )
        }

        success += await UsuarioCorreoModel.createCorreoUsuario(
            data["cedula"],
            data["correo1"]
        )
        if (data["correo2"] != "") {
            success += await UsuarioCorreoModel.createCorreoUsuario(
                data["cedula"],
                data["correo2"]
            )
        }

        return success;
    }
    catch (error) {
        console.log("error en registrarusuarioempleado");
        res.status(500).json({ error: error.message });
        return error;
    }
}

async function RegistrarEmpleado(req, res) {
    try {

        const data = req.body;

        const existeUsuario = await UsuarioModel.getByCedula(data["cedula"]);
        if (existeUsuario) {
            res.status(400).json({ error: 'Ya existe un usuario con la cedula digitada'});
            return
        }

        const success = await RegistrarUsuario(req, res);
    
        if (success) { 
            res.status(201).json({ message: 'Empleado registrado exitosamente' });
        } else {
            res.status(500).json({ message: 'Hubo un error al crear el empleado' });
        }
    } catch (error) {
        console.log("Error en registrarEmpleado");
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    RegistrarEmpleado
};