const Solicitud = require('../../models/solicitudModel/solicitudModel');

async function aprobarSolicitud(id) {
    try {
        // Llama a la función getSolicitudById en el modelo de Solicitud
        const solicitud = await Solicitud.getSolicitudById(id);

        if (solicitud != null) {
            const accion = await Solicitud.aprobarSolicitud(id, 'Aprobada');

            if (accion) {
                console.log('Actualizad, listo');
                return true;
            } else {
                console.error('Error Inesperado al actualizar el estado');
                return false;
            }
        } else {
            console.error('No se encontró la solicitud');
            return false;
        }
    } catch (error) {
        console.error('Error en aprobarSolicitud:', error);
        throw new Error('Error al aprobar la solicitud: ' + error.message);
    }
}

async function rechazarSolictud() {

}

module.exports = {
    aprobarSolicitud,
    rechazarSolictud,
};