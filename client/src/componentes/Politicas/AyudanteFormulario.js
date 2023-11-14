// Mensajes de error estándar
export const errorMessages = {
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
export const transformDataBeforeSubmit = (data) => {
    return {
      titulo: data.titulo,
      periodo: data.periodo * (data.periodUnit === "1/24" ? (1/24): data.periodUnit),
      fecha_inicio: data.inicia_desde_contrato ? '2023-01-01': data.fecha_inicio,
      fecha_final: data.fecha_final,
      inicia_desde_contrato: data.inicia_desde_contrato,
      dias_a_dar: data.dias_a_dar * (data.dias_a_darUnit === "1/24" ? (1/24): data.dias_a_darUnit),
      incrementativo: !data.incrementativo,
      dias_a_incrementar: data.incrementativo ? 0 : data.dias_a_incrementar * (data.incrementalUnit === "1/24" ? (1/24): data.incrementalUnit),
      acumulativo: data.acumulativo,
      activo:true,
      descripcion: data.descripcion,
    };
};