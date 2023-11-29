import axios from 'axios';
import Reportes from '../../Utiles/Reportes/Reportes'
import React, { useState, useEffect } from 'react';
import {fechaLimiteIzqRep1, fechaLimiteDerRep1, fechaLimiteIzqRep2, fechaLimiteDerRep2,
	 fechaLimiteIzqRep3, fechaLimiteDerRep3, nombrePolitica} from '../../Utiles/Reportes/Filtro'; /* a que se importan los metodos para filtrado que se vayan a usar*/
import { URLApi } from '../../Compartido/Constantes';
import { useAutent } from "../../../contexto/ContextoAutenticacion";

const URLEmpresa = URLApi + 'empresa/getEmpresaInfo/';
const URLReportesEmpleador = URLApi + 'reportesEmpleador/';
const URLReporteDiasSolicitadosPorPolitica = URLReportesEmpleador + 'reporteDiasSolicitadosPorPolitica/';
const URLReporteDiasGastadosPorEmpleadoPorPolitica = URLReportesEmpleador + 'reporteDiasGastadosPorEmpleadoPorPolitica/';
const URLReporteDiasGeneradosPorPolitica = URLReportesEmpleador + 'reporteDiasGeneradosPorPolitica/';

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
			const response = await axios.get(`${URLEmpresa}${empresa}`);
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

	const [rep, setRep] = useState({ ...predeterminado });

	async function cargarDiasSolicitadosPorPolitica(fecha_inicio=0, fecha_final=0) {
		setRep({...predeterminado, cargando:true});
	  try {
	    const respuesta = await axios.get(`${URLReporteDiasSolicitadosPorPolitica}${empresa}`);
		let DiasLibresPorPolitica = respuesta.data.DiasLibresPorPolitica;
		let SolicitudesAprobadas = respuesta.data.SolicitudesAprobadas;
		let info = [];
		
		if (fecha_inicio!==0 && fecha_final===0) {
			info = construirDatosDiasSolicitadosPorPolitica(DiasLibresPorPolitica, SolicitudesAprobadas, fecha_inicio, 0);
		} else if (fecha_inicio===0 && fecha_final!==0) {
			info = construirDatosDiasSolicitadosPorPolitica(DiasLibresPorPolitica, SolicitudesAprobadas,0,fecha_final);
		} else if (fecha_inicio!==0 && fecha_final!==0) {
			info = construirDatosDiasSolicitadosPorPolitica(DiasLibresPorPolitica, SolicitudesAprobadas, fecha_inicio, fecha_final);
		} else {
			info = construirDatosDiasSolicitadosPorPolitica(DiasLibresPorPolitica, SolicitudesAprobadas);
		}
		setRep({
			cargando:false,
			titulo:'Dias solicitados por política',
			pagAct:1,
			originales:[...info],
			datos:[...info],
			filtros:[
				{nombre:"Fecha de Inicio",tipo:"date",funcion:fechaLimiteIzqRep1,campo:'',columna:'fecha_inicioRepEmpleador1'},
				{nombre:"Fecha Final",tipo:"date",funcion:fechaLimiteDerRep1,campo:'',columna:'fecha_finalRepEmpleador1'},],
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

    async function cargarDiasGastadosPorEmpleadoPorPolitica(politica=0, fecha_inicio=0, fecha_final=0) {
		setRep({...predeterminado, cargando:true});
	  try {
	    const respuesta = await axios.get(`${URLReporteDiasGastadosPorEmpleadoPorPolitica}${empresa}`);
		let LibresEmpresa = respuesta.data.LibresEmpresa;
		let SolicitudesAprobadas = respuesta.data.SolicitudesAprobadas;

		let info = [];
		let LibresPorPolitica = [];
		let SolicitudesPorPolitica = [];
		
		if (politica!==0) {
			LibresPorPolitica =
				LibresEmpresa.filter(elemLibre => elemLibre.titulo_politica.toLowerCase().includes(politica.toLowerCase())||politica==='');
			SolicitudesPorPolitica =
				 SolicitudesAprobadas.filter(elemLibre => elemLibre.titulo_politica.toLowerCase().includes(politica.toLowerCase())||politica==='');
		} else {
			LibresPorPolitica = LibresEmpresa;
			SolicitudesPorPolitica = SolicitudesAprobadas;
		}

		if (fecha_inicio!==0 && fecha_final===0) {
			info = construirDatosDiasGastadosPorEmpleadoPorPolitica(LibresPorPolitica, SolicitudesPorPolitica, fecha_inicio, 0);
		} else if (fecha_inicio===0 && fecha_final!==0) {
			info = construirDatosDiasGastadosPorEmpleadoPorPolitica(LibresPorPolitica, SolicitudesPorPolitica,0,fecha_final);
		} else if (fecha_inicio!==0 && fecha_final!==0) {
			info = construirDatosDiasGastadosPorEmpleadoPorPolitica(LibresPorPolitica, SolicitudesPorPolitica, fecha_inicio, fecha_final);
		} else {
			info = construirDatosDiasGastadosPorEmpleadoPorPolitica(LibresPorPolitica, SolicitudesPorPolitica);
		}

		setRep({
			cargando:false,
			titulo:'Dias gastados por empleado por política',
			pagAct:1,
			originales:[...info],
			datos:[...info],
			filtros:[
				{nombre:"Politica",tipo:"text",funcion:nombrePolitica,campo:'',columna:'politicaRepEmpleador2'},
				{nombre:"Fecha de Inicio",tipo:"date",funcion:fechaLimiteIzqRep2,campo:'',columna:'fecha_inicioRepEmpleador2'},
				{nombre:"Fecha Final",tipo:"date",funcion:fechaLimiteDerRep2,campo:'',columna:'fecha_finalRepEmpleador2'},],
			columnas:[
				{nombre:"Empleado", id:"nombre_empleado"},
				{nombre:"Política", id:"titulo_politica"},
				{nombre:"Dias gastados", id:"dias_gastados"},
				{nombre:"Dias por gastar", id:"total_dias_libres_disponibles"}
			]
		})
	  } catch (error) {
	  	console.error('500')
	  }
	};

    async function cargarDiasGeneradosPorPolitica(fecha_inicio=0, fecha_final=0) {
		setRep({...predeterminado, cargando:true});
	  try {
		const respuesta = await axios.get(`${URLReporteDiasGeneradosPorPolitica}${empresa}`);
		let BitacoraLibres = respuesta.data;
		let info = []

		if (fecha_inicio!==0 && fecha_final===0) {
			info = construirDatosDiasGeneradosPorPolitica(BitacoraLibres, fecha_inicio, 0);
		} else if (fecha_inicio===0 && fecha_final!==0) {
			info = construirDatosDiasGeneradosPorPolitica(BitacoraLibres, 0, fecha_final);
		} else if (fecha_inicio!==0 && fecha_final!==0) {
			info = construirDatosDiasGeneradosPorPolitica(BitacoraLibres, fecha_inicio, fecha_final);
		} else {
			info = construirDatosDiasGeneradosPorPolitica(BitacoraLibres);
		}
		setRep({
			cargando:false,
			titulo:'Dias generados por política',
			pagAct:1,
			originales:[...info],
			datos:[...info],
			filtros:[
				{nombre:"Fecha de Inicio",tipo:"date",funcion:fechaLimiteIzqRep3,campo:'',columna:'fecha_inicioRepEmpleador3'},
				{nombre:"Fecha Final",tipo:"date",funcion:fechaLimiteDerRep3,campo:'',columna:'fecha_finalRepEmpleador3'},],
			columnas:[
				{nombre:"Política", id:"titulo_politica"},
				{nombre:"Dias generados", id:"dias_generados"},
				{nombre:"Numero de empleados que recibieron", id:"empleados_beneficio"}
			]
		})
	  } catch (error) {
	  	console.error('500')
	  }
	};

	function construirDatosDiasSolicitadosPorPolitica(DiasLibresPorPolitica, SolicitudesAprobadas, fecha_inicio=0, fecha_final=0) {
		let limiteFechaInicio = 0;
		let limiteFechaFinal = 0;
		if (fecha_inicio!==0) {
			limiteFechaInicio = new Date(fecha_inicio);
			limiteFechaInicio.setDate(limiteFechaInicio.getDate()+1);
		}
		if (fecha_final!==0) {
			limiteFechaFinal = new Date(fecha_final);
			limiteFechaFinal.setDate(limiteFechaFinal.getDate()+1);
		}
		let infoTabla = [];
		DiasLibresPorPolitica.forEach(elemento => {
			infoTabla.push(elemento);
		});
		infoTabla.forEach(elemento => {
			elemento.dias_gastados = 0;
		})

		let hoy = new Date();
		//Se agregan al total de dias por gastar aquellos dias que esten aprobados que empiezan en el futuro y los pendientes
		SolicitudesAprobadas.forEach(solicitud => {
			let inicio_fechas_solicitadas = new Date(solicitud.inicio_fechas_solicitadas);
			inicio_fechas_solicitadas.setDate(inicio_fechas_solicitadas.getDate()+1);

			let indicePolitica = infoTabla.findIndex((punto) => punto.titulo_politica===solicitud.titulo_politica);
			if(indicePolitica!==-1){
				if(inicio_fechas_solicitadas > hoy && (solicitud.estado === 'Aprobada' || solicitud.estado === 'Pendiente')) {
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
				calcularDiasGastados(inicio_fechas_solicitadas, hoy, solicitud, limiteFechaInicio, limiteFechaFinal, infoTabla, indicePolitica);
			}
		});

		return infoTabla;
	}

	function construirDatosDiasGastadosPorEmpleadoPorPolitica(LibresPorPolitica, SolicitudesPorPolitica, fecha_inicio=0, fecha_final=0) {
		let limiteFechaInicio = 0;
		let limiteFechaFinal = 0;
		if (fecha_inicio!==0) {
			limiteFechaInicio = new Date(fecha_inicio);
			limiteFechaInicio.setDate(limiteFechaInicio.getDate()+1);
		}
		if (fecha_final!==0) {
			limiteFechaFinal = new Date(fecha_final);
			limiteFechaFinal.setDate(limiteFechaFinal.getDate()+1);
		}
		let infoTabla = [];

		LibresPorPolitica.forEach(elemento => {
			elemento.nombre_empleado = (elemento.nombre+' '+elemento.primer_apellido);
			elemento.total_dias_libres_disponibles = elemento.dias_libres_disponibles;
			infoTabla.push(elemento);
		});

		infoTabla.forEach(elemento => {
			elemento.dias_gastados = 0;
		})
		let hoy = new Date();

		SolicitudesPorPolitica.forEach(solicitud => {
			let inicio_fechas_solicitadas = new Date(solicitud.inicio_fechas_solicitadas);
			inicio_fechas_solicitadas.setDate(inicio_fechas_solicitadas.getDate()+1)
			let indicePolitica = infoTabla.findIndex((punto) => punto.titulo_politica===solicitud.titulo_politica &&
																punto.cedula_empleado===solicitud.cedula_empleado);
			if(indicePolitica!==-1){
				if(inicio_fechas_solicitadas > hoy && (solicitud.estado === 'Aprobada' || solicitud.estado === 'Pendiente')) {
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
				calcularDiasGastados(inicio_fechas_solicitadas, hoy, solicitud, limiteFechaInicio, limiteFechaFinal, infoTabla, indicePolitica);
			}
		});

		return infoTabla;
	}

	function construirDatosDiasGeneradosPorPolitica(BitacoraLibres, fecha_inicio=0, fecha_final=0) {
		let limiteFechaInicio = 0;
		let limiteFechaFinal = 0;
		if (fecha_inicio!==0) {
			limiteFechaInicio = new Date(fecha_inicio);
			limiteFechaInicio.setDate(limiteFechaInicio.getDate()+1);
		}
		if (fecha_final!==0) {
			limiteFechaFinal = new Date(fecha_final);
			limiteFechaFinal.setDate(limiteFechaFinal.getDate()+1);
		}
		let infoTabla = [];
		let elementosEnRango = [];

		const fechasFormateadas = BitacoraLibres.map(elemBitacora => {
			let fechaFormateada = new Date(elemBitacora.fecha);
			fechaFormateada.setDate(fechaFormateada.getDate()+1);
			return {...elemBitacora, fecha: fechaFormateada};
		})

		let BitacoraFormateada = fechasFormateadas;
		if(limiteFechaInicio!==0 && limiteFechaFinal===0) {
			elementosEnRango = BitacoraFormateada.filter(elemBitacora => elemBitacora.fecha >= limiteFechaInicio);
		} else if (limiteFechaInicio===0 && limiteFechaFinal!==0) {
			elementosEnRango = BitacoraFormateada.filter(elemBitacora => elemBitacora.fecha <= limiteFechaFinal);
		} else if (limiteFechaInicio!==0 && limiteFechaFinal!==0) {
			elementosEnRango = BitacoraFormateada.filter(elemBitacora => elemBitacora.fecha <= limiteFechaFinal && elemBitacora.fecha >= limiteFechaInicio);
		} else {
			elementosEnRango = BitacoraFormateada;
		}

		let datosDivididos = dividirArreglo(elementosEnRango);
		const arregloDatos = Object.values(datosDivididos)

		arregloDatos.forEach(politicas => {
			let suma = 0;
			politicas.forEach(politica => {
				suma += politica.dias;
			});
			let empleadosDiferentes = []
			politicas.forEach(politica => {
				let indiceEmpleado = empleadosDiferentes.findIndex((punto) => punto.cedula_empleado===politica.cedula_empleado);
				if (indiceEmpleado===-1) {
					empleadosDiferentes.push(politica);
				}
			});
			infoTabla.push({titulo_politica: politicas[0].titulo_politica, empleados_beneficio: empleadosDiferentes.length, dias_generados: suma})
		})

		return infoTabla;
	}

	const dividirArreglo = (arreglo) => {
		return arreglo.reduce((acc, bitacora) => {
		  if (!acc[bitacora.titulo_politica]) {
			acc[bitacora.titulo_politica] = [];
		  }
		  acc[bitacora.titulo_politica].push(bitacora);
		  return acc;
		}, {});
	};

	function calcularDiasGastados(inicio_fechas_solicitadas, today, solicitud, limiteFechaInicio, limiteFechaFinal, infoTabla, indicePolitica) {
		if(inicio_fechas_solicitadas <= today && solicitud.estado === 'Aprobada' && limiteFechaInicio===0 && limiteFechaFinal===0) {
			let diasCalculados = calcularDiasEntreLimites(solicitud.inicio_fechas_solicitadas, solicitud.dias_libres_solicitados, new Date(0), today);
			infoTabla[indicePolitica].dias_gastados += diasCalculados.diasAAgregar;
			infoTabla[indicePolitica].total_dias_libres_disponibles += diasCalculados.dias_libres_restantes;
		} else if (limiteFechaInicio!==0 && limiteFechaFinal===0 && solicitud.estado === 'Aprobada') {
			let diasCalculados = calcularDiasEntreLimites(solicitud.inicio_fechas_solicitadas, solicitud.dias_libres_solicitados, limiteFechaInicio, today);
			infoTabla[indicePolitica].dias_gastados += diasCalculados.diasAAgregar;
			infoTabla[indicePolitica].total_dias_libres_disponibles += diasCalculados.dias_libres_restantes;
		} else if (limiteFechaInicio===0 && limiteFechaFinal!==0 && solicitud.estado === 'Aprobada') {
			let diasCalculados = calcularDiasEntreLimites(solicitud.inicio_fechas_solicitadas, solicitud.dias_libres_solicitados, new Date(0), limiteFechaFinal);
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
		fecha_actual.setDate(fecha_actual.getDate()+1)

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
			cargarDatos:cargarDiasSolicitadosPorPolitica,
		},
        {
			nombre:"Dias gastados por empleado por política",
            cargarDatos:cargarDiasGastadosPorEmpleadoPorPolitica,
		},
        {
			nombre:"Dias generados por política",
            cargarDatos:cargarDiasGeneradosPorPolitica,
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










