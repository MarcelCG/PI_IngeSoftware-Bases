const usuarioModelo = require('../../models/usuarioModel/usuariosModel');

//Funcion que procesa y envia la solicitud al modelo de la base de datos.
async function editarPerfil(solicitud, respuesta) {
    try {
        //Se procesan los datos 
        const datos = solicitud.body;

        let telefono2 = null;

        if (datos["telefono2"] != "") {
            telefono2 = datos["telefono2"];
        }

        let correo2 = null;
        if (datos["correo2"] != "") {
            correo2 = datos["correo2"];
        }

        //Se envian los datos al modelo  
        var exito = await usuarioModelo.editarUsuario(
            datos["cedula"],
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

        
        return exito;
    }
    catch (error) {
        return error;
    }
}

module.exports = {
    editarPerfil
};