import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import {FiltroPlantilla} from './Filtro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faPrint } from '@fortawesome/free-solid-svg-icons'

export default function ReportesOpciones ({ReportesLista, SetDatos, booleano, setBooleano}) {
	const ejemploFuncion = (nombre) => {
	};

	const [opciones, setOpciones] = useState([
		{
			nombre:'Politicas',
			funcion:ejemploFuncion
		},
		{
			nombre:'Politicas y tiempo',
			funcion:ejemploFuncion
		},
		{
			nombre:'Politicas y comadrejas',
			funcion:ejemploFuncion
		},
		{
			nombre:'jeremy espinoza',
			funcion:ejemploFuncion
		},
		{
			nombre:'el zancudo loco',
			funcion:ejemploFuncion
		},
	]);

	const [Titulo, setTitulo] = useState('Elegir');

	const funcion = (opcion) => {
		setTitulo(opcion.nombre);
		opcion.funcion();
	};

	return (
	<div className='text-center mb-1 p-1 row justify-content-between'>
		<div className='col-4'> 
	  	<style>{`.dropdown-item {cursor: pointer;transition: transform 0.1s;} .dropdown-item:hover {background-color:blue;color:white;font-weight: bold;transform: scale(1.1);}`}</style>
	    <div className='dropend'>
	      <b style={{ fontSize: '20px'}}>Tipo de reporte&nbsp;&nbsp;&nbsp;</b> 
	      <button className='btn btn-outline-primary dropdown-toggle btn-lg' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
	        {Titulo}
	      </button>
	      <ul className='dropdown-menu' style={{maxHeight:'145px',maxWidth:'200px',overflowY:'auto',overflowX:'hidden'}}>
	        {opciones.map((opcion, index) => (
	          <React.Fragment key={index}>
	            <li className='dropdown-item ' onClick={() => funcion(opcion)}>{opcion.nombre}</li>
	            {index < opciones.length - 1 && <li className="dropdown-divider"></li>}
	          </React.Fragment>
	        ))}
	      </ul>
	    </div>
	  </div>
  	<div className='col-4'>
      <button className='btn btn-outline-success btn-lg' data-bs-toggle='collapse' data-bs-target='#flush-collapseOne' aria-expanded='false' aria-controls='flush-collapseOne'>
      	Filtros <FontAwesomeIcon icon={faFilter} />
      </button>
    </div>
    <div className='col-4'>
    	<button className='btn btn-outline-secondary btn-lg'>
    		Imprimir <FontAwesomeIcon icon={faPrint} />
    	</button>
    </div>
	</div>
	);
};