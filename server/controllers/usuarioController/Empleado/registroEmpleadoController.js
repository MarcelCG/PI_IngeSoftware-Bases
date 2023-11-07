const UsuarioModel = require('../../../models/usuarioModel/usuariosModel.js');
const EmpleadoModel = require('../../../models/usuarioModel/Empleado/empleadoModel.js');
const EmpresasModel = require('../../../models/empresaModel/empresasModel.js')

async function RegistrarUsuario(req, res) {
    try {
        const data = req.body;
        const cedula_empleado =  data["cedula"];
        let telefono2 = null;
        if (data["telefono2"] != "") {
            telefono2 = data["telefono2"];
        }

        let correo2 = null;
        if (data["correo2"] != "") {
            correo2 = data["correo2"];
        }

        var success = await UsuarioModel.createUsuario(
            cedula_empleado,
            data["contrasena"],
            data["nombre"],
            data["primer_apellido"],
            data["segundo_apellido"],
            data["telefono1"],
            telefono2,
            data["correo1"],
            correo2,
            true
        );

        success += await EmpleadoModel.createEmpleado(
            cedula_empleado,
            data["empresa"],
            data["rol"],
            data["fecha_contratacion"]
        )

        return success;
    }
    catch (error) {
        return error;
    }
}

async function RegistrarEmpleado(req, res) {
    try {

        const data = req.body;
        const cedula = data["cedula"];
        const existeUsuario = await UsuarioModel.getByCedula(cedula);

        if (existeUsuario) {
            res.status(409).json({  message: 'Empleado ya existe' });
            return;
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