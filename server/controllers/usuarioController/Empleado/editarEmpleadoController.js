const editarEmpleadoServicio = require('../../../servicios/usuarioServicios/empleadoServicios/editarEmpleadoServicios')
const UsuarioModel = require('../../../models/usuarioModel/usuariosModel');
async function EditarEmpleado(solicitud, respuesta) {
    try {

        const datos = solicitud.body;
        const cedula = datos["cedula"];
        const existeUsuario = await UsuarioModel.getByCedula(cedula);

        if (existeUsuario) {
            const exito = await editarEmpleadoServicio.EditarUsuario(solicitud, respuesta);
            if (exito) { 
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