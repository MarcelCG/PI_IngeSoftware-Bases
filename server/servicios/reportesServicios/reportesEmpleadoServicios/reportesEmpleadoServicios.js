const Solicitud = require('../../../models/solicitudModel/solicitudModel');
const {EXITO} = require('../../../config/constantes');

async function reporteDiasUsados(cedula_empleado){
    try {
        const solicitudes = await Solicitud.getSolicitudByCedula(cedula_empleado);

        if (!solicitudes) {
            return solicitudes;
        }

        const solicitudesAprobadas = solicitudes.filter(solicitud => solicitud.estado === 'Aprobada');

        const fechaHoy = new Date();
        fechaHoy.setDate(fechaHoy.getDate() - 1); // Diferencia entre UTC y Hora estándar central

        const solicitudesSinGastar = solicitudesAprobadas.map
            (solicitud => {
                return {
                    politica: solicitud.politica,
                    fecha: solicitud.fecha_solicitud,
                    dias: solicitud.dias_libres_solicitados,
                    dias_sin_gastar: solicitud.dias_libres_solicitados,
                    dias_gastados: 0,
                    gastado: false,
                }
            })
        
        const solicitudesGastadas = solicitudesAprobadas.filter(solicitud => solicitud.inicio_fechas_solicitadas <= fechaHoy).map
            (solicitud => {
                return {
                    politica: solicitud.politica,
                    fecha:solicitud.inicio_fechas_solicitadas,
                    dias: solicitud.dias_libres_solicitados,
                    dias_sin_gastar: 0,
                    dias_gastados: solicitud.dias_libres_solicitados,
                    gastado: true
                }
            })

        const solicitudesResultantes = [...solicitudesSinGastar, ...solicitudesGastadas];

        return solicitudesResultantes;

    } catch(error) {
        console.error('Hubo un error en el servicio reporteDiasUsados: ', error);
        throw error;
    }
}

module.exports = {
    reporteDiasUsados,
}