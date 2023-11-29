const datosPruebaSolicitudesAprobadas = [
    {
        "id": "60",
        "cedula_empleado": "4-5678-9123",
        "titulo_politica": "Prueba Calendario",
        "cedula_empresa": "9123456789",
        "fecha_solicitud": "2023-11-20T00:00:00.000Z",
        "inicio_fechas_solicitadas": "2023-11-24T00:00:00.000Z",
        "dias_libres_solicitados": 1,
        "hora_de_inicio": null,
        "horas_solicitadas": null,
        "estado": "Pendiente",
        "comentarios": "Pendiente"
    },
    {
        "id": "66",
        "cedula_empleado": "4-5678-9123",
        "titulo_politica": "Prueba Calendario3",
        "cedula_empresa": "9123456789",
        "fecha_solicitud": "2023-11-20T00:00:00.000Z",
        "inicio_fechas_solicitadas": "2023-11-24T00:00:00.000Z",
        "dias_libres_solicitados": 1,
        "hora_de_inicio": null,
        "horas_solicitadas": null,
        "estado": "Pendiente",
        "comentarios": "Pendiente"
    },
    {
        "id": "65",
        "cedula_empleado": "4-5678-9123",
        "titulo_politica": "Prueba Calendario2",
        "cedula_empresa": "9123456789",
        "fecha_solicitud": "2023-11-20T00:00:00.000Z",
        "inicio_fechas_solicitadas": "2023-11-24T00:00:00.000Z",
        "dias_libres_solicitados": 1,
        "hora_de_inicio": null,
        "horas_solicitadas": null,
        "estado": "Pendiente",
        "comentarios": "Pendiente"
    },
    {
        "id": "61",
        "cedula_empleado": "4-5678-9123",
        "titulo_politica": "Prueba Calendario4",
        "cedula_empresa": "9123456789",
        "fecha_solicitud": "2023-11-20T00:00:00.000Z",
        "inicio_fechas_solicitadas": "2023-11-24T00:00:00.000Z",
        "dias_libres_solicitados": 1,
        "hora_de_inicio": null,
        "horas_solicitadas": null,
        "estado": "Pendiente",
        "comentarios": "Pendiente"
    }
]

const datosPruebaLibresPorPoliticaDeEmpresa = [
    {
        "titulo_politica": "DWAYNE JONSHON",
        "total_dias_libres_disponibles": 57
    },
    {
        "titulo_politica": "in middle",
        "total_dias_libres_disponibles": 0
    },
    {
        "titulo_politica": "Politica 1",
        "total_dias_libres_disponibles": 951.39
    },
    {
        "titulo_politica": "Politica 3",
        "total_dias_libres_disponibles": 951.39
    },
    {
        "titulo_politica": "Politica 7",
        "total_dias_libres_disponibles": 951.39
    }
]

const datosPruebaLibresPorEmpleadoPorPoliticaDeEmpresa = [
    {
        "nombre": "b",
        "primer_apellido": "Doe",
        "cedula_empleado": "2",
        "telefono1": "2",
        "titulo_politica": "DWAYNE JONSHON",
        "dias_libres_disponibles": 27
    },
    {
        "nombre": "b",
        "primer_apellido": "Doe",
        "cedula_empleado": "2",
        "telefono1": "2",
        "titulo_politica": "in middle",
        "dias_libres_disponibles": 0
    },
    {
        "nombre": "b",
        "primer_apellido": "Doe",
        "cedula_empleado": "2",
        "telefono1": "2",
        "titulo_politica": "Politica 1",
        "dias_libres_disponibles": 317.13
    },
    {
        "nombre": "b",
        "primer_apellido": "Doe",
        "cedula_empleado": "2",
        "telefono1": "2",
        "titulo_politica": "Politica 3",
        "dias_libres_disponibles": 317.13
    },
    {
        "nombre": "b",
        "primer_apellido": "Doe",
        "cedula_empleado": "2",
        "telefono1": "2",
        "titulo_politica": "Politica 7",
        "dias_libres_disponibles": 317.13
    },
    {
        "nombre": "c",
        "primer_apellido": "c",
        "cedula_empleado": "3",
        "telefono1": "2",
        "titulo_politica": "DWAYNE JONSHON",
        "dias_libres_disponibles": 15
    }
]

const datosPruebaBitacoraLibres = [
    {
        "id": "1",
        "cedula_empleado": "3",
        "titulo_politica": "Politica 1",
        "cedula_empresa": "ABC123",
        "dias": 2,
        "fecha": "2023-11-25T00:00:00.000Z",
        "total_actual": null
    },
    {
        "id": "2",
        "cedula_empleado": "3",
        "titulo_politica": "Politica 3",
        "cedula_empresa": "ABC123",
        "dias": 2,
        "fecha": "2023-11-25T00:00:00.000Z",
        "total_actual": null
    },
    {
        "id": "3",
        "cedula_empleado": "2",
        "titulo_politica": "DWAYNE JONSHON",
        "cedula_empresa": "ABC123",
        "dias": 15,
        "fecha": "2023-11-25T00:00:00.000Z",
        "total_actual": null
    },
    {
        "id": "4",
        "cedula_empleado": "3",
        "titulo_politica": "DWAYNE JONSHON",
        "cedula_empresa": "ABC123",
        "dias": 15,
        "fecha": "2023-11-25T00:00:00.000Z",
        "total_actual": null
    },
    {
        "id": "5",
        "cedula_empleado": "4",
        "titulo_politica": "DWAYNE JONSHON",
        "cedula_empresa": "ABC123",
        "dias": 15,
        "fecha": "2023-11-25T00:00:00.000Z",
        "total_actual": null
    },
    {
        "id": "6",
        "cedula_empleado": "2",
        "titulo_politica": "Politica 1",
        "cedula_empresa": "ABC123",
        "dias": 314.94,
        "fecha": "2023-11-25T00:00:00.000Z",
        "total_actual": null
    },
    {
        "id": "7",
        "cedula_empleado": "3",
        "titulo_politica": "Politica 1",
        "cedula_empresa": "ABC123",
        "dias": 314.94,
        "fecha": "2023-11-25T00:00:00.000Z",
        "total_actual": null
    },
    {
        "id": "8",
        "cedula_empleado": "4",
        "titulo_politica": "Politica 1",
        "cedula_empresa": "ABC123",
        "dias": 314.94,
        "fecha": "2023-11-25T00:00:00.000Z",
        "total_actual": null
    }
]

const datosEsperadosReporteDiasSolicitadosPorPolitica = {
    "DiasLibresPorPolitica": datosPruebaLibresPorPoliticaDeEmpresa,
    "SolicitudesAprobadas": datosPruebaSolicitudesAprobadas
}

const datosEsperadosReporteDiasSolicitadosPorPoliticaVacio = {
    "DiasLibresPorPolitica": [],
    "SolicitudesAprobadas": []
}

const datosEsperadosReporteDiasGastadosPorEmpleadoPorPolitica = {
    "SolicitudesAprobadas": datosPruebaSolicitudesAprobadas,
    "LibresEmpresa": datosPruebaLibresPorEmpleadoPorPoliticaDeEmpresa
}

const datosEsperadosReporteDiasGastadosPorEmpleadoPorPoliticaVacio = {
    "SolicitudesAprobadas": [],
    "LibresEmpresa": []
}

module.exports = {
    datosPruebaSolicitudesAprobadas,
    datosPruebaLibresPorPoliticaDeEmpresa,
    datosPruebaLibresPorEmpleadoPorPoliticaDeEmpresa,
    datosPruebaBitacoraLibres,
    datosEsperadosReporteDiasSolicitadosPorPolitica,
    datosEsperadosReporteDiasSolicitadosPorPoliticaVacio,
    datosEsperadosReporteDiasGastadosPorEmpleadoPorPolitica,
    datosEsperadosReporteDiasGastadosPorEmpleadoPorPoliticaVacio
}