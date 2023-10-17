import React, { useEffect, useState } from 'react';
import axios from 'axios';
/*
-	CREAR UN TRIGGER QUE CADA VEZ QUE SE CREE UNA POLITICA SE TIENE QUE 
CREAR LIBRES PARA TODOS LOS EMPLEADOS DE LA EMPRESA DEACUERDO A ESA
POLITICA

-	OTRO TRIGGER QUE CUANDO UNA POLITICA , SE ME OLVIDO XD

TRAER SOLO LAS POLITICAS ACTIVAS
*/

export const calcTiemposBoton = () => {

	const empresa = "cedula_empresa"; 
  const esEmpleador = true;
  const [Politicas, setPoliticas] = useState([]);
  const [Libres, setLibres] = useState([]);
  const [Cargando, setCargando] = useState(false);

  const enviarDatos = async() => {
  	try {
  		const respuesta = await axios.get
  		(
  		 	`http://localhost:5000/api/calcularTiempos/${empresa}`
  		);
  		  setPoliticas(...Politicas,respuesta[0]);
  		  setLibres(...Libres,respuesta[1]);
  		  setCargando(true);
  		}
  		catch (error) {
  		  setCargando(true);
  		}
  	}

	const cargarDatos = async() => {
	  try {
	    const respuesta = await axios.get
	    (
	    	`http://localhost:5000/api/calcularTiempos/${empresa}`
	    );
	    setPoliticas(...Politicas,respuesta[0]);
	    setLibres(...Libres,respuesta[1]);
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
  const milisegHora = 3600000;
	let nuevasHoras = [];

	const calcularTiempos = () => {
		cargarDatos(); // esto tengo que corregirlo
		// si no tengo un query que me traiga las politicas activas
		// debo modificar esto, VIGENTES
		Politicas.filter(pol => pol.fecha_final >= fechaUnMesAtras).
			forEach(pol => {
				Libres.filter(lib => lib.titulo_politica === pol.titulo).
					forEach(lib => {
					
					const ultimaAct = (fechaHoy > pol.fecha_final) ?
						pol.fecha_final:fechaHoy;

					const cantPeriodos = 
						((fechaUnMesAtras - ultimaAct) / milisegHora)/pol.periodo;

					let DiasIncrementar = pol.acumulativo ?
						lib.dias_libres_disponibles +
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
			});
		});
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


/*
	-	
	-
	-
	-
	-
	-
*/