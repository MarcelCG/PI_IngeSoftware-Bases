import axios from 'axios';
import Reportes from '../../Utiles/Reportes/Reportes'
import React, { useState, useEffect } from 'react';
import {NombreEscogido, fechaLimiteIzq, fechaLimiteDer} from '../../Utiles/Reportes/Filtro'; /* a que se importan los metodos para filtrado que se vayan a usar*/
import { URLApi } from '../../Compartido/Constantes';
import { useAutent } from "../../../contexto/ContextoAutenticacion";

export default function ReportesEmpleador () {

	/* esto es lo normal*/
	const {usuarioAutenticado} = useAutent();
	const empresa = usuarioAutenticado.cedula_empresa; 

	/* como va estar construido las opciones default dep Reporte*/
	const predeterminado = {
		originales: [], /*arreglo con la infomacion de un query que no se modifica*/
		datos: [], /* datos con lo que se van a trabajar, estos son afectados por los filtros*/
		filtros: [], /* filtros que va a tener el Reporte*/
		columnas: [], /* columnas que se deben de imprimir en la Tabla de Reporte*/
		cargando:true, /* booleano para saber cuando la pag. esta cargando*/
		pagAct:1, /* campo para lo de la pagina actual que se muestra en la Tabla*/
		titulo:'Elegir'
	}

    const [datosEmpresa, setDatosDeEmpresa] = useState({
        nombre: "",
        cedula_juridica: "",
        telefono1: "",
        telefono2: "",
        correo1: "",
        correo2: "",
    });

	useEffect(() => {
		async function cargarDatosEmpresa() {
			try {
			const response = await axios.get(`${URLApi}empresa/getEmpresaInfo/${empresa}`);
			
			if (response.status === 200) {
	
				const data = response.data.data;
				// Actualiza el estado con los datos específicos del JSON de respuesta
				setDatosDeEmpresa({
				nombre: data.nombre,
				cedula_juridica: data.cedula_juridica,
				telefono1: data.telefono1,
				telefono2: data.telefono2,
				correo1: data.correo1,
				correo2: data.correo2
				});
			} else if (response.status === 404) {
				throw new Error('Empresa no encontrada');
			} else {
				throw new Error('Error en el servidor');
			}
		} catch (error) {
			if (error.message === 'Empresa no encontrada') {
			setDatosDeEmpresa({ error: 'Empresa no encontrada' });
			} else {
			setDatosDeEmpresa({ error: 'Error en el servidor' });
			}
		}
		}
		cargarDatosEmpresa(); 
  	}, [empresa]);

	/* Hook para el Reporte, Rep = Reporte */
	const [rep, setRep] = useState({ ...predeterminado });

	/*dependiendo del Reporte que les hayan tocado, deben de crear los llamados a la BD con los datos que ocupan*/
	/* a que se actualizan los datos dependiendo de la opcion que se haya escogido en el dropdown de tipo reporte*/
	async function cargarDiasSolicitadosPorPolitica() {
		setRep({...predeterminado, cargando:true});
	  try {
	    const respuesta = await axios.get(`${URLApi}reportesEmpleador/reporteDiasSolicitadosPorPolitica/${empresa}`);
		let DiasLibresPorPolitica = respuesta.data.DiasLibresPorPolitica;
		let LibresEmpresa = respuesta.data.LibresEmpresa;
		let SolicitudesAprobadas = respuesta.data.SolicitudesAprobadas;
		let info = construirDatosDiasSolicitadosPorPolitica(DiasLibresPorPolitica, LibresEmpresa, SolicitudesAprobadas);
		setRep({
			cargando:false,
			titulo:'Dias solicitados por política',
			pagAct:1,
			originales:[...info],
			datos:[...info],
			filtros:[
				{nombre:"Fecha de Inicio",tipo:"fecha",funcion:fechaLimiteIzq,campo:'',columna:'fecha_inicio'},
				{nombre:"Fecha Final",tipo:"fecha",funcion:fechaLimiteDer,campo:'',columna:'fecha_final'},],
			columnas:[
				{nombre:"Política", id:"titulo_politica"},
				{nombre:"Dias gastados", id:"dias_gastados"},
				{nombre:"Dias por gastar", id:"total_dias_libres_disponibles"},
			]
		})
	  } catch (error) {
		console.error(error)
	  	console.error('500')
	  }
	};

    async function cargarDiasGastadosPorEmpleadoPorPolitica() {
		setRep({...predeterminado, cargando:true});
	  try {
	    const respuesta = await axios.get(`${URLApi}empleados/allByEmpresa/${empresa}`);
	    	setRep({
	    		cargando:false,
	    		titulo:'Dias gastados por empleado por política',
	    		pagAct:1,
	    		originales:[...respuesta.data],
	    		datos:[...respuesta.data],
	    		filtros:[
                    {nombre:"Politica",tipo:"texto",funcion:NombreEscogido,campo:'',columna:'politica'},
	    			{nombre:"Fecha de Inicio",tipo:"fecha",funcion:fechaLimiteIzq,campo:'',columna:'fecha_inicio'},
	    			{nombre:"Fecha Final",tipo:"fecha",funcion:fechaLimiteDer,campo:'',columna:'fecha_final'},],
	    		columnas:[
                    {nombre:"Empleado", id:"nombre_empleado"},
	    			{nombre:"Política", id:"titulo_politica"},
                    {nombre:"Dias gastados", id:"dias_gastados"},
                    {nombre:"Dias por gastar", id:"dias_por_gastar"},
                    {nombre:"Fecha de Inicio", id:"fecha_inicio"},
                    {nombre:"Fecha Final", id:"fecha_final"}
                ]
	    	})
	  } catch (error) {
	  	console.error('500')
	  }
	};

    async function cargarDiasGeneradosPorPolitica() {
		setRep({...predeterminado, cargando:true});
	  try {
	    const respuesta = await axios.get(`${URLApi}empleados/allByEmpresa/${empresa}`);
	    	setRep({
	    		cargando:false,
	    		titulo:'Dias solicitados por política',
	    		pagAct:1,
	    		originales:[...respuesta.data],
	    		datos:[...respuesta.data],
	    		filtros:[
	    			{nombre:"Fecha de Inicio",tipo:"fecha",funcion:fechaLimiteIzq,campo:'',columna:'fecha_inicio'},
	    			{nombre:"Fecha Final",tipo:"fecha",funcion:fechaLimiteDer,campo:'',columna:'fecha_final'},],
	    		columnas:[
	    			{nombre:"Política", id:"titulo_politica"},
                    {nombre:"Dias generados", id:"dias_generados"},
                    {nombre:"Numero de empleados que recibieron", id:"empleados_beneficio"},
                    {nombre:"Fecha de Inicio", id:"fecha_inicio"},
                    {nombre:"Fecha Final", id:"fecha_final"}
                ]
	    	})
	  } catch (error) {
	  	console.error('500')
	  }
	};

	function construirDatosDiasSolicitadosPorPolitica(DiasLibresPorPolitica, LibresEmpresa, SolicitudesAprobadas, limiteFechaInicio=0, limiteFechaFinal=0) {
		if (limiteFechaInicio!==0) {
			let limiteFechaInicio = new Date(limiteFechaInicio);
		}
		if (limiteFechaFinal!==0) {
			let limiteFechaFinal = new Date(limiteFechaFinal);
		}
		let infoTabla = [];
		DiasLibresPorPolitica.forEach(element => {
			infoTabla.push(element);
		});
		infoTabla.forEach(element => {
			element.dias_gastados = 0;
		})
		let today = new Date();

		//Se agregan al total de dias por gastar aquellos dias que esten aprobados que empiezan en el futuro y los pendientes
		SolicitudesAprobadas.forEach(solicitud => {
			let inicio_fechas_solicitadas = new Date(solicitud.inicio_fechas_solicitadas);
			let indicePolitica = infoTabla.findIndex((punto) => punto.titulo_politica===solicitud.titulo_politica);
			if(indicePolitica!==-1){
				// console.log(solicitud)
				if(inicio_fechas_solicitadas > today && (solicitud.estado === 'Aprobada' || solicitud.estado === 'Pendiente')) {
					let diasLibresDisponibles = 0;
					if(solicitud.dias_libres_solicitados === 1) {
						if(solicitud.horas_solicitadas === 2) {
							diasLibresDisponibles = 0.25;
						} else if(solicitud.horas_solicitadas === 4) {
							diasLibresDisponibles = 0.5;
						} else {
							diasLibresDisponibles = 1;
						}
					}
					else {
						diasLibresDisponibles = solicitud.dias_libres_solicitados;
					}
					infoTabla[indicePolitica].total_dias_libres_disponibles += diasLibresDisponibles;
				}
				calcularDiasGastados(inicio_fechas_solicitadas, today, solicitud, limiteFechaInicio, limiteFechaFinal, infoTabla, indicePolitica);
			}
		});

		return infoTabla;
	}

	function calcularDiasGastados(inicio_fechas_solicitadas, today, solicitud, limiteFechaInicio, limiteFechaFinal, infoTabla, indicePolitica) {
		if(inicio_fechas_solicitadas <= today && solicitud.estado === 'Aprobada' && limiteFechaInicio===0 && limiteFechaFinal===0) {
			// let diasCalculados = calcularDiasAntesDeLimiteSuperior(solicitud.inicio_fechas_solicitadas, solicitud.dias_libres_solicitados, new Date());
			let diasCalculados = calcularDiasEntreLimites(solicitud.inicio_fechas_solicitadas, solicitud.dias_libres_solicitados, new Date(0), today);
			infoTabla[indicePolitica].dias_gastados += diasCalculados.diasAAgregar;
			infoTabla[indicePolitica].total_dias_libres_disponibles += diasCalculados.dias_libres_restantes;
		} else if (limiteFechaInicio!==0 && limiteFechaFinal===0 && solicitud.estado === 'Aprobada') {
			// let diasAAgregar = calcularDiasDespuesDeLimiteInferior(solicitud.inicio_fechas_solicitadas, solicitud.dias_libres_solicitados, limiteFechaInicio);
			let diasCalculados = calcularDiasEntreLimites(solicitud.inicio_fechas_solicitadas, solicitud.dias_libres_solicitados, limiteFechaInicio, today);
			infoTabla[indicePolitica].dias_gastados += diasCalculados.diasAAgregar;
			infoTabla[indicePolitica].total_dias_libres_disponibles += diasCalculados.dias_libres_restantes;
		} else if (limiteFechaInicio===0 && limiteFechaFinal!==0 && solicitud.estado === 'Aprobada') {
			let diasCalculados = calcularDiasEntreLimites(solicitud.inicio_fechas_solicitadas, solicitud.dias_libres_solicitados, new Date(0), limiteFechaFinal);
			// let diasCalculados = calcularDiasAntesDeLimiteSuperior(solicitud.inicio_fechas_solicitadas, solicitud.dias_libres_solicitados, limiteFechaFinal);
			infoTabla[indicePolitica].dias_gastados += diasCalculados.diasAAgregar;
			infoTabla[indicePolitica].total_dias_libres_disponibles += diasCalculados.dias_libres_restantes;
		} else if (limiteFechaInicio!==0 && limiteFechaFinal!==0 && solicitud.estado === 'Aprobada') {
			let diasCalculados = calcularDiasEntreLimites(solicitud.inicio_fechas_solicitadas, solicitud.dias_libres_solicitados, limiteFechaInicio, limiteFechaFinal);
			infoTabla[indicePolitica].dias_gastados += diasCalculados.diasAAgregar;
			infoTabla[indicePolitica].total_dias_libres_disponibles += diasCalculados.dias_libres_restantes;
		}
	};

	function calcularDiasEntreLimites(inicio_fechas_solicitadas, dias_libres_solicitados, limiteFechaInicio, limiteFechaFinal) {
		let diasAAgregar = 0;
		let fecha_actual = new Date(inicio_fechas_solicitadas);
		let hoy = new Date();
		let dias_libres_restantes = dias_libres_solicitados;
		while (dias_libres_restantes > 0 && fecha_actual <= limiteFechaFinal && fecha_actual <= hoy) {
			if(fecha_actual >= limiteFechaInicio && fecha_actual <= limiteFechaFinal) {
				diasAAgregar+=1;
			}
			let mañana = new Date(fecha_actual);
			mañana.setDate(fecha_actual.getDate()+1);
			fecha_actual = mañana;
			dias_libres_restantes-=1;
		}
		return {diasAAgregar, dias_libres_restantes};
	}

	const opciones = [
		{
			nombre:"Dias solicitados por política",
			cargarDatos:cargarDiasSolicitadosPorPolitica
		},
        {
			nombre:"Dias gastados por empleado por política",
            cargarDatos:cargarDiasGastadosPorEmpleadoPorPolitica
		},
        {
			nombre:"Dias generados por política",
            cargarDatos:cargarDiasGeneradosPorPolitica
		}
	];

	const props = {rep, setRep, opciones, datosEmpresa};

	return(
		<>
			<div>
				<Reportes {...props}/>
			</div>
		</>
	);
}










