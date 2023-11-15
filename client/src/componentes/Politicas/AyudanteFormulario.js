// Mensajes de error estándar
export const mensajesError = {
    required: "Este campo es obligatorio",
};

// Patrones de validación específicos para cada campo
export const obtenerPatronesValidacion = (disableIncremental) => {
    return {
        periodo: {
            pattern: {
            value: /^[1-9]\d*$/,
            message: "Este campo debe ser mayor a 0"
            },
        },
        dias_a_dar: {
            pattern: {
            value: /^[1-9]\d*$/,
            message: "Este campo debe ser mayor a 0"
            },
        },
        dias_a_incrementar: {
            pattern: {
            value: !disableIncremental ? /^[1-9]\d*$/ : '',
            message: "Este campo debe ser mayor a 0"
            },
        },
    }
};

// Esta función prepara los datos antes de enviarlos
export const transformarDatosAntesDeEnviar = (datos) => {
    return {
      titulo: datos.titulo,
      periodo: datos.periodo * (datos.unidad_periodo === "1/8" ? (1/8): datos.unidad_periodo),
      fecha_inicio: datos.inicia_desde_contrato ? '2023-01-01': datos.fecha_inicio,
      fecha_final: datos.fecha_final,
      inicia_desde_contrato: datos.inicia_desde_contrato,
      dias_a_dar: datos.dias_a_dar * (datos.unidad_a_dar === "1/8" ? (1/8): datos.unidad_a_dar),
      incrementativo: !datos.incrementativo,
      dias_a_incrementar: datos.incrementativo ? 0 : datos.dias_a_incrementar * (datos.unidad_incremento === "1/24" ? (1/24): datos.unidad_incremento),
      acumulativo: datos.acumulativo,
      activo:true,
      descripcion: datos.descripcion,
    };
};

export const formatoFecha = (fechaOriginal) => {
    const fecha = new Date(fechaOriginal);

    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();

    return `${año}-${mes}-${dia}`;
}

export const convertirDatosRecibidos = (datos) => {
    return {
        titulo: datos.titulo,
        periodo: datos.periodo < 1 ? datos.periodo * 8 : datos.periodo,
        unidad_periodo: datos.periodo < 1 ? "1/8" : "1",
        fecha_inicio: datos.inicia_desde_contrato ? '': (formatoFecha(datos.fecha_inicio)),
        fecha_final: formatoFecha(datos.fecha_final),
        inicia_desde_contrato: datos.inicia_desde_contrato,
        dias_a_dar: datos.dias_a_dar < 1 ? datos.dias_a_dar * 8 : datos.dias_a_dar,
        unidad_a_dar: datos.dias_a_dar < 1 ? "1/8" : "1",
        incrementativo: datos.incrementativo,
        dias_a_incrementar: datos.dias_a_incrementar < 1 ? datos.dias_a_incrementar * 8 : datos.dias_a_incrementar,
        unidad_incremento: datos.dias_a_incrementar < 1 ? "1/8" : "1",
        acumulativo: datos.acumulativo,
        activo:datos.activo,
        descripcion: datos.descripcion,
    };
};