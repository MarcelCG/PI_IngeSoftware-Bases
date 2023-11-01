const empleadorServicios = require('../../../servicios/usuarioServicios/empleadorServicios/empleadorServicios');
const usuarioModelo = require('../../../models/usuarioModel/usuariosModel');

//Funcion que verifica si existe un usuario y de haberlo procesa la edicion
async function EditarEmpleador(solicitud, respuesta) {
    try {
        const datos = solicitud.body;
        const cedula = datos["cedula"];
        //Funcion que verifica si existe el usuario
        const existeUsuario = await usuarioModelo.getByCedula(cedula);

        if (existeUsuario) {
            //Se procesa la edicion del empleador a traves de la funcion del servicio
            const exito = await empleadorServicios.editarPerfilEmpleador(solicitud, respuesta);
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