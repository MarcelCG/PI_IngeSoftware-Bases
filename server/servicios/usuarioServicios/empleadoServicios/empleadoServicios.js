const modeloEmpleado = require('../../../models/usuarioModel/Empleado/empleadoModel');
const correoServicios = require('../../correoServicios/correoServicios');

function obtenerFechaContrato(Empleados, cedula){
	const empleado = Empleados.find(Emple => Emple.cedula === cedula);
  if (empleado === undefined){
    return null;
  }
  return fechaContratacion = new Date(empleado.fecha_contratacion);
 
}

// Función que genera el contenido HTML del correo
function generarPlantillaHTML(cedula_empleado) {
  const contenidoHTML = `
    <html>
      <body>
        <p>
        Como resultado de su salida de la empresa se desactivó el acceso al sistema Oraculo.
        Le agradecemos por su dedicación y contribución mientras formó parte de nuestro equipo.
        </p>
      </body>
    </html>
  `;
  return contenidoHTML;
}
//Funcion que envia un correo a los empleados afectados por el borrado
async function notificarEmpleados(cedula_empleado) {
  try {
    const listaCorreos = await modeloEmpleado.correoEmpleado(cedula_empleado);
    for (const correo of listaCorreos) {
      const mensaje = ``;
      const asunto = 'Desactivación de Cuenta';
      const exito = await correoServicios.enviarCorreo(generarPlantillaHTML, cedula_empleado, correo, asunto);
    }
    return exito;
  } catch (error) {
    return error;
  }
}

//Funcion que llama al modelo para borrar al empleado
async function borrarEmpleado(cedula_empleado) {

  //Trata de llamar al modelo
  try {
    const exito = await modeloEmpleado.borrarEmpleado(cedula_empleado);
    await notificarEmpleados(cedula_empleado);
    return exito;
  //En caso de no poder, devuelve el error
  } catch (error) {
    return error;
  }
}


module.exports = {
  obtenerFechaContrato,
  borrarEmpleado
};
