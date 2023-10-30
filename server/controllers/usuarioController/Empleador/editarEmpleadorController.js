const UsuarioModel = require('../../../models/usuarioModel/usuariosModel.js');

async function editarPerfilEmpleador(solicitud, respuesta) {
    try {
        
        const datos = solicitud.body;

        let telefono2 = null;

        if (datos["telefono2"] != "") {
            telefono2 = datos["telefono2"];
        }

        let correo2 = null;
        if (datos["correo2"] != "") {
            correo2 = datos["correo2"];
        }

        var exito = await UsuarioModel.editarPerfilEmpleador(
            datos["cedula"],
            datos["nombre"],
            datos["primer_apellido"],
            datos["segundo_apellido"],
            datos["telefono1"],
            telefono2,
            datos["correo1"],
            correo2
        );
        console.log("exito: ");
        console.log(exito);
        return exito;
    }
    catch (error) {
        return error;
    }
}

async function EditarEmpleador(solicitud, respuesta) {
    try {
        console.log("perrito");
        const datos = solicitud.body;
        const cedula = datos["cedula"];
        const existeUsuario = await UsuarioModel.getByCedula(cedula);

        if (existeUsuario) {
            console.log("existe");
            const exito = await editarPerfilEmpleador(solicitud, respuesta);
            console.log(exito);
            if (exito) { 
                respuesta.status(201).json({ message: 'Empleado editado exitosamente' });
            } else {
                respuesta.status(500).json({ message: 'Hubo un error al editar al empleado' });
            }
        }
        else {
            console.log("no existe");
            respuesta.status(409).json({ message: 'No se encontro al empleado' });
        }

    } catch (error) {
        console.log("Error en registrarEmpleado");
        respuesta.status(500).json({ error: error.message });
    }
};

module.exports = {
    EditarEmpleador
};