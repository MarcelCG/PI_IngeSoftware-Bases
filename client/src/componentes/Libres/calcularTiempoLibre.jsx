import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {PoliticasData, LibresData} from './data';
/*
-	CREAR UN TRIGGER QUE CADA VEZ QUE SE CREE UNA POLITICA SE TIENE QUE 
CREAR LIBRES PARA TODOS LOS EMPLEADOS DE LA EMPRESA DEACUERDO A ESA
POLITICA

TRAER SOLO LAS POLITICAS ACTIVAS
*/

export const CalcTiemposBoton = () => {
	const empresa = "cedula_empresa"; 
  const esEmpleador = true;
  const [Politicas, setPoliticas] = useState(PoliticasData);
  const [Libres, setLibres] = useState(LibresData);
  const [Cargando, setCargando] = useState(false);

  // const enviarDatos = async() => {
  // 	try {
  // 		const respuesta = await axios.get
  // 		(
  // 		 	`http://localhost:5000/api/calcularTiempos/${empresa}`
  // 		);
  // 		  //setPoliticas(...Politicas,respuesta[0]);
  // 		  //setLibres(...Libres,respuesta[1]);
  // 		  setCargando(true);
  // 		}
  // 		catch (error) {
  // 		  setCargando(true);
  // 		}
  // 	}

	// const cargarDatos = async() => {
	//   try {
	//     const respuesta = await axios.get
	//     (
	//     	`http://localhost:5000/api/calcularTiempos/${empresa}`
	//     );
	//     //setPoliticas(...Politicas,respuesta[0]);
	//     //setLibres(...Libres,respuesta[1]);
	//     setCargando(true);
	//   } catch (error) {
	//   	setCargando(true);
	//   }
	// };

	const Gauss = (n) => {
  	return (n * (n + 1)) / 2;
	};

	//const fechaHoy = new Date(); // Crear una instancia de Date en lugar de usar Date.now()
	const fechaHoy = new Date("2023-11-01");
	const fechaUnMesAtras = new Date(fechaHoy);
	fechaUnMesAtras.setMonth(fechaHoy.getMonth() - 1);
	const milisegHora = 3600000*24;
	let nuevasHoras = [];
	const calcularTiempos = () => {
		//cargarDatos(); // esto tengo que corregirlo
		// si no tengo un query que me traiga las politicas activas
		// debo modificar esto, NO TRAER VIGENTES

		/*cuidado, fijarme que solo traingan las politicias/libres de la misma empresa*/
		Politicas.filter(pol => new Date(pol.fecha_final) >= fechaUnMesAtras).
			forEach(pol => {
				pol.fecha_final = new Date(pol.fecha_final);
				Libres.filter(lib => lib.titulo_politica === pol.titulo).
					forEach(lib => {
					
					const ultimaAct = (fechaHoy > pol.fecha_final) ?
						pol.fecha_final:fechaHoy;

					const cantPeriodos = 
						((ultimaAct - fechaUnMesAtras) / milisegHora)/pol.periodo;

					let nuevosDias = pol.acumulativo ?
						lib.dias_libres_disponibles +
						(pol.dias_a_dar * cantPeriodos):
						pol.dias_a_dar;

					// ocupo tener una variable que me diga la cantida de periodos
					// que han pasado desde la ultima actualizacion
					// Aplicar Gauss para el calculo de dias que le corresponden
					//	por los dias incrementativos
					if(pol.incrementativo){
						nuevosDias += 
						pol.dias_a_incrementar * Gauss(cantPeriodos-1) - Gauss(lib.periodosRecorridos);
					}

				  const libre = {
				  	cedEmple: cantPeriodos,
				  	tituloPol: lib.titulo_politica,
				  	horas: nuevosDias
					};
					nuevasHoras.push(libre);
			});
		});
		console.log(nuevasHoras);
	};

	return (
		<div>
			<button onClick={calcularTiempos}>
				hola mundo
			</button >
		</div>
	);

};


/*


*/