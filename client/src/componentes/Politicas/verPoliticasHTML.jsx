import {Modal} from '../Utiles/Modal'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {ajustarFecha} from './verPolitica'
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

export const VerPoliticasHTML = (props) => {
	const {
		paginaActual,
		politicasAct,
		actualizarPagina,
		modalID,
		cargando,
		botonRef,
		abrirModalPolitica,
		numeros,
		esEmpleador,
		editarPolitica
	} = props;

	return (
	<div className="container">
	  {cargando ? (
	    <div>
	    <Modal{...props}/>
	    <div ref={botonRef} 
	      data-bs-toggle="modal" data-bs-target={`#${modalID}`}/>
	      <style>{`.table th { width: 25%;}`}</style>
	      <table className="table table-hover">
	        <thead>
	          <tr>
	            <th scope="col">&nbsp;&nbsp;&nbsp;Titulo </th>
	            <th scope="col">Inicio</th>
	            <th scope="col">Dias a dar</th>
	            {esEmpleador && <th scope="col"></th>}
	          </tr>
	        </thead>
	        <tbody>
	          {politicasAct.map((politica, index) => (
	            <tr key={index}
	              onClick={()=> abrirModalPolitica(politica)}>
	              <td><a className="btn">{politica.titulo}</a></td>
	              <td>{ajustarFecha(politica.fecha_inicio)}</td>
	              <td>{politica.dias_a_dar}</td>
	              {esEmpleador && <td>
					<button className="btn btn-outline-primary me-2" onClick={() => handleEditarPolitica(politica)}>
	                  <FontAwesomeIcon icon={faPenToSquare} />
	                </button>
	                <button className="btn btn-outline-danger">
	                  <FontAwesomeIcon icon={faTrash} />
	                </button>
	              </td>}
	            </tr>
	          ))}
	        </tbody>
	      </table>
	      <nav>
	        <ul className="pagination ">
	          {numeros.map((n) => (
	            <li className={`page-item ${paginaActual === n ?
	            'active' : ''}`} key={n}>
	              <a className="page-link"
	                onClick={() => actualizarPagina(n)}>
	                {n}
	              </a>
	            </li>
	          ))}
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