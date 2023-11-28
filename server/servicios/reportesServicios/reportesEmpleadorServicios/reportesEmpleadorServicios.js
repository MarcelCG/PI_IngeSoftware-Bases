const BitacoraModelo = require('../../../models/bitacoraModelo/bitacoraLibresModelo')
const LibresModel = require('../../../models/libresModel/libresModel');
const SolicitudModel = require('../../../models/solicitudModel/solicitudModel');

async function obtenerInfoReporteDiasSolicitadosPorPolitica(cedula_empresa) {
    try {
        [DiasLibresPorPolitica, LibresEmpresa, SolicitudesAprobadas] = await Promise.all([
           LibresModel.obtenerLibresPorPoliticaPorEmpresa(cedula_empresa),
           LibresModel.obtenerPorEmpresa(cedula_empresa),
           SolicitudModel.obtenerSolicitudesAprobadasPorEmpresa(cedula_empresa)
       ]);

       return {SolicitudesAprobadas, LibresEmpresa, DiasLibresPorPolitica};
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

module.exports = {
    obtenerInfoReporteDiasSolicitadosPorPolitica,
    obtenerInfoReporteDiasGeneradosPorPolitica
};