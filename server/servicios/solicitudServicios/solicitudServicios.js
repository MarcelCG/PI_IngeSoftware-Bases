const Solicitud = require('../../models/solicitudModel/solicitudModel');
const Empleado = require('../../models/usuarioModel/Empleado/empleadoModel')
const Empleador = require('../../models/usuarioModel/Empleador/empleadorModel')

const Correo = require('../correoServicios/correoServicios');
const {EXITO} = require('../../config/constantes');
const {URLAPI} = require('../../config/constantes');

const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');

const rutaPlantilla = path.join(__dirname, 'correo.handlebars');
const ruta = fs.readFileSync(rutaPlantilla, 'utf8');
const plantilla = handlebars.compile(ruta);


async function aprobarSolicitud(id) {
    try {
        // Llama a la función getSolicitudById en el modelo de Solicitud
        const solicitud = await Solicitud.getSolicitudById(id);

        if (solicitud != null) {
            const empleado = 
                await Empleado.getByCedulaAndEmpresa(solicitud.cedula_empleado, solicitud.cedula_empresa);
            
            if (empleado == null) {
                console.error('No se encontró el empleado');
                return false;
            }

            const accion = await Solicitud.aprobarSolicitud(id, 'Aprobada');

            if (accion) {
                const datos = {
                    nombre: empleado.nombre,
                    estado: 'Aprobada',
                    URLAPI,
                }
                Correo.enviarCorreo(plantilla, datos, empleado.correo1, 'Solicitud Aprobada');
                return true;
            } else {
                console.error('Error Inesperado al actualizar el estado');
                return false;
            }
        } else {
            console.error('No se encontró la solicitud');
            return false;
        }
    } catch (error) {
        console.error('Error en aprobarSolicitud:', error);
        throw new Error('Error al aprobar la solicitud: ' + error.message);
    }
}

async function rechazarSolictud(id) {
    try {
        // Llama a la función getSolicitudById en el modelo de Solicitud
        const solicitud = await Solicitud.getSolicitudById(id);

        if (solicitud != null) {
            const empleado = 
                await Empleado.getByCedulaAndEmpresa(solicitud.cedula_empleado, solicitud.cedula_empresa);
            
            if (empleado == null) {
                console.error('No se encontró el empleado');
                return false;
            }

            const datos = {
                nombre: empleado.nombre,
                estado: 'Rechazada',
                URLAPI,
            }
            Correo.enviarCorreo(plantilla, datos, empleado.correo1, 'Solicitud Rechazada');

            const accion = await Solicitud.rechazarSolicitud(id, 'Rechazada');

            if (accion) {
                return true;
            } else {
                console.error('Error Inesperado al actualizar el estado');
                return false;
            }
        } else {
            console.error('No se encontró la solicitud');
            return false;
        }
    } catch (error) {
        console.error('Error en rechazarSolicitud:', error);
        throw new Error('Error al rechazar la solicitud: ' + error.message);
    }
}

async function cancelarSolictud(id) {
    try {
        // Llama a la función getSolicitudById en el modelo de Solicitud
        const solicitud = await Solicitud.getSolicitudById(id);

        if (solicitud != null) {
            const empleado = 
                await Empleado.getByCedulaAndEmpresa(solicitud.cedula_empleado, solicitud.cedula_empresa);
            
            if (empleado == null) {
                console.error('No se encontró el empleado');
                return false;
            }

            const empleador = 
            await Empleador.getByEmpresa(solicitud.cedula_empresa);
        
            if (empleador == null) {
                console.error('No se encontró al empleador');
                return false;
            }

            const datosEmpleado = {
                nombre: empleado.nombre,
                estado: 'Cancelada',
                URLAPI,
            }
            Correo.enviarCorreo(plantilla, datosEmpleado, empleado.correo1, 'Solicitud Cancelada');

            const datosEmpleador = {
                nombre: empleador.nombre,
                estado: 'Cancelada',
                URLAPI,
            }
            Correo.enviarCorreo(plantilla, datosEmpleador, empleador.correo1, 'Solicitud Cancelada');

            const accion = await Solicitud.cancelarSolicitud(id, 'Cancelada');

            if (accion) {
                return true;
            } else {
                console.error('Error Inesperado al actualizar el estado');
                return false;
            }
        } else {
            console.error('No se encontró la solicitud');
            return false;
        }
    } catch (error) {
        console.error('Error en cancelarSolicitud:', error);
        throw new Error('Error al cancelar la solicitud: ' + error.message);
    }
}

async function obtenerFechasSolicitudesAprobadas (cedula_empresa) {
    try {

        var solicitudes = await Solicitud.getSolicitudByEmpresa(cedula_empresa);

        if (!solicitudes) {
            return solicitudes;
        }

        solicitudes = solicitudes.filter(solicitud => solicitud.estado === 'Aprobada');

        return solicitudes.map(solicitud => {
            const { inicio_fechas_solicitadas,
                dias_libres_solicitados, horas_solicitadas,
                hora_de_inicio, nombre_completo, comentarios } = solicitud;
            
            var fecha_inicio = new Date(inicio_fechas_solicitadas);
            var fecha_final = new Date(inicio_fechas_solicitadas);
            // Si se piden horas y no días
            if(dias_libres_solicitados === 1 && horas_solicitadas) {
                fecha_inicio.setUTCHours(hora_de_inicio.getUTCHours());
                fecha_inicio.setUTCMinutes(hora_de_inicio.getUTCMinutes());

                fecha_final.setUTCHours(fecha_inicio.getUTCHours() + horas_solicitadas);
                fecha_final.setUTCMinutes(fecha_inicio.getUTCMinutes());
            } else {
                // Calcula la fecha final en dias habiles
                var diasSumados = 0;
                fecha_final.setUTCDate(fecha_final.getUTCDate() - 1);
                while (diasSumados < dias_libres_solicitados) {
                    fecha_final.setUTCDate(fecha_final.getUTCDate() + 1);
                    if ((fecha_final.getUTCDay() !== 0) && (fecha_final.getUTCDay() !== 6)) {
                        diasSumados++;
                    }
                }
                fecha_final.setUTCDate(fecha_final.getUTCDate() + 1);
            }

            return {
                nombre_empleado: nombre_completo,
                fecha_inicio,
                fecha_final,
                comentarios,
            };
        });
        
    } catch (error) {
        console.error('Error en el servicio Solicitud, ObtenerSolicitudesAprobadasPorEmpleado:', error);
        throw new Error('Error en el servicio Solicitud, ObtenerSolicitudesAprobadasPorEmpleado: ' + error.message);
    }
}

module.exports = {
    aprobarSolicitud,
    rechazarSolictud,
    cancelarSolictud,
    obtenerFechasSolicitudesAprobadas
};