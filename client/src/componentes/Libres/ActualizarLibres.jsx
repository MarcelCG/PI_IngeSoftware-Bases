import axios from 'axios';
import React, { useState, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { URLApi } from '../Compartido/Constantes';
import { toast } from 'react-toastify';
import { ActualizarLibresHTML } from './ActualizarLibresHTML';
import { useAutent } from "../../contexto/ContextoAutenticacion";
import ReportePDF  from "../Reportes/ReportePDF"
import { PDFDownloadLink } from "@react-pdf/renderer"

export const ActualizarTiempoLibre = () => {

  const [cargando, setCargando] = useState(false);
  const {usuarioAutenticado} = useAutent();
  const empresa = usuarioAutenticado.cedula_empresa; 
  const esEmpleador = usuarioAutenticado?.esEmpleador ? true : false;
  const botonRef = useRef(null);
  const esPrimeroDelMes = true;//new Date().getDate() === 1;

  const [datos, setdatos] = useState([]);
  const datosEmpresa = empresa;
	const titulo = "titulo"
	const columnas = [{nombre:"Cedula",id:"cedula"},{nombre:"Dias",id:"dias"}];
	 
	const generarReporte = (libresNuevos) => {
    let datosArrayAcomodacion = {};
    libresNuevos.forEach(lib => {
      const { cedula_empleado, nuevos_libres } = lib;
      if (!datosArrayAcomodacion[cedula_empleado]) {
          datosArrayAcomodacion[cedula_empleado] = 0;
      }
      datosArrayAcomodacion[cedula_empleado] += parseFloat(nuevos_libres);
    });

    let datosArray = Object.entries(datosArrayAcomodacion).map(([cedula, dias]) => {
       return { cedula, dias: dias.toFixed(2) };
    });

    setdatos(datosArray);
    console.log(datosArray);
};


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
	   		generarReporte(respuesta.data);
	   	} else {
	   		toast.error(errorDescrib,{position: toast.POSITION.TOP_CENTER,className:"alert alert-danger"});
	   	}
	   	setCargando(false);
	   	botonRef.current.click();
	  } catch (error) {
	  	toast.error(errorDescrib,{position:toast.POSITION.TOP_CENTER, className:"alert alert-danger"});
	  	//setCargando(false);
	  }
	};

	const props = {
  	esEmpleador,
		esPrimeroDelMes,
		cargarDatos,
		cargando,
		datos,
		columnas,
		datosEmpresa,
		titulo,
		botonRef
	};

	return (
		<>
		<ActualizarLibresHTML {...props}/>
		</>
	);
};
