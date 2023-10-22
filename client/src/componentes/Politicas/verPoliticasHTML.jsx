import {Modal} from '../Utiles/Modal'
import {ajustarFecha} from './verPolitica'
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faChevronLeft, faChevronRight, faPlus }
 from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

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
		esEmpleador
	} = props;

	return (
	<div className="container">
	  {cargando ? (
<<<<<<< HEAD
	    <div>
	    <ActualizarTiempoLibre />
=======
	    <div className='row'>
>>>>>>> desarrollo
	    <Modal{...props}/>
	    <div ref={botonRef} 
	      data-bs-toggle="modal" data-bs-target={`#${modalID}`}/>
	      <style>{`.table th { width: 25%;}`}</style>
            <div className="row mb-4 col-12 d-flex p-1 align-items-center">
                <Link to="/app/politicas/addPoliticas" className="btn-primary col-2 continuar">
                    <FontAwesomeIcon icon={faPlus} />Agregar
                </Link>
            </div>
	      <table className="table table-hover mt-titulo">
	        <thead>
	          <tr>
	            <th scope="col">&nbsp;&nbsp;&nbsp;Titulo </th>
	            <th scope="col">Inicio</th>
	            <th scope="col">Dias a dar</th>
				<th scope="col">Acciones</th>
	            {esEmpleador && <th scope="col"></th>}
	          </tr>
	        </thead>
	        <tbody>
	          {politicasAct.map((politica, index) => (
	            <tr key={index}
	              onClick={()=> abrirModalPolitica(politica)}>
<<<<<<< HEAD
	              <td><div className="btn">{politica.titulo}</div></td>
=======
	              <td><button className="btn">{politica.titulo}</button></td>
>>>>>>> desarrollo
	              <td>{ajustarFecha(politica.fecha_inicio)}</td>
	              <td>{politica.dias_a_dar}</td>
	              {esEmpleador && <td>
	                <button className="btn-primary me-2">
	                  <FontAwesomeIcon icon={faPenToSquare} />
	                </button>
	                <button className="btn-danger">
	                  <FontAwesomeIcon icon={faTrash} />
	                </button>
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
					<button className="page-link"
						onClick={() => 
							actualizarPagina(paginaActual < numeros.length ? paginaActual+1 : numeros.length)}>
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