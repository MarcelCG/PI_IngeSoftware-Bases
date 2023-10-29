const Solicitud = require('../../models/solicitudModel/solicitudModel');

async function aprobarSolicitud(id) {
    try {
        // Llama a la función getSolicitudById en el modelo de Solicitud
        const solicitud = await Solicitud.getSolicitudById(id);

        if (solicitud != null) {
            const accion = await Solicitud.aprobarSolicitud(id, 'Aprobada');

            if (accion) {
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

async function rechazarSolictud(id) {
    try {
        // Llama a la función getSolicitudById en el modelo de Solicitud
        const solicitud = await Solicitud.getSolicitudById(id);

        if (solicitud != null) {
            const accion = await Solicitud.rechazarSolicitud(id, 'Rechazada');

            if (accion) {
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
        console.error('Error en rechazarSolicitud:', error);
        throw new Error('Error al rechazar la solicitud: ' + error.message);
    }
}

module.exports = {
    aprobarSolicitud,
    rechazarSolictud,
};