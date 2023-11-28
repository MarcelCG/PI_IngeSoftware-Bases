const Servicio = require('../../../servicios/reportesServicios/reportesEmpleadoServicios/reportesEmpleadoServicios');
const {ERROR_INTERNO, EXITO, NO_ENCONTRADO} = require('../../../config/constantes');

async function reporteDiasUsados (req, res) {

    try {
        const { cedula_empleado } = req.params;
        if (cedula_empleado) {
            const diasUsados = await Servicio.reporteDiasUsados(cedula_empleado);
            res.status(EXITO).json(diasUsados);
        } else {
            res.status(NO_ENCONTRADO).json({message: "No se recibió una cédula"});
        }
    } catch (error) {
        res.status(ERROR_INTERNO).json({error: error.message});
    }
}

async function reporteDiasAcumulados (req, res) {

    try {
        const { cedula_empleado } = req.params;
        if (cedula_empleado) {
            const diasUsados = await Servicio.reporteDiasAcumulados(cedula_empleado);
            res.status(EXITO).json(diasUsados);
        } else {
            res.status(NO_ENCONTRADO).json({message: "No se recibió una cédula"});
        }
    } catch (error) {
        res.status(ERROR_INTERNO).json({error: error.message});
    }
}

async function reporteDashboard (req, res) {

    try {
        const { cedula_empleado } = req.params;
        if (cedula_empleado) {
            const dashboard = await Servicio.reporteDashboard(cedula_empleado);
            res.status(EXITO).json(dashboard);
        } else {
            res.status(NO_ENCONTRADO).json({message: "No se recibió una cédula"});
        }
    } catch (error) {
        res.status(ERROR_INTERNO).json({error: error.message});
    }
}

module.exports = {
    reporteDiasUsados,
    reporteDiasAcumulados,
    reporteDashboard,
}
