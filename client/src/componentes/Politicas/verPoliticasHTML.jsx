import {Modal} from '../Utiles/Modal'
import {ajustarFecha} from './verPolitica'
import {BorrarPolitica} from './borrarPolitica'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import { ToastContainer } from 'react-toastify';
import { ActualizarTiempoLibre } from '../Libres/ActualizarLibres'
import { ModalAgregarPol } from "./AddPolicy";
import BuscarPoliticas from './BuscarPolitica';

export const VerPoliticasHTML = (props) => {
	const {
		paginaActual,
		politicasAct,
		actualizarPagina,
		cargando,
		botonRef,
		abrirModalPolitica,
		numeros,
		esEmpleador,
		politicas,
		filtrarPoliticas,
		manejoEditarPolitica
	} = props;

	return (
	<div className="container">
		<ToastContainer/>
	  {cargando ? (
	    <div>
		<ActualizarTiempoLibre />
		<Modal{...props}/>
	    <div ref={botonRef} 
	      data-bs-toggle="modal" data-bs-target={`#${props.modalID}`}/>
	      <style>{`.table th { width: 25%;}`}</style>
            <div className="row mb-4 col-12 d-flex p-1 align-items-center">
				<div className="col-10">
					<BuscarPoliticas politicas={politicas} filtrarPoliticas={filtrarPoliticas} />
				</div>
				<ModalAgregarPol {...props}/>
            </div>
	      <table className="table table-hover">
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
                    <button className="btn-primary me-2" onClick={() => manejoEditarPolitica(politica)}>
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