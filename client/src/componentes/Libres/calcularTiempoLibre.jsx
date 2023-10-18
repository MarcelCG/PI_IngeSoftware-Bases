import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import {PoliticasData, LibresData} from './data';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

/*CREAR UN TRIGGER QUE CADA VEZ QUE SE CREE UNA POLITICA SE TIENE QUE 
CREAR LIBRES PARA TODOS LOS EMPLEADOS DE LA EMPRESA DEACUERDO A ESA
POLITICA*/

export const CalcTiemposBoton = () => {
	const empresa = "cedula_empresa"; 
  const esEmpleador = true;
  const [Politicas, setPoliticas] = useState([]);
  const [Libres, setLibres] = useState([]);

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

	const cargarDatos = async() => {
	  try {
	    const respuesta = await axios.get
	    (`http://localhost:5000/api/libres/getLibPol/${empresa}`,);
	    setPoliticas(respuesta.data.politicas);
	    setLibres(respuesta.data.libres);
	    console.log("hola")
	  } catch (error) {

	  }
	};

	const Gauss = (n) => {
  	return (n * (n + 1)) / 2;
	};

	//const fechaHoy = new Date();
	const fechaHoy = new Date("2023-11-01");
	const fechaUnMesAtras = new Date(fechaHoy);
	fechaUnMesAtras.setMonth(fechaHoy.getMonth() - 1);
	const milisegDia = 86400000; // milisegundos en un dia
	let nuevosDias = [];

	const calcularTiempos = async () => {
		await cargarDatos(); // no traer vigentes

		Politicas.filter(pol => 
			new Date(pol.fecha_final) >= fechaUnMesAtras &&
			new Date(pol.fecha_inicio) <= fechaHoy).
			forEach(pol => {
				pol.fecha_final = new Date(pol.fecha_final);

				Libres.filter(lib => lib.titulo_politica === pol.titulo).
					forEach(lib => {
				
					const ultimaAct = (fechaHoy > pol.fecha_final) ?
						pol.fecha_final:fechaHoy;

					const cantPeriodos = 
						((ultimaAct - fechaUnMesAtras) / milisegDia)/pol.periodo;

					let newDays = pol.acumulativo ?
						lib.dias_libres_disponibles +
						(pol.dias_a_dar * cantPeriodos):
						pol.dias_a_dar;

					if(pol.incrementativo){
						newDays += 
						pol.dias_a_incrementar * 
						( Gauss((cantPeriodos - 1) + lib.periodosRecorridos) -
						Gauss(cantPeriodos - 1) );
					}

				  const libre = {
				  	cedEmple: lib.cedula_empleado,
				  	tituloPol: lib.titulo_politica,
				  	Dias: newDays
					};
				
					nuevosDias.push(libre);
			});
		});
		const numEmpleados = nuevosDias.filter((item, indice, self) =>
				self.findIndex((elemento) =>
					elemento.cedEmple === item.cedEmple) === indice
			).length;

		toast.success(`Empleados actualizados: ${numEmpleados}`,
			{position: toast.POSITION.TOP_CENTER,
			className:"alert alert-success"});
		
	};

	return (
		<div>
			<ToastContainer autoClose={2500}/>
			<button onClick={calcularTiempos}>
				hola mundo
			</button >
		</div>
	);

};