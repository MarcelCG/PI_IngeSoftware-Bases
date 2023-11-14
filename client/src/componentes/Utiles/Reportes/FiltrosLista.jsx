import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import {FiltroPlantilla, AplicarFiltros} from './Filtro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBroom } from '@fortawesome/free-solid-svg-icons'

export default function FiltrosLista ({rep, filtros, setRep, cargando, originales}) {

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
		actualizarCampo();
		AplicarFiltros(rep, filtros, originales, setRep);
	};

	const limpiar = () => {
		filtros.forEach((filtro) => {	
			document.getElementById(`${filtro.nombre}`).value = '';
			filtro['campo'] = '';
		});
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
				      		Limpiar<FontAwesomeIcon icon={faBroom} />
				      	</button>
				      	<button className={`btn btn-info btn-lg col-2 m-2 ${!cargando?'':'disabled'}`} onClick={filtrar}>
				      		Buscar<FontAwesomeIcon icon={faSearch} />
				      	</button>
				      </div>
			      </div>
			    </div>
			  </div>
			</div>
		</div>
	);
};
