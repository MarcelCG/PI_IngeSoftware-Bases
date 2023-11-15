const modeloPolitica = require('../../models/politicaModel/politicasModel');
const modeloEmpleados = require('../../models/usuarioModel/Empleado/empleadoModel');
const correoServicios = require('../correoServicios/correoServicios');
const {NO_ENCONTRADO, EXITO, SIN_MODIFICACIONES} = require('../../config/constantes');

function vigente(Politica) {
	const hoy = new Date();
	const haceUnMes = new Date(hoy);
  haceUnMes.setMonth(hoy.getMonth() - 1);

	const fechaInicio = new Date(Politica.fecha_inicio);
  const fechaFinal = new Date(Politica.fecha_final);

  return (fechaFinal >= haceUnMes && fechaInicio <= hoy
  	&& Politica.activo === true);
}

// Función que genera el contenido HTML del correo
function generarPlantillaHTML(titulo) {
  const contenidoHTML = `
    <html>
      <body>
        <p>La política "${titulo}" ha sido desactivada. 
        Mantendrás los días acumulados hasta ahora, pero no acumularás más.</p>
      </body>
    </html>
  `;
  return contenidoHTML;
}
//Funcion que envia un correo a los empleados afectados por el borrado de la politica
async function notificarEmpleados(titulo, cedula_empresa) {
  try {
    const listaCorreos = await modeloEmpleados.correoEmpleadosPorPolitica(titulo, cedula_empresa);
    for (const correo of listaCorreos) {
      const mensaje = `La política "${titulo}" ha sido desactivada. 
      Mantendrás los días acumulados hasta ahora, pero no acumularás más.`;
      const asunto = 'Desactivación de Política';
      await correoServicios.enviarCorreo(generarPlantillaHTML, titulo, correo, asunto);
    }
    const exito = await modeloPolitica.borrarPolitica(titulo, cedula_empresa);
    return exito;
  } catch (error) {
    return error;
  }
}

//Funcion que llama al modelo para borrar al empleado
async function borrarPolitica(titulo, cedula_empresa) {
  // Trata de llamar al modelo
  try {
    const exito = await modeloPolitica.borrarPolitica(titulo, cedula_empresa);
    //En caso de tener exito llama al modelo
    await notificarEmpleados(titulo, cedula_empresa);
    return exito;
  } catch (error) {
    return error;
  }
}

async function editarPolitica(titulo, cedula_empresa, datosNuevos) {
  try {

    const politica = modeloPolitica.getByTituloAndCedula(titulo, cedula_empresa);

    if (!politica) {
      return NO_ENCONTRADO;
    }

    const edicion = modeloPolitica.editarPolitica(titulo, cedula_empresa ,datosNuevos);
    if (!edicion) {
      return SIN_MODIFICACIONES;
    }

    return EXITO;

  } catch(error) {
    console.error('Error en Servicio editarPolitica: ', error);
    throw new Error('Error en Servicio editarPolitica: ' + error.message);
  }
}

module.exports = {
  vigente,
  borrarPolitica,
  editarPolitica,
};

