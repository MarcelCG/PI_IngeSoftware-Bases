const datosPruebaSolicitudes = [
    {
        nombre_completo: 'Juan Pérez',
        cedula: '1-2345-6789',
        politica: 'Vacaciones Anuales',
        fecha_solicitud: new Date('2023-11-15'),
        inicio_fechas_solicitadas: new Date('2023-11-16'),
        dias_libres_solicitados: 5,
        hora_de_inicio: new Date('2023-11-16T08:00:00.000Z'),
        horas_solicitadas: null,
        estado: 'Aprobada',
        comentarios: 'Disfrutando del tiempo libre'
    },
    {
        nombre_completo: 'María Rodríguez',
        cedula: '2-3456-7890',
        politica: 'Licencia por Enfermedad',
        fecha_solicitud: new Date('2023-10-10'),
        inicio_fechas_solicitadas: new Date('2023-10-11'),
        dias_libres_solicitados: 3,
        hora_de_inicio: null,
        horas_solicitadas: null,
        estado: 'Aprobada',
        comentarios: 'Recuperándome de un resfriado'
    },
    {
        nombre_completo: 'Carlos González',
        cedula: '3-4567-8901',
        politica: 'Permiso por Maternidad',
        fecha_solicitud: new Date('2023-09-05'),
        inicio_fechas_solicitadas: new Date('2023-09-10'),
        dias_libres_solicitados: 15,
        hora_de_inicio: new Date('2023-09-10T09:00:00.000Z'),
        horas_solicitadas: null,
        estado: 'Pendiente',
        comentarios: 'Esperando la llegada del bebé'
    },
    {
        nombre_completo: 'Ana Martínez',
        cedula: '4-5678-9012',
        politica: 'Días de Compensación',
        fecha_solicitud: new Date('2023-11-01'),
        inicio_fechas_solicitadas: new Date('2023-11-02'),
        dias_libres_solicitados: 1,
        hora_de_inicio: new Date('2023-11-02T10:30:00.000Z'),
        horas_solicitadas: 6,
        estado: 'Rechazada',
        comentarios: 'No hay disponibilidad en el equipo'
    },
    {
        nombre_completo: 'Laura Díaz',
        cedula: '5-6789-0123',
        politica: 'Vacaciones Anuales',
        fecha_solicitud: new Date('2023-12-01'),
        inicio_fechas_solicitadas: new Date('2023-12-10'),
        dias_libres_solicitados: 7,
        hora_de_inicio: null,
        horas_solicitadas: null,
        estado: 'Aprobada',
        comentarios: 'Planificando un viaje'
    }
];

const datosPruebaBitacora = [
    {
        id: '101',
        cedula_empleado: '1-2345-6789',
        titulo_politica: 'Vacaciones Anuales',
        cedula_empresa: '9876543210',
        dias: 10,
        fecha: new Date('2023-11-15T00:00:00.000Z'),
        total_actual: 1,
    },
    {
        id: '202',
        cedula_empleado: '2-3456-7890',
        titulo_politica: 'Días de Enfermedad',
        cedula_empresa: '8765432109',
        dias: 5,
        fecha: new Date('2023-10-05T00:00:00.000Z'),
        total_actual: 12,
    },
    {
        id: '303',
        cedula_empleado: '3-4567-8901',
        titulo_politica: 'Días Compensatorios',
        cedula_empresa: '7654321098',
        dias: 7,
        fecha: new Date('2023-11-20T00:00:00.000Z'),
        total_actual: 0,
    }
];

const datosEsperadosRepAcumulados = [
    {
        politica: 'Vacaciones Anuales',
        fecha_inicio: new Date('2023-11-15T00:00:00.000Z'),
        fecha_final: new Date('2023-11-15T00:00:00.000Z'),
        dias_solicitados: 10,
        dias_totales: 0,
        dias_aprobados: 0,
        totales: false,
    },
    {
        politica: 'Días de Enfermedad',
        fecha_inicio: new Date('2023-10-05T00:00:00.000Z'),
        fecha_final: new Date('2023-10-05T00:00:00.000Z'),
        dias_solicitados: 5,
        dias_totales: 0,
        dias_aprobados: 0,
        totales: false,
    },
    {
        politica: 'Días Compensatorios',
        fecha_inicio: new Date('2023-11-20T00:00:00.000Z'),
        fecha_final: new Date('2023-11-20T00:00:00.000Z'),
        dias_solicitados: 7,
        dias_totales: 0,
        dias_aprobados: 0,
        totales: false,
    }
];

const datosEsperadosRepUsados = [
    {
        politica: 'Vacaciones Anuales',
        fecha_inicio: new Date('2023-11-15'),
        fecha_final: new Date('2023-11-15'),
        dias_solicitados: 5,
        dias_sin_gastar: 5,
        dias_gastados: 0,
        gastado: false,
        dias_totales: 0,
        dias_aprobados: 0,
        totales: false,
    },
    {
        politica: 'Licencia por Enfermedad',
        fecha_inicio: new Date('2023-10-10'),
        fecha_final: new Date('2023-10-10'),
        dias_solicitados: 3,
        dias_sin_gastar: 3,
        dias_gastados: 0,
        gastado: false,
        dias_totales: 0,
        dias_aprobados: 0,
        totales: false,
    },
    {
        politica: 'Vacaciones Anuales',
        fecha_inicio: new Date('2023-12-01'),
        fecha_final: new Date('2023-12-01'),
        dias_solicitados: 7,
        dias_sin_gastar: 7,
        dias_gastados: 0,
        gastado: false,
        dias_totales: 0,
        dias_aprobados: 0,
        totales: false,
    },
    {
        politica: 'Vacaciones Anuales',
        fecha_inicio: new Date('2023-11-16'),
        fecha_final: new Date('2023-11-16'),
        dias_solicitados: 5,
        dias_sin_gastar: 0,
        dias_gastados: 5,
        gastado: true,
        dias_totales: 0,
        dias_aprobados: 0,
        totales: false,
    },
    {
        politica: 'Licencia por Enfermedad',
        fecha_inicio: new Date('2023-10-11'),
        fecha_final: new Date('2023-10-11'),
        dias_solicitados: 3,
        dias_sin_gastar: 0,
        dias_gastados: 3,
        gastado: true,
        dias_totales: 0,
        dias_aprobados: 0,
        totales: false,
    },
];

const datosEsperadosRepDashboard = [
    {
        politica: 'Vacaciones Anuales',
        fecha_inicio: new Date('2023-11-15'),
        fecha_final: new Date('2023-11-15'),
        dias_solicitados: 5,
        dias_sin_gastar: 5,
        dias_gastados: 0,
        gastado: false,
        dias_totales: 0,
        dias_aprobados: 0,
        totales: false,
    },
    {
        politica: 'Licencia por Enfermedad',
        fecha_inicio: new Date('2023-10-10'),
        fecha_final: new Date('2023-10-10'),
        dias_solicitados: 3,
        dias_sin_gastar: 3,
        dias_gastados: 0,
        gastado: false,
        dias_totales: 0,
        dias_aprobados: 0,
        totales: false,
    },
    {
        politica: 'Permiso por Maternidad',
        fecha_inicio: new Date('2023-09-05'),
        fecha_final: new Date('2023-09-05'),
        dias_solicitados: 15,
        dias_sin_gastar: 15,
        dias_gastados: 0,
        gastado: false,
        dias_totales: 0,
        dias_aprobados: 0,
        totales: false,
    },
    {
        politica: 'Días de Compensación',
        fecha_inicio: new Date('2023-11-01'),
        fecha_final: new Date('2023-11-01'),
        dias_solicitados: 0.75,
        dias_sin_gastar: 0.75,
        dias_gastados: 0,
        gastado: false,
        dias_totales: 0,
        dias_aprobados: 0,
        totales: false,
    },
    {
        politica: 'Vacaciones Anuales',
        fecha_inicio: new Date('2023-12-01'),
        fecha_final: new Date('2023-12-01'),
        dias_solicitados: 7,
        dias_sin_gastar: 7,
        dias_gastados: 0,
        gastado: false,
        dias_totales: 0,
        dias_aprobados: 0,
        totales: false,
    },
    {
        politica: 'Vacaciones Anuales',
        fecha_inicio: new Date('2023-11-16'),
        fecha_final: new Date('2023-11-16'),
        dias_solicitados: 0,
        dias_sin_gastar: 5,
        dias_gastados: 0,
        gastado: false,
        dias_totales: 0,
        dias_aprobados: 5,
        totales: false,
    },
    {
        politica: 'Licencia por Enfermedad',
        fecha_inicio: new Date('2023-10-11'),
        fecha_final: new Date('2023-10-11'),
        dias_solicitados: 0,
        dias_sin_gastar: 3,
        dias_gastados: 0,
        gastado: false,
        dias_totales: 0,
        dias_aprobados: 3,
        totales: false,
    },
    {
        politica: 'Vacaciones Anuales',
        fecha_inicio: new Date('2023-11-27T12:00:00'),
        fecha_final: new Date('2023-11-15T00:00:00.000Z'),
        dias_solicitados: 0,
        dias_totales: 1,
        dias_aprobados: 0,
        totales: true,
    },
    {
        politica: 'Días de Enfermedad',
        fecha_inicio: new Date('2023-11-27T12:00:00'),
        fecha_final: new Date('2023-10-05T00:00:00.000Z'),
        dias_solicitados: 0,
        dias_totales: 12,
        dias_aprobados: 0,
        totales: true,
    },
    {
        politica: 'Días Compensatorios',
        fecha_inicio: new Date('2023-11-27T12:00:00'),
        fecha_final: new Date('2023-11-20T00:00:00.000Z'),
        dias_solicitados: 0,
        dias_totales: 0,
        dias_aprobados: 0,
        totales: true,
    }
]

module.exports = {
    datosPruebaSolicitudes,
    datosPruebaBitacora,
    datosEsperadosRepAcumulados,
    datosEsperadosRepUsados,
    datosEsperadosRepDashboard,
}