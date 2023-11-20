import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faPrint } from '@fortawesome/free-solid-svg-icons'

export default function ReportesOpciones ({titulo, cargando, filtros, opciones, setState, state}) {

	return (
	<div className='text-center mb-1 p-1 row '>
		<div className='col-8'> 
			<style>{`.dropdown-item {cursor: pointer;transition: transform 0.1s;}.dropdown-item:hover {background-color:#5b88a5;color:white;font-weight: bold;transform: scale(1.01);}`}</style>
			<div className='dropend'>
				<b style={{fontSize:'20px'}}>Tipo de reporte&nbsp;&nbsp;&nbsp;</b> 
				<button className='btn btn-primary btn-outline-primary dropdown-toggle btn-lg'
				 type='button' data-bs-toggle='dropdown' aria-expanded='false'>{titulo}
				</button>
				<ul className='dropdown-menu' style={{maxHeight:'145px',overflowY:'auto',overflowX:'hidden'}}>
					{opciones.map((opcion, index) => (
					<React.Fragment key={index}>
						<li className='dropdown-item' onClick={() => opcion.cargarDatos()}>{opcion.nombre}</li>
						
					</React.Fragment>
					))}
				</ul>
				<button className={`btn btn-primary btn-lg ms-3 ${!cargando?'':'disabled'}`}
				 data-bs-toggle='collapse' data-bs-target='#flush-collapseOne' aria-expanded='false'
				  aria-controls='flush-collapseOne'>
					Filtros<FontAwesomeIcon className="ms-1" icon={faFilter} />
				</button>
			</div>
	  	</div>
		<div className='col-4'>
			<button className={`btn btn-secondary btn-lg ${!cargando?'': 'disabled'}`}>
				Imprimir<FontAwesomeIcon className="ms-1" icon={faPrint} />
			</button>
		</div>
	</div>
	);
};