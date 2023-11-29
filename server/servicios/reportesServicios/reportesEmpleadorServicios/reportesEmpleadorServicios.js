const BitacoraModelo = require('../../../models/bitacoraModelo/bitacoraLibresModelo')
const LibresModel = require('../../../models/libresModel/libresModel');
const SolicitudModel = require('../../../models/solicitudModel/solicitudModel');

async function obtenerInfoReporteDiasSolicitadosPorPolitica(cedula_empresa) {
    try {
        [DiasLibresPorPolitica, SolicitudesAprobadas] = await Promise.all([
           LibresModel.obtenerLibresPorPoliticaPorEmpresa(cedula_empresa),
           SolicitudModel.obtenerSolicitudesAprobadasPorEmpresa(cedula_empresa)
       ]);

       return {SolicitudesAprobadas, DiasLibresPorPolitica};
    } catch (error) {
        console.error("Error al obtener los datos", error);
        return error;
    }
}

async function obtenerInfoReporteDiasGeneradosPorPolitica(cedula_empresa) {
    try {
        const bitacoraLibres = await BitacoraModelo.obtenerTodosPorEmpresa(cedula_empresa);
        return bitacoraLibres;
    } catch (error) {
        console.error("Error al obtener los datos", error);
        return error;
    }
}

async function obtenerSolicitudesPorEmpresaReporte(cedula_empresa) {
    try {
        [SolicitudesAprobadas, LibresEmpresa] = await Promise.all([
            SolicitudModel.obtenerSolicitudesAprobadasPorEmpresa(cedula_empresa),
            LibresModel.obtenerLibresPorEmpresaReporte(cedula_empresa)
        ]);
        return {SolicitudesAprobadas, LibresEmpresa};
    } catch (error) {
        console.error("Error al obtener los datos", error);
        return error;
    }
}

module.exports = {
    obtenerInfoReporteDiasSolicitadosPorPolitica,
    obtenerInfoReporteDiasGeneradosPorPolitica,
    obtenerSolicitudesPorEmpresaReporte
};