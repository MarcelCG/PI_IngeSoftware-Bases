import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import {FiltroPlantilla, AplicarFiltros} from './Filtro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBroom } from '@fortawesome/free-solid-svg-icons'

export default function FiltrosLista ({rep, filtros, setRep, opciones, cargando, originales}) {

	const [filtroCampo, setFiltroCampo] = useState({});

	const actualizarCampo = () => {
		filtros.forEach((filtro) => {filtro['campo'] = filtroCampo[filtro['nombre']];});
	};

	useEffect(() => {
		filtros.forEach((filtro) => {
	    setFiltroCampo((prev) => ({ ...prev, [filtro.nombre]:''}));
	  });
	}, [filtros]);

	const filtrar = () => {
		console.log(filtros)
		actualizarCampo();
		if (filtros[0].columna==="fecha_inicioRepEmpleador1") {
			let fechaInicio = filtroCampo['Fecha de Inicio'];
			let fechaFinal = filtroCampo['Fecha Final'];
			// Llamar a cargarDiasSolicitadosPorPolitica si alguna fecha es seleccionada
			if (fechaInicio || fechaFinal) {
				if (fechaInicio === "") {fechaInicio=0}
				if (fechaFinal === "") {fechaFinal=0}
				opciones[0].cargarDatos(fechaInicio, fechaFinal);
			}
		} else if(filtros[1].columna==="fecha_inicioRepEmpleador2") {
			let fechaInicio = filtroCampo['Fecha de Inicio'];
			let fechaFinal = filtroCampo['Fecha Final'];
			let politica = filtroCampo['Politica'];

			if (politica) {} else {politica=0};
			if (fechaInicio || fechaFinal || politica) {
				if (fechaInicio === "") {fechaInicio=0}
				if (fechaFinal === "") {fechaFinal=0}
				opciones[1].cargarDatos(politica, fechaInicio, fechaFinal);
			}
		} else if (filtros[0].columna==="fecha_inicioRepEmpleador3") {
			let fechaInicio = filtroCampo['Fecha de Inicio'];
			let fechaFinal = filtroCampo['Fecha Final'];
			// Llamar a cargarDiasSolicitadosPorPolitica si alguna fecha es seleccionada
			if (fechaInicio || fechaFinal) {
				if (fechaInicio === "") {fechaInicio=0}
				if (fechaFinal === "") {fechaFinal=0}
				opciones[2].cargarDatos(fechaInicio, fechaFinal);
			}
		}
		AplicarFiltros(rep, filtros, originales, setRep);
	};

	const limpiar = () => {
		filtros.forEach((filtro) => {	
			document.getElementById(`${filtro.nombre}`).value = '';
			filtro['campo'] = '';
		});
		if (filtros[0].columna==="fecha_inicioRepEmpleador1") {
			opciones[0].cargarDatos();
		} else if (filtros[1].columna==="fecha_inicioRepEmpleador2") {
			opciones[1].cargarDatos();
		} else if (filtros[0].columna==="fecha_inicioRepEmpleador3") {
			opciones[2].cargarDatos();
		}
		AplicarFiltros(rep, filtros, originales, setRep);
	};

	return(
		<div className='row'>
			<div className='accordion accordion-flush p-1' id='accordionFlushExample'>
			  <div className='accordion-item'>
			    <div id='flush-collapseOne' className='accordion-collapse collapse' data-bs-parent='#accordionFlushExample'>
			      <div className='accordion-body row '>
			      {filtros.map((filtro) => (
			      	<div className='col-6 p-1 rounded' key={filtro.nombre}>
			      		<FiltroPlantilla filtro={filtro} originales={originales}
			      		filtroCampo={filtroCampo} setFiltroCampo={setFiltroCampo}/>
			      	</div>
			      ))}
				      <div className='d-flex row justify-content-end'>
				      	<button className={`btn btn-warning btn-lg col-2 m-2 ${!cargando?'':'disabled'}`} onClick={limpiar}>
				      		Limpiar<FontAwesomeIcon className="ms-1" icon={faBroom} />
				      	</button>
				      	<button className={`btn btn-info btn-lg col-2 m-2 ${!cargando?'':'disabled'}`} onClick={filtrar}>
				      		Buscar<FontAwesomeIcon className="ms-1" icon={faSearch} />
				      	</button>
				      </div>
			      </div>
			    </div>
			  </div>
			</div>
		</div>
	);
};
