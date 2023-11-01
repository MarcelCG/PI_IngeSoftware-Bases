const modeloEmpleado = require('../../../models/usuarioModel/Empleado/empleadoModel');

function obtenerFechaContrato(Empleados, cedula){
	const empleado = Empleados.find(Emple => Emple.cedula === cedula);
  return fechaContratacion = new Date(empleado.fecha_contratacion);
 
}

//Funcion que llama al modelo para borrar al empleado
async function borrarEmpleado(cedula_empleado) {
  //Trata de llamar al modelo
  try {
    const exito = await modeloEmpleado.borrarEmpleado(cedula_empleado);
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
