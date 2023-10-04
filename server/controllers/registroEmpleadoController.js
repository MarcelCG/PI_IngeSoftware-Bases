const UsuarioModel = require('../models/usuariosModel.js');
const UsuarioCorreoModel = require('../models/correosUsuarioModel.js');
const UsuarioTelModel = require('../models/telefonosUsuarioModel.js');
const EmpleadoModel = require('../models/empleadoModel.js');
const EmpresasModel = require('../models/empresasModel.js')

async function RegistrarUsuario(req, res) {
    try {
        const data = req.body;
        const cedula_empleado =  data["cedula"].replace(/-/g, '');
        console.log("cedula del empleado", cedula_empleado);
        console.log("empresa del empleado",data["empresa"]);
        var success = await UsuarioModel.createUsuario(
            cedula_empleado,
            data["contrasena"],
            data["nombre"],
            data["primer_apellido"],
            data["segundo_apellido"],
            true
        );

        success += await EmpleadoModel.createEmpleado(
            cedula_empleado,
            data["empresa"],
            data["rol"],
            data["fecha_contratacion"]
        )

        success += await UsuarioTelModel.createTelefonoUsuario(
            cedula_empleado,
            data["telefono1"]
        )
        if (data["telefono2"] != "") {
            success += await UsuarioTelModel.createTelefonoUsuario(
                cedula_empleado,
                data["telefono2"]
            )
        }

        success += await UsuarioCorreoModel.createCorreoUsuario(
            cedula_empleado,
            data["correo1"]
        )
        if (data["correo2"] != "") {
            success += await UsuarioCorreoModel.createCorreoUsuario(
                cedula_empleado,
                data["correo2"]
            )
        }

        return success;
    }
    catch (error) {
        //res.status(500).json({ error: error.message });
        return error;
    }
}

async function RegistrarEmpleado(req, res) {
    try {

        const data = req.body;

        const existeUsuario = await UsuarioModel.getByCedula(data["cedula"]);
        console.log("voy por aqui");
        if (existeUsuario) {
            console.log("supuestamente ya existe");
            //res.status(400).json({ error: 'Ya existe un usuario con la cedula digitada'});
            //return
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