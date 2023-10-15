import React, { useEffect, useState } from 'react';
import axios from 'axios';
/*
CREAR UN TRIGGER QUE CADA VEZ QUE SE CREE UNA POLITICA SE TIENE QUE 
CREAR LIBRES PARA TODOS LOS EMPLEADOS DEACUERDO A ESA POLITICA PARA
LOS EMPLEADOS DE LA EMPRESA

OTRO TRIGGER QUE CUANDO UNA POLITICA 

TRAER SOLO LAS POLITICAS ACTIVAS
*/

export const calcTiemposBoton = () => {

	const empresa = "cedula_empresa"; 
  const esEmpleador = true;
  const [Politicas, setPoliticas] = useState([]);
  const [Libres, setLibres] = useState([]);
  const [Cargando, setCargando] = useState(false);

	const cargarDatos = async () => {
	  try {
	    const respuesta =await axios.get
	    (
	    	`http://localhost:5000/api/calcularTiempos/${empresa}`
	    );
	    setPoliticas(...Politicas,respuesta[0]);
	    setLibres(...Libres,respuesta[0]);
	    setCargando(true);
	  } catch (error) {
	  	setCargando(true);
	  }
	};

	const Gauss = (n) => {
  	return (n * (n + 1)) / 2;
	};

	const fechaHoy = Date.now();
  const fechaUnMesAtras = new Date(fechaHoy);
  fechaUnMesAtras.setMonth(fechaHoy.getMonth() - 1);
  const milisegcHora = 3600000;
	let nuevasHoras = [];

	const calcularTiempos = () => {
		cargarDatos();

		Politicas.forEach((pol) => {
			const libreDePolitica = Libres.find((lib) => 
				lib.titulo_politica === pol.titulo);

			if(fechaUnMesAtras <= pol.fecha_final){
				const ultimaAct = (fechaHoy > pol.fecha_final)?
					pol.fecha_final:fechaHoy;
				const cantPeriodos = 
					((fechaUnMesAtras-ultimaAct) / milisegcHora)/pol.periodo;

				let DiasIncrementar = pol.acumulativo ?
					libreDePolitica.dias_libres_disponibles +
					(pol.dias_a_dar * cantPeriodos):
					pol.dias_a_dar;

				// ocupo tener una variable que me diga la cantida de periodos
				// que han pasado desde la ultima actualizacion
				// Aplicar Gauss para el calculo de dias que le corresponden
				//	por los dias incrementativos
				if(pol.incrementativo){
					DiasIncrementar += 
					pol.dias_a_incrementar * Gauss(cantPeriodos);
				}
			  const libre = {
			  	cedEmple: lib.cedula_empleado,
			  	tituloPol: lib.titulo_politica,
			  	horas: DiasIncrementar
				};

				nuevasHoras.push(libre);
			}
			else {
				// deberiade poner politica como no aciva?
			}
		}
	};

	return
	(
		<>
			<div>
				hola mundo
			</div>
		</>
	);

};
