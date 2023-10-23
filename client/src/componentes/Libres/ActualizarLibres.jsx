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
  const esEmpleador = empresa ? true : false;
  const esPrimeroDelMes = true;/*new Date().getDate() === 20;*/

	const cargarDatos = async() => {
		setCargando(true);
		let errorDescrib = "ERROR: Vuelva a intentar mas tarde";
	  try {
	    const respuesta = await axios.get
	    (`${URLApi}libres/actualizarTodos/${empresa}`,);
	    if(respuesta.data >= 0){
	   		toast.success(
   		   	<span>
   		      Se ha actualizado: <strong>{respuesta.data}</strong>
   		      {respuesta.data === 1 ? " empleado" : " empleados"}
   		   	</span>,{position: toast.POSITION.TOP_CENTER,
   		    className: "alert alert-success"}
	   		);
	   	} else {
	   		toast.error(
	   			errorDescrib,{position: toast.POSITION.TOP_CENTER,
	   			className:"alert alert-danger"}
	   		);
	   	}
	   	setCargando(false);
	  } catch (error) {
	  	toast.error(
	  		errorDescrib,{position:
	  		toast.POSITION.TOP_CENTER, className:"alert alert-danger"}
	  	);
	  	setCargando(false);
	  }
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
