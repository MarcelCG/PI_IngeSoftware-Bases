import axios from 'axios';
import Reportes from '../../Utiles/Reportes/Reportes';
import React, { useState, useEffect, useRef } from 'react';
import { NombreEscogido, fechaLimiteIzq, fechaLimiteDer } from '../../Utiles/Reportes/Filtro'; /* a que se importan los metodos para filtrado que se vayan a usar*/
import { URLApi } from '../../Compartido/Constantes';
import { useAutent } from "../../../contexto/ContextoAutenticacion";

const URLReportesEmpleado = URLApi + 'reportesEmpleado/';
const URLReporteDiasUsados = URLReportesEmpleado + 'diasUsados/';
const URLReporteDiasAcumulados = URLReportesEmpleado + 'diasAcumulados/';

export default function ReportesEmpleado () {

	/* esto es lo normal*/
	const {usuarioAutenticado} = useAutent();
	const cedula = usuarioAutenticado.cedula;

	/* como va estar construido las opciones default dep Reporte*/
	const predeterminado = {
		originales: [], /*arreglo con la infomacion de un query que no se modifica*/
		datos: [], /* datos con lo que se van a trabajar, estos son afectados por los filtros*/
		filtros: [], /* filtros que va a tener el Reporte*/
		columnas: [], /* columnas que se deben de imprimir en la Tabla de Reporte*/
		cargando:true, /* booleano para saber cuando la pag. esta cargando*/
		pagAct:1, /* campo para lo de la pagina actual que se muestra en la Tabla*/
		titulo:'Elegir'
		// const [Titulo, setTitulo] = useState('Elegir');
	}
	/* Hook para el Reporte, Rep = Reporte */
	const [reporte, actualizarReporte] = useState({ ...predeterminado });
	const actualizarFormateadoReporte = useRef();

	const formatearDatosDiasUsados = (nuevosDatos) => {
		if (!Array.isArray(nuevosDatos)) {
			// Manejar el caso cuando nuevosDatos no es un array
			return [];
		  }
		const datosAgrupados = nuevosDatos.reduce((acumulador, dato) => {
		  const existente = acumulador.find((item) => item.politica === dato.politica);
	  
		  if (existente) {
			if (dato.gastado) {
				existente.dias_gastados += dato.dias;
			} else {
				existente.dias_sin_gastar += dato.dias;
			}
		  } else {
			acumulador.push({ ...dato });
		  }
	  
		  return acumulador;
		}, []);
	  
		return datosAgrupados;
	  };

	  const formatearDatosDiasAcumulados = (nuevosDatos) => {
		if (!Array.isArray(nuevosDatos)) {
			// Manejar el caso cuando nuevosDatos no es un array
			return [];
		  }
		const datosAgrupados = nuevosDatos.reduce((acumulador, dato) => {
		  const existente = acumulador.find((item) => item.politica === dato.politica);
	  
		  if (existente) {
			existente.dias += dato.dias;
		  } else {
			acumulador.push({ ...dato });
		  }
	  
		  return acumulador;
		}, []);
	  
		return datosAgrupados;
	  };
	

	/*dependiendo del Reporte que les hayan tocado, deben de crear los llamados a la BD con los datos que ocupan*/
	/* a que se actualizan los datos dependiendo de la opcion que se haya escogido en el dropdown de tipo reporte*/
	async function cargarDiasAcumulados() {
		actualizarFormateadoReporte.current = (nuevosDatos) => {
			const datosFormateados = formatearDatosDiasAcumulados(nuevosDatos.datos);
			actualizarReporte({ ...nuevosDatos, datos: datosFormateados });
		};
		actualizarFormateadoReporte.current({...predeterminado, cargando:true});
	  try {
	    const respuesta = await axios.get(`${URLReporteDiasAcumulados}${cedula}`);
		actualizarFormateadoReporte.current({
	    		cargando:false,
	    		titulo:'Dias Acumulados',
	    		pagAct:1,
	    		originales:[...respuesta.data],
	    		datos:[...respuesta.data],
	    		filtros:[
	    			{ nombre: "Titulo", tipo: "texto", funcion: NombreEscogido, campo: '', columna: 'politica' },
					{ nombre: "Desde", tipo: 'date', funcion: fechaLimiteIzq, campo: '', columna: 'fecha' },
					{ nombre: "Hasta", tipo: 'date', funcion: fechaLimiteDer, campo: '', columna: 'fecha' }],
	    		columnas:[
	    			{nombre:"Titulo Política",id:"politica"},
					{nombre: "Dias Acumulados", id:"dias"},]
	    	})
	  } catch (error) {
	  	console.error('500')
	  }
	};

	async function cargarDiasUsados() {
		actualizarFormateadoReporte.current = (nuevosDatos) => {
			const datosFormateados = formatearDatosDiasUsados(nuevosDatos.datos);
			actualizarReporte({ ...nuevosDatos, datos: datosFormateados });
		};
		actualizarFormateadoReporte.current({...predeterminado, cargando:true});
	  try {
	    const respuesta = await axios.get(`${URLReporteDiasUsados}${cedula}`);
		actualizarFormateadoReporte.current({
	    		cargando:false,
	    		titulo:'Dias usados',
	    		pagAct:1,
	    		originales:[...respuesta.data],
	    		datos:[...respuesta.data],	
	    		filtros: [
	    		    { nombre: "Titulo", tipo: "texto", funcion: NombreEscogido, campo: '', columna: 'politica' },
	    		    { nombre: "Desde", tipo: 'date', funcion: fechaLimiteIzq, campo: '', columna: 'fecha' },
					{ nombre: "Hasta", tipo: 'date', funcion: fechaLimiteDer, campo: '', columna: 'fecha' }],
	    		columnas:[
	    			{nombre:"Titulo Política",id:"politica"},
					{nombre: "Dias Aprobados", id:"dias_sin_gastar"},
					{nombre: "Dias Usados", id: "dias_gastados"}]
	    	})
	  } catch (error) {
	  	console.error('500', error)
	  }
	};

	/* opciones en el dropdown con las que se va a actualizar el reporte*/ 
	const opciones = [
		{
			nombre:"Dias Usados",
			cargarDatos:cargarDiasUsados
		},
		{
			nombre:"Dias Acumulados",
			cargarDatos:cargarDiasAcumulados
		}
	];

	const props = {rep: reporte, setRep: actualizarFormateadoReporte.current, opciones};
	return(
		<>
			<div>
				<Reportes {...props}/>
			</div>
		</>
	);
}










