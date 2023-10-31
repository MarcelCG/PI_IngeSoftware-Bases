const modeloPolitica = require('../../models/politicaModel/politicasModel');

function vigente(Politica) {
	const hoy = new Date();
	const haceUnMes = new Date(hoy);
  haceUnMes.setMonth(hoy.getMonth() - 1);

	const fechaInicio = new Date(Politica.fecha_inicio);
  const fechaFinal = new Date(Politica.fecha_final);

  return (fechaFinal >= haceUnMes && fechaInicio <= hoy
  	&& Politica.activo === true);
}

//Funcion que llama al modelo para borrar al empleado
async function borrarPolitica(titulo, cedula_empresa) {
  //Trata de llamar al modelo
  try {
    const exito = await modeloPolitica.borrarPolitica(titulo,cedula_empresa);
    return exito;
  //En caso de no poder, devuelve el error
  } catch (error) {
    return error;
  }
}

module.exports = {
  vigente,
  borrarPolitica
};

