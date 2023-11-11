import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import {FiltroPlantilla, AplicarFiltros} from './Filtro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBroom } from '@fortawesome/free-solid-svg-icons'

export default function ListaFiltros ({listaFiltros, datos, setDatos, booleano, originales}) {

	const [filtroInfo, setFiltroInfo] = useState({});
	useEffect(() => {
		const filtrosNombres = {};
		listaFiltros.forEach((filtro) => {
      filtrosNombres[filtro.nombre] = '';
    });
    setFiltroInfo(filtrosNombres);
	}, [listaFiltros]);

	const actualizarCampo = () => {
		listaFiltros.forEach((filtro) => {
		  filtro['campo'] = filtroInfo[filtro['nombre']];
		});
	};

	const filtrar = () => {
		actualizarCampo();
		AplicarFiltros(listaFiltros, originales, setDatos);

	};

	return(
		<div className='row'>
			<div className='accordion accordion-flush p-1' id='accordionFlushExample'>
			  <div className='accordion-item'>
			    <div id='flush-collapseOne' className='accordion-collapse collapse' data-bs-parent='#accordionFlushExample'>
			      <div className='accordion-body row '>
			      {listaFiltros.map((filtro) => (
			      	<div className='col-6 p-1 rounded' key={filtro.nombre}>
			      		<FiltroPlantilla Filtro={filtro} originales={originales}
			      		filtroInfo={filtroInfo} setFiltroInfo={setFiltroInfo}/>
			      	</div>
			      ))}
				      <div className='d-flex row justify-content-end'>
				      	<button className='btn btn-outline-danger btn-lg col-2 m-2' onClick={filtrar}>
				      		Limpiar<FontAwesomeIcon icon={faBroom} />
				      	</button>
				      	<button className='btn btn-outline-info btn-lg col-2 m-2' onClick={filtrar}>
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
