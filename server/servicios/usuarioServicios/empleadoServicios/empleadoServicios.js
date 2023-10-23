const EmpleModel = require('../../../models/usuarioModel/Empleado/empleadoModel');

function obtenerFechaContrato(Empleados, cedula){
	const empleado = Empleados.find(Emple => Emple.cedula === cedula);
    return fechaContratacion = new Date(empleado.fecha_contratacion);
}
