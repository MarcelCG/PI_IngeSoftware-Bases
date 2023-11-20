import axios from 'axios';
import Reportes from './Reportes'
import React, { useState } from 'react';
import {NombreEscogido, fechaLimiteIzq, fechaLimiteDer} from './Filtro'; /* a que se importan los metodos para filtrado que se vayan a usar*/
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
	/* Hook para el Reporte, Rep = Reporte */
	const [rep, setRep] = useState({ ...predeterminado });

	/*dependiendo del Reporte que les hayan tocado, deben de crear los llamados a la BD con los datos que ocupan*/
	/* a que se actualizan los datos dependiendo de la opcion que se haya escogido en el dropdown de tipo reporte*/
	async function cargarDiasSolicitadosPorPolitica() {
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

	const props = {rep, setRep, opciones};
	return(
		<>
			<div>
				<Reportes {...props}/>
			</div>
		</>
	);
}










