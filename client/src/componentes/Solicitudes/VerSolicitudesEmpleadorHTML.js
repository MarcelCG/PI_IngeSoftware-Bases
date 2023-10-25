import {Modal} from '../Utiles/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, {useState, useEffect} from "react";
import FiltrarSolicitudesEmpleador from './filtrarSolicitudesEmpleador.js'

export const VerSolicitudesEmpleadorHTML = (props) => {
	const {
		solicitudes,
        abrirModalSolicitud,
        botonRef,
        modalID,
        filtroEstado,
        setFiltroEstado,
        handleFiltroEstado,
        getClassForEstado
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
                <div className="col-10"></div>
                <FiltrarSolicitudesEmpleador solicitudes={solicitudes} filtrarSolicitudes={filtrarSolicitudes}/>
            </div>
            <hr></hr>
            <div className="table-responsive mb-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="col--5 text-center" scope="col">Nombre</th>
                                <th className="col--5 text-center" scope="col">Politica</th>
                                <th className="col--5 text-center" scope="col">Fechas Solicitadas</th>
                                <th className="col--5 text-center" scope="col">Estado</th>
                                <th className="col--5 text-center" scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            { solicitudesPagina.map ( (solicitud, index) => (
                                <tr  key={index}
                                onClick={()=> abrirModalSolicitud(solicitud)}>
                                    <td className="col--5 text-center">{ solicitud.nombre_completo }</td>
                                    <td className="col--5 text-center">{ solicitud.politica }</td>
                                    <td className="col--5 text-center">{ solicitud.fecha_inicio === solicitud.fecha_final
																? solicitud.fecha_inicio
																: `${solicitud.fecha_inicio} - ${solicitud.fecha_final}`}</td>
                                    <td className="col--5 text-center">
										<span style={{ fontSize: '1rem'}}
										 className={`badge rounded-pill  ${getClassForEstado(solicitud.estado)} `}>
											{ solicitud.estado }</span>
									</td>
                                    <td className="col--5 acciones text-center">
										<button className='btn btn-primary'>Gestionar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav>
                        <ul className="pagination">
                            <li className="page-item">
                                <a href="#" className="page-link"
                                    onClick={paginaAtras}>Prev</a>
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
                                <a href="#" className="page-link"
                                    onClick={siguientePagina}>Next</a>
                            </li>
                        </ul>
                    </nav>
            </div>
        </div>
    </div>
	);
}