import {Modal} from '../Utiles/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash, faPenToSquare, faPlus, faEye, faChevronLeft, faChevronRight }
 from '@fortawesome/free-solid-svg-icons'
import React, {useState} from "react";
import FiltrarSolicitudes from './filtrarSolicitudes.js'
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export const VerSolicitudesHTML = (props) => {
	const {
		solicitudes,
        abrirModalSolicitud,
        modalID,
        botonRef,
        obtenerEstiloPorEstado,
        esEmpleador
	} = props;

    const [solicitudesFiltradas, filtrarSolicitudes] = useState([])

    const [paginaActual, setPaginaActual] = useState(1);
    const solicitudesPorPagina = 5;
    const ultimoIndice = paginaActual * solicitudesPorPagina;
    const primerIndice = ultimoIndice - solicitudesPorPagina;
    const solicitudesPagina = solicitudesFiltradas.slice(primerIndice, ultimoIndice);
    const numPag = Math.ceil(solicitudesFiltradas.length/solicitudesPorPagina);
    const numeros = [...Array(numPag +1).keys()].slice(1)
  
    function paginaAtras() {
        if(paginaActual !== 1) {
            setPaginaActual(paginaActual-1)
        }
    }
    function cambiarPagina(id) {
        setPaginaActual(id)
    }
    function siguientePagina() {
        if(paginaActual !== numPag) {
            setPaginaActual(paginaActual+1)
        }
    }

	return (
        <div>
        <Modal{...props}/>
	    <div ref={botonRef} 
	      data-bs-toggle="modal" data-bs-target={`#${modalID}`}/>
	      <style>{`.table th { width: 25%;}`}</style>
		<div className="col-12">
            <div className="row mb-4 col-12 d-flex p-1 align-items-end">
                { esEmpleador === true ? (
                    <>
                        <div className="col-10"></div>
                        <FiltrarSolicitudes solicitudes={solicitudes} filtrarSolicitudes={filtrarSolicitudes}/>
                    </>
                ) : (
                    <>
                        <div className="col-8"></div>
                        <FiltrarSolicitudes solicitudes={solicitudes} filtrarSolicitudes={filtrarSolicitudes}/>
                        <div className=' col-2'>
                            <Link to="/app/solicitudes/agregarSolicitud" className="btn-primary continuar">
                                <FontAwesomeIcon icon={faPlus} />Agregar
                            </Link>
                        </div>
                    </>
                )}
            </div>
            <hr></hr>
            <div className="table-responsive mb-4">
                    <table className="table">
                        <thead>
                            <tr>
                                { esEmpleador === true ? (
                                    <>
                                        <th className="col--5 text-center" scope="col">Nombre</th>
                                        <th className="col--5 text-center" scope="col">Politica</th>
                                    </>
                                ) : (
                                    <>
                                        <th className="col--5 text-center" scope="col">Politica</th>
                                        <th className="col--5 text-center" scope="col">Fecha de Solicitud</th>
                                    </>
                                )}
                                <th className="col--5 text-center" scope="col">Fechas Solicitadas</th>
                                <th className="col--5 text-center" scope="col">Estado</th>
                                <th className="col--5 text-center" scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            { solicitudesPagina.map ( (solicitud, index) => (
                                <tr  key={index}
                                onClick={()=> abrirModalSolicitud(solicitud)}>
                                    { esEmpleador === true ? (
                                        <>
                                            <td className="col--5 text-center">{ solicitud.nombre_completo }</td>
                                            <td className="col--5 text-center">{ solicitud.politica }</td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="col--5 text-center">{ solicitud.politica }</td>
                                            <td className="col--5 text-center">{ solicitud.fecha_solicitud_nueva }</td>
                                        </>
                                    )}
                                    <td className="col--5 text-center">{ solicitud.fecha_inicio === solicitud.fecha_final
																? solicitud.fecha_inicio
																: `${solicitud.fecha_inicio} - ${solicitud.fecha_final}`}</td>
                                    <td className="col--5 text-center">
										<span style={{ fontSize: '1rem'}}
										 className={`badge rounded-pill  ${obtenerEstiloPorEstado(solicitud.estado)} `}>
											{ solicitud.estado }</span>
									</td>
                                    { esEmpleador === true ? (
                                        <td className="col--5 acciones text-center">
										    {solicitud.estado === "Pendiente"?
                                            (<button className='btn btn-primary'><FontAwesomeIcon icon={faPenToSquare} /></button>):
                                            (<button className='btn btn-primary'><FontAwesomeIcon icon={faEye} /></button>)}
                                        </td>
                                    ) : (
                                        <td className="col--5 acciones text-center d-flex flex-row">
                                            <button className="btn-primary me-2">
                                            <FontAwesomeIcon icon={faEye} />
                                            </button>
                                            <button className="btn-danger">
                                            <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav>
                        <ul className="pagination">
                            <li className="page-item">
                                <button className="page-link"
                                    onClick={paginaAtras}><FontAwesomeIcon icon={faChevronLeft} /></button>
                            </li>
                            {
                                numeros.map((n, i) => (
                                    <li className={`page-item ${paginaActual === n ? 'active' : ''}`} key={i}>
                                        <a href="#" className='page-link'
                                        onClick={()=> cambiarPagina(n)}>{n}</a>
                                    </li>
                                ))
                            }
                            <li className="page-item">
                            <button className="page-link"
                                onClick={siguientePagina}><FontAwesomeIcon icon={faChevronRight} /></button>
                            </li>
                        </ul>
                    </nav>
            </div>
        </div>
        <ToastContainer/>
    </div>
	);
}