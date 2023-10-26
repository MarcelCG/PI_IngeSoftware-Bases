const UsuarioModel = require('../../../models/usuarioModel/usuariosModel.js');
const EmpleadoModel = require('../../../models/usuarioModel/Empleado/empleadoModel.js');

async function EditarUsuario(solicitud, respuesta) {
    try {
        
        const datos = solicitud.body;

        const cedula_empleado =  datos["cedula"];
        let telefono2 = null;
        if (datos["telefono2"] != "") {
            telefono2 = datos["telefono2"];
        }

        let correo2 = null;
        if (datos["correo2"] != "") {
            correo2 = datos["correo2"];
        }

        var success = await UsuarioModel.editarUsuario(
            cedula_empleado,
            datos["contrasena"],
            datos["nombre"],
            datos["primer_apellido"],
            datos["segundo_apellido"],
            datos["telefono1"],
            telefono2,
            datos["correo1"],
            correo2,
            true
        );

        success += await EmpleadoModel.editarEmpleado(
            cedula_empleado,
            datos["rol"],
            datos["fecha_contratacion"]
        )

        return success;
    }
    catch (error) {
        return error;
    }
}

async function EditarEmpleado(solicitud, respuesta) {
    try {

        const datos = solicitud.body;
        const cedula = datos["cedula"];
        const existeUsuario = await UsuarioModel.getByCedula(cedula);

        if (existeUsuario) {
            const success = await EditarUsuario(solicitud, respuesta);
            if (success) { 
                respuesta.status(201).json({ message: 'Empleado editado exitosamente' });
            } else {
                respuesta.status(500).json({ message: 'Hubo un error al editar al empleado' });
            }
        }
        else {
            respuesta.status(409).json({ message: 'No se encontro al empleado' });
        }

    } catch (error) {
        console.log("Error en registrarEmpleado");
        respuesta.status(500).json({ error: error.message });
    }
};

module.exports = {
    EditarEmpleado
};