function vigente(Politica) {
	const hoy = new Date();
	const haceUnMes = new Date(hoy);
  haceUnMes.setMonth(hoy.getMonth() - 1);

	const fechaInicio = new Date(Politica.fecha_inicio);
  const fechaFinal = new Date(Politica.fecha_final);

  return (fechaFinal >= haceUnMes && fechaInicio <= hoy
  	&& Politica.activo === true);
}

module.exports = {
  vigente
};

