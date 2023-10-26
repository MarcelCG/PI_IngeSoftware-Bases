import {Modal} from '../Utiles/Modal'
import {ajustarFecha} from './verPolitica'
import {BorrarPolitica} from './borrarPolitica'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { ActualizarTiempoLibre } from '../Libres/ActualizarLibres'
import { ModalAgregarPol } from "./AddPolicy";

export const VerPoliticasHTML = (props) => {
	const {
		paginaActual,
		politicasAct,
		actualizarPagina,
		cargando,
		botonRef,
		abrirModalPolitica,
		numeros,
		esEmpleador
	} = props;

	return (
	<div className="container">
	  {cargando ? (
	    <div>
	    <ActualizarTiempoLibre />
	    <Modal{...props}/>
	    <div ref={botonRef} data-bs-toggle="modal" data-bs-target={`#${props.modalID}`}/>
	      <style>{`.table th { width: 25%;}`}</style>
	      <ModalAgregarPol botonRef={botonRef} setPolValores={props.setPolValores} />
	      <table className="table table-hover mt-titulo">
	        <thead>
	          <tr>
	            <th scope="col">&nbsp;&nbsp;&nbsp;Titulo </th>
	            <th scope="col">Inicio</th>
	            <th scope="col">Dias a dar</th>
							{esEmpleador &&
							<th scope="col">Acciones</th>}
	          </tr>
	        </thead>
	        <tbody>
	          {politicasAct.map((politica, index) => (
	            <tr key={index}>
	              <td style={{ cursor: 'pointer'}} onClick={()=> abrirModalPolitica(politica)}>
	              	{politica.titulo}
	              </td>
	              <td>{ajustarFecha(politica.fecha_inicio)}</td>
	              <td>{politica.dias_a_dar}</td>
	              {esEmpleador &&
	              <td>
	                <button className="btn-primary me-2">
	                  <FontAwesomeIcon icon={faPenToSquare} />
	                </button>
	                <BorrarPolitica politica={politica} botonRef={botonRef} setPolValores={props.setPolValores} />
	              </td>}
	            </tr>
	          ))}
	        </tbody>
	      </table>
	      <nav>
	        <ul className="pagination ">
				<li className="page-item">
					<button className="page-link"
						onClick={() => actualizarPagina(paginaActual > 1 ? paginaActual-1 : 1)}>
							<FontAwesomeIcon icon={faChevronLeft} />
					</button>
				</li>
	          {numeros.map((n) => (
	            <li className={`page-item ${paginaActual === n ?
	            'active' : ''}`} key={n}>
	              <button className="page-link"
	                onClick={() => actualizarPagina(n)}>
	                {n}
	              </button>
	            </li>
	          ))}
				<li className="page-item">
					<button className="page-link" onClick={() => actualizarPagina(paginaActual < numeros.length ? paginaActual+1 : numeros.length)}>
							<FontAwesomeIcon icon={faChevronRight} />
					</button>
				</li>
	        </ul>
	      </nav>
	    </div>
	  ) : (
	    <div className="container">
	      <div className="spinner-grow text-primary" role="status" />
	    </div>
	  )}
	</div>
	);
}