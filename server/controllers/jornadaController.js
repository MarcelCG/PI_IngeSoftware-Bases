const Jornada = require('../models/jornadaModel');

// Obtener todas las jornadas
async function getAllJornadas(req, res) {
    try {
        const jornadas = await Jornada.getAll();
        res.status(200).json(jornadas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear una nueva jornada
async function createJornada(req, res) {
    try {
        const {
            cedula_empleado,
            dia_inicial,
            dia_final,
            hora_inicio,
            cantidad_horas,
        } = req.body;

        // Llama a la función createJornada que inserta en la tabla "Jornada"
        const success = await Jornada.createJornada(
            cedula_empleado,
            dia_inicial,
            dia_final,
            hora_inicio,
            cantidad_horas
        );

        if (success) {
            res.status(201).json({ message: 'Jornada creada exitosamente' });
        } else {
            res.status(500).json({ message: 'No se pudo crear la jornada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controlador para obtener una jornada por la cédula del empleado
async function getJornadaByCedula(req, res) {
    try {
        const { cedula_empleado } = req.params; // Obtiene la cédula del empleado de los parámetros de la URL
        // Llama a la función getJornadaByCedula en el modelo de Jornada
        const jornada = await Jornada.getJornadaByCedula(cedula_empleado);

        if (jornada !== null) {
            // Si se encontró una jornada con esa cédula de empleado, la retornamos
            res.status(200).json(jornada);
        } else {
            // Si no se encontró ninguna jornada con esa cédula de empleado, respondemos con un mensaje de error
            res.status(404).json({ error: 'Jornada no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Otros controladores para operaciones adicionales con Jornadas pueden ser agregados aquí

module.exports = {
    getAllJornadas,
    createJornada,
    getJornadaByCedula,
    // Agrega aquí otros controladores según tus necesidades
};
