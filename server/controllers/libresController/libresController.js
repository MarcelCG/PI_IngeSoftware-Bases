const Libres = require('../../models/libresModel/libresModel');

// Obtener todos los registros de la tabla Libres
async function getAllLibres(req, res) {
    try {
        const libres = await Libres.getAll();
        res.status(200).json(libres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener registros de la tabla Libres por cédula de empleado
async function getLibresByEmpleado(req, res) {
    try {
        const { cedula_empleado } = req.params;
        const libres = await Libres.getByEmpleado(cedula_empleado);
        res.status(200).json(libres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener registros de la tabla Libres por título de política y cédula de empresa
async function getLibresByPolitica(req, res) {
    try {
        const { titulo_politica, cedula_empresa } = req.params;
        const libres = await Libres.getByPolitica(titulo_politica, cedula_empresa);
        res.status(200).json(libres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener registros de la tabla Libres por cédula de empleado, título de política y cédula de empresa
async function getLibresByEmpleadoAndPolitica(req, res) {
    try {
        const { cedula_empleado, titulo_politica, cedula_empresa } = req.params;
        const libres = await Libres.getByEmpleadoAndPolitica(cedula_empleado, titulo_politica, cedula_empresa);
        res.status(200).json(libres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo registro en la tabla Libres
async function createLibre(req, res) {
    try {
        const {
            cedula_empleado,
            titulo_politica,
            cedula_empresa,
            dias_libres_disponibles,
            dias_libres_utilizados
        } = req.body;

        const success = await Libres.createLibre(
            cedula_empleado,
            titulo_politica,
            cedula_empresa,
            dias_libres_disponibles,
            dias_libres_utilizados
        );

        if (success) {
            res.status(201).json({ message: 'Registro de Libres creado exitosamente' });
        } else {
            res.status(500).json({ message: 'No se pudo crear el registro de Libres' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllLibres,
    getLibresByEmpleado,
    getLibresByPolitica,
    getLibresByEmpleadoAndPolitica,
    createLibre
};