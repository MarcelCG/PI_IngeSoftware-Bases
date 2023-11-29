const Solicitud = require('../../../models/solicitudModel/solicitudModel');
const BitacoraLibres = require('../../../models/bitacoraModelo/bitacoraLibresModelo');
const {EXITO} = require('../../../config/constantes');

const JORNADA_LABORAL = 8;

function formatoSolicitud(solicitud, gastado = false, aprobada = false) {

    var dias_libres_solicitados = solicitud.dias_libres_solicitados;
    if (solicitud.horas_solicitadas) {
        dias_libres_solicitados = solicitud.horas_solicitadas / JORNADA_LABORAL;

    }

    const solicitudFormateada = {
        politica: solicitud.politica,
        fecha_inicio: (gastado || aprobada) ? solicitud.inicio_fechas_solicitadas : solicitud.fecha_solicitud,
        fecha_final: (gastado || aprobada) ? solicitud.inicio_fechas_solicitadas : solicitud.fecha_solicitud,
        dias_solicitados: aprobada ? 0 : dias_libres_solicitados,
        dias_sin_gastar: gastado ? 0 : dias_libres_solicitados,
        dias_gastados: gastado ? dias_libres_solicitados : 0,
        gastado,
        dias_totales: 0,
        dias_aprobados: aprobada ? dias_libres_solicitados : 0,
        totales: false,
    }

    return solicitudFormateada;
}

function formatoBitacora(fechaObtenido, totales = false) {
    return {
        politica: fechaObtenido.titulo_politica,
        fecha_inicio: totales ? new Date() : fechaObtenido.fecha,
        fecha_final: fechaObtenido.fecha,
        dias_solicitados: totales ? 0 : fechaObtenido.dias,
        dias_totales: totales ? fechaObtenido.total_actual : 0,
        dias_aprobados: 0,
        totales,
    };
}

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
            (solicitud => formatoSolicitud(solicitud));
        
        const solicitudesGastadas = solicitudesAprobadas.filter(solicitud => solicitud.inicio_fechas_solicitadas <= fechaHoy).map
            (solicitud => formatoSolicitud(solicitud, gastado = true));

        const solicitudesResultantes = [...solicitudesSinGastar, ...solicitudesGastadas];

        return solicitudesResultantes;

    } catch(error) {
        console.error('Hubo un error en el servicio reporteDiasUsados: ', error);
        throw error;
    }
}

async function reporteDiasAcumulados (cedula_empleado) {
    try {
        const fechasLibresObtenidos = await BitacoraLibres.obtenerTodosPorEmpleado(cedula_empleado);
        if (fechasLibresObtenidos.length <= 0) {
            return fechasLibresObtenidos;
        }

        return fechasLibresObtenidos.map(fechaObtenido => formatoBitacora(fechaObtenido));
    } catch (error) {
        console.error('Hubo un error en el servicio reporteDiasAcumulados: ', error);
        throw error;
    }
}

async function reporteDashboard (cedula_empleado) {
    try {
        const solicitudes = await Solicitud.getSolicitudByCedula(cedula_empleado);
        const fechasLibresObtenidos = await BitacoraLibres.obtenerTodosPorEmpleado(cedula_empleado);

        const solicitudesFormateadas = solicitudes.map
        (solicitud => formatoSolicitud(solicitud));

        const fechaHoy = new Date();
        fechaHoy.setDate(fechaHoy.getDate());

        const solicitudesAprobadas = solicitudes.filter(solicitud => solicitud.estado === 'Aprobada' &&
        solicitud.inicio_fechas_solicitadas <= fechaHoy).map
        (solicitud => formatoSolicitud(solicitud, gastado = false, aprobada = true));

        const fechasLibresTotales = fechasLibresObtenidos.map
        (fechaObtenido => formatoBitacora(fechaObtenido, totales = true));


        return [...solicitudesFormateadas, ...solicitudesAprobadas, ...fechasLibresTotales];
    } catch (error) {
        console.error('Hubo un error en el servicio reporteDasboard: ', error);
        throw error;
    }
}

module.exports = {
    reporteDiasUsados,
    reporteDiasAcumulados,
    reporteDashboard,
}