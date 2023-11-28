import axios from 'axios';
import Reportes from '../../Utiles/Reportes/Reportes';
import React, { useState, useRef } from 'react';
import { NombreEscogido, fechaLimiteIzq, fechaLimiteDer } from '../../Utiles/Reportes/Filtro';
import { URLApi } from '../../Compartido/Constantes';
import { useAutent } from "../../../contexto/ContextoAutenticacion";

const URLReportesEmpleado = URLApi + 'reportesEmpleado/';
const URLReporteDiasUsados = URLReportesEmpleado + 'diasUsados/';
const URLReporteDiasAcumulados = URLReportesEmpleado + 'diasAcumulados/';
const URLReporteDashboard = URLReportesEmpleado + 'dashboard/';

const formatearDatosDiasUsados = (nuevosDatos) => {
	if (!Array.isArray(nuevosDatos)) {
		return [];
	}

	const datosAgrupados = nuevosDatos.reduce((acumulador, dato) => {
	  const existente = acumulador.find((item) => item.politica === dato.politica);
  
	  if (existente) {
		if (dato.gastado) {
			existente.dias_gastados += dato.dias_solicitados;
		} else {
			existente.dias_sin_gastar += dato.dias_solicitados;
		}
	  } else {
		acumulador.push({ ...dato });
	  }
  
	  return acumulador;
	}, []);
  
	return datosAgrupados;
};

const formatearDatosDashboard = (nuevosDatos) => {
	if (!Array.isArray(nuevosDatos)) {
		return [];
	}

	const datosAgrupados = nuevosDatos.reduce((acumulador, dato) => {
	  const existente = acumulador.find((item) => item.politica === dato.politica);
  
	  if (existente) {
		if (dato.totales) {
			if (!existente.totales) {
				existente.totales = true;
				existente.fecha_final = dato.fecha_final;
			}
			if (dato.fecha_final >= existente.fecha_final) {
				existente.dias_totales = dato.dias_totales;
			}
		} else {
			existente.dias_solicitados += dato.dias_solicitados;
			existente.dias_aprobados += dato.dias_aprobados;
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
		return [];
	}

	const datosAgrupados = nuevosDatos.reduce((acumulador, dato) => {
		const existente = acumulador.find((item) => item.politica === dato.politica);
	
		if (existente) {
			existente.dias_solicitados += dato.dias_solicitados;
		} else {
			acumulador.push({ ...dato });
		}
	
		return acumulador;
	}, []);
  
	return datosAgrupados;
};

export default function ReportesEmpleado () {
	const {usuarioAutenticado} = useAutent();
	const cedula = usuarioAutenticado.cedula;

	/* Datos por defecto*/
	const predeterminado = {
		originales: [],
		datos: [],
		filtros: [],
		columnas: [],
		cargando:true,
		pagAct:1,
		titulo:'Elegir'
	}

	const [reporte, actualizarReporte] = useState({ ...predeterminado });
	const actualizarFormateadoReporte = useRef();

	const filtros = [
		{ nombre: "Titulo", tipo: "texto", funcion: NombreEscogido, campo: '', columna: 'politica' },
		{ nombre: "Desde", tipo: 'date', funcion: fechaLimiteIzq, campo: '', columna: 'fecha_inicio' },
		{ nombre: "Hasta", tipo: 'date', funcion: fechaLimiteDer, campo: '', columna: 'fecha_final' }];

	async function cargarDatos(URL, formatearDatos, titulo, columnas) {
		actualizarFormateadoReporte.current = (nuevosDatos) => {
			const datosFormateados = formatearDatos(nuevosDatos.datos);
			actualizarReporte({ ...nuevosDatos, datos: datosFormateados });
		};
		actualizarFormateadoReporte.current({...predeterminado, cargando:true});

		try {
			const respuesta = await axios.get(`${URL}${cedula}`);
			actualizarFormateadoReporte.current({
				cargando:false,
				titulo,
				pagAct:1,
				originales:[...respuesta.data],
				datos:[...respuesta.data],
				filtros,
				columnas,
			})
			} catch (error) {
				console.error('500')
			}
	};

	const cargarDiasAcumulados = () => cargarDatos( URLReporteDiasAcumulados, formatearDatosDiasAcumulados,
		'Dias Acumulados',
		[
			{nombre:"Titulo Política",id:"politica"},
			{nombre: "Dias Acumulados", id:"dias_solicitados"},
		]
	);

	const cargarDiasUsados = () => cargarDatos( URLReporteDiasUsados, formatearDatosDiasUsados,
		'Dias Usados',
		[
			{nombre:"Titulo Política",id:"politica"},
			{nombre: "Dias Aprobados", id:"dias_sin_gastar"},
			{nombre: "Dias Usados", id: "dias_gastados"}
		]
	);

	const cargarDashboard = () => cargarDatos( URLReporteDashboard, formatearDatosDashboard,
		'Dashboard',
		[
			{nombre:"Titulo Política",id:"politica"},
			{nombre: "Dias Disponibles", id:"dias_totales"},
			{nombre: "Dias Solicitados", id:"dias_solicitados"},
			{nombre: "Dias Utilizados", id:"dias_aprobados"}
		]
	);

	/* Tipos de reporte*/ 
	const opciones = [
		{
			nombre:"Dias Usados",
			cargarDatos:cargarDiasUsados
		},
		{
			nombre:"Dias Acumulados",
			cargarDatos:cargarDiasAcumulados
		},
		{
			nombre:"Dashboard",
			cargarDatos:cargarDashboard
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