const datosPrueba = [
    {
        inicio_fechas_solicitadas: '2023-11-20T00:00:00Z',
        dias_libres_solicitados: 2,
        horas_solicitadas: null,
        hora_de_inicio: null,
        nombre_completo: 'Juan Pérez',
        comentarios: 'Vacaciones solicitadas',
        estado: 'Aprobada'
    },
    {
        inicio_fechas_solicitadas: '2023-11-24T00:00:00Z',
        dias_libres_solicitados: 1,
        horas_solicitadas: 4,
        hora_de_inicio: new Date('2023-11-24T09:00:00.000Z'),
        nombre_completo: 'María García',
        comentarios: 'Trabajo medio día',
        estado: 'Aprobada'
    },
    {
        inicio_fechas_solicitadas: '2023-12-01T00:00:00Z',
        dias_libres_solicitados: 3,
        horas_solicitadas: null,
        hora_de_inicio: null,
        nombre_completo: 'Carlos Rodríguez',
        comentarios: 'Vacaciones extendidas',
        estado: 'Aprobada'
    },
    {
        inicio_fechas_solicitadas: '2023-12-05T00:00:00Z',
        dias_libres_solicitados: 2,
        horas_solicitadas: null,
        hora_de_inicio: null,
        nombre_completo: 'Laura Fernández',
        comentarios: 'Vacaciones de invierno',
        estado: 'Rechazada'
    },
    {
        inicio_fechas_solicitadas: '2023-12-10T00:00:00Z',
        dias_libres_solicitados: 1,
        horas_solicitadas: 2,
        hora_de_inicio: '2023-12-10T14:00:00Z',
        nombre_completo: 'Pedro Gómez',
        comentarios: 'Trabajo medio día',
        estado: 'Pendiente'
    }
];

const datosEsperados = [
    {
        nombre_empleado: 'Juan Pérez',
        fecha_inicio: new Date("2023-11-20T00:00:00Z"),
        fecha_final: new Date("2023-11-22T00:00:00Z"),
        comentarios: 'Vacaciones solicitadas'
    },
    {
        nombre_empleado: 'María García',
        fecha_inicio: new Date("2023-11-24T09:00:00Z"),
        fecha_final: new Date("2023-11-24T13:00:00Z"),
        comentarios: 'Trabajo medio día'
    },
    {
        nombre_empleado: 'Carlos Rodríguez',
        fecha_inicio: new Date("2023-12-01T00:00:00Z"),
        fecha_final: new Date("2023-12-06T00:00:00Z"),
        comentarios: 'Vacaciones extendidas'
    }
];

module.exports = {
    datosEsperados,
    datosPrueba,
};

  