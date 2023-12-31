import axios from 'axios';
import Reportes from './Reportes'
import React, { useState } from 'react';
import {NombreEscogido, fechaLimiteIzq} from './Filtro'; /* a que se importan los metodos para filtrado que se vayan a usar*/
import { URLApi } from '../../Compartido/Constantes';
import { useAutent } from "../../../contexto/ContextoAutenticacion";

export default function EjemploDatos () {

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
	async function cargarEmpleados() {
		setRep({...predeterminado, cargando:true});
	  try {
	    const respuesta = await axios.get(`${URLApi}empleados/allByEmpresa/${empresa}`);
	    	setRep({
	    		cargando:false,
	    		titulo:'Empleados',
	    		pagAct:1,
	    		originales:[...respuesta.data],
	    		datos:[...respuesta.data],
	    		filtros:[
	    			{nombre:"Cedula",tipo:"texto",funcion:NombreEscogido,campo:'',columna:'cedula'},
	    			{nombre:"Rol",tipo:"texto",funcion:NombreEscogido,campo:'',columna:'rol'},],
	    		columnas:[
	    			{nombre:"Cedula empleado", id:"cedula"}, {nombre:"Rol", id:"rol"}]
	    	})
	  } catch (error) {
	  	console.error('500')
	  }
	};

	async function cargarPoliticas() {
		setRep({...predeterminado, cargando:true});
	  try {
	    const respuesta = await axios.get(`${URLApi}politicas/byCedula/${empresa}`);
	    	setRep({
	    		cargando:false,
	    		titulo:'Politicas',
	    		pagAct:1,
	    		originales:[...respuesta.data],
	    		datos:[...respuesta.data],	
	    		filtros: [
	    		    { nombre: "Titulo", tipo: "texto", funcion: NombreEscogido, campo: '', columna: 'titulo' },
	    		    { nombre: "Fecha Inicio", tipo: 'date', funcion: fechaLimiteIzq, campo: '', columna: 'fecha_inicio' }],
	    		columnas:[
	    			{nombre:"Titulo",id:"titulo"}, {nombre:"Fecha Inicio",id:"fecha_inicio"}]
	    	})
	  } catch (error) {
	  	console.error('500')
	  }
	};

	/* opciones en el dropdown con las que se va a actualizar el reporte*/ 
	const opciones = [
		{
			nombre:"Politicas",
			cargarDatos:cargarPoliticas
		},
		{
			nombre:"Empleados",
			cargarDatos:cargarEmpleados
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










