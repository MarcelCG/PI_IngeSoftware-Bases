import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { URLApi } from '../Compartido/Constantes';
import React, {useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAutent } from "../../contexto/ContextoAutenticacion";

export const ActualizarTiempoLibre = () => {

  const [cargando, setCargando] = useState(false);
  const {usuarioAutenticado} = useAutent();
  const empresa = usuarioAutenticado.cedula_empresa; 
  const esEmpleador = empresa ? true : false;
  /*Si quieren ver el boton, modifiquen esto al dia de hoy*/
  const esPrimeroDelMes = true;/*new Date().getDate() === 20;*/

	const cargarDatos = async() => {
		setCargando(true);
		let errorDescrib = "ERROR: Vuelva a intentar mas tarde";
	  try {
	    const respuesta = await axios.get
	    (`${URLApi}libres/actualizarTodos/${empresa}`,);
	    if(respuesta.data >= 0){
	   		toast.success(
	   			"Se han actualizado: " + respuesta.data + " empleados"
	   			,{position: toast.POSITION.TOP_CENTER,
	   			className:"alert alert-success"}
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

	return (
		<>
			{(esEmpleador && esPrimeroDelMes) && <div>
				<ToastContainer autoClose={2500}/>
				<button className="btn btn-primary btn-lg"
					onClick={cargarDatos} disabled={cargando}>
					{cargando ? ("Actualizando..."):("Actualizar libres")}
				</button >
			</div>}
		</>
	);
};

