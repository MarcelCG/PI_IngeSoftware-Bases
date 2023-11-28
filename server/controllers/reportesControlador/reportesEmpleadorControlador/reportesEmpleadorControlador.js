const ReporteServicios = require('../../../servicios/reportesServicios/reportesEmpleadorServicios/reportesEmpleadorServicios');

async function obtenerInfoReporteDiasSolicitadosPorPolitica(req, res) {
    try {
        const {cedula_empresa} = req.params;
        const infoReporteDiasSolicitadosPorPolitica =
         await ReporteServicios.obtenerInfoReporteDiasSolicitadosPorPolitica(cedula_empresa)
        res.status(200).json(infoReporteDiasSolicitadosPorPolitica);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obtenerInfoReporteDiasGastadosPorPolitica(req, res) {
    try {
        const {cedula_empresa} = req.params;
        const bitacoraLibres =
         await ReporteServicios.obtenerInfoReporteDiasGeneradosPorPolitica(cedula_empresa)
        res.status(200).json(bitacoraLibres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    obtenerInfoReporteDiasSolicitadosPorPolitica,
    obtenerInfoReporteDiasGastadosPorPolitica
};