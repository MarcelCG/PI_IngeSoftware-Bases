import {Modal} from '../Utiles/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from "react";

export const VerSolicitudesEmpleadorHTML = (props) => {
	const {
		solicitudesPagina,
		paginaAtras,
		cambiarPagina,
		siguientePagina,
		paginaActual,
		numeros,
        abrirModalSolicitud,
        botonRef,
        modalID
	} = props;

	function getClassForEstado(estado) {
		switch (estado) {
		  case 'Aprobada':
			return 'bg-success';
		  case 'Pendiente':
			return 'bg-warning text-dark';
		  case 'Rechazada':
			return 'bg-danger';
		  case 'Cancelada':
			  return 'bg-dark';
		  default:
			return 'bg-primary';
		}
	}	  

	return (
        <div>
        <Modal{...props}/>
	    <div ref={botonRef} 
	      data-bs-toggle="modal" data-bs-target={`#${modalID}`}/>
	      <style>{`.table th { width: 25%;}`}</style>
		<div className="col-12">
            <div className="row float-right">
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
                                    <td className="col--5 text-center">{ solicitud.cedula_empleado }</td>
                                    <td className="col--5 text-center">{ solicitud.titulo_politica }</td>
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