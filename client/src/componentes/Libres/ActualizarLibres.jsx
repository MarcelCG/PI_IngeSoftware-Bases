import axios from 'axios';
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { URLApi } from '../Compartido/Constantes';
import { toast } from 'react-toastify';
import { ActualizarLibresHTML } from './ActualizarLibresHTML';
import { useAutent } from "../../contexto/ContextoAutenticacion";

export const ActualizarTiempoLibre = () => {

  const [cargando, setCargando] = useState(false);
  const {usuarioAutenticado} = useAutent();
  const empresa = usuarioAutenticado.cedula_empresa; 
  const esEmpleador = usuarioAutenticado?.esEmpleador ? true : false;
  const esPrimeroDelMes = true;//new Date().getDate() === 1;

	const cargarDatos = async() => {
		setCargando(true);
		let errorDescrib = "ERROR: Vuelva a intentar mas tarde";
	  try {
	    const respuesta = await axios.get
	    (`${URLApi}libres/actualizarTodos/${empresa}`,);
	    const cantEmpleados = new Set(respuesta.data.map(lib => lib.cedula_empleado)).size;
	    if(respuesta.data !== undefined){
	   		toast.success(
   		   	<> Se ha actualizado: <b>{cantEmpleados} </b>
   		      {cantEmpleados === 1 ? "empleado":"empleados"}
   		   	</>,{position: toast.POSITION.TOP_CENTER});
	   	} else {
	   		toast.error(errorDescrib,{position: toast.POSITION.TOP_CENTER,className:"alert alert-danger"});
	   	}
	   	setCargando(false);
	  } catch (error) {
	  	toast.error(errorDescrib,{position:toast.POSITION.TOP_CENTER, className:"alert alert-danger"});
	  	setCargando(false);
	  }
	};
	// eslint-disable-next-line 
	const generarReporte = (libresNuevos) => {
		let diasEmpleado = [];
		libresNuevos.forEach(lib => {
  		const { cedula_empleado, dias_libres_disponibles } = lib;
  		diasEmpleado[cedula_empleado] = (diasEmpleado[cedula_empleado] || 0) + parseFloat(dias_libres_disponibles);
		});
		// aqui supuestamente iria algo como Gen[pdf]

	};

	const props = {
  	esEmpleador,
		esPrimeroDelMes,
		cargarDatos,
		cargando
	};

	return (
		<>
		<ActualizarLibresHTML {...props}/>
		</>
	);
};
