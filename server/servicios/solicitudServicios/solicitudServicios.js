const Solicitud = require('../../models/solicitudModel/solicitudModel');
const Empleado = require('../../models/usuarioModel/Empleado/empleadoModel')
const Correo = require('../correoServicios/correoServicios');
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

module.exports = {
    aprobarSolicitud,
    rechazarSolictud,
};