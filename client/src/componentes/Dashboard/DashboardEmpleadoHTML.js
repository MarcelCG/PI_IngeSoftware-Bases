import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight }
 from '@fortawesome/free-solid-svg-icons'
import React, {useState} from "react";

export const DashboardEmpleadoHTML = (props) => {
	const { politicas } = props;
  
  let totalDiasDisponibles = 0;
  politicas.forEach(politica => {
    totalDiasDisponibles +=
         politica.dias_libres_disponibles;
  });

  const [paginaActual, setPaginaActual] = useState(1);
  const politicasPorPagina = 6;
  const ultimoIndice = paginaActual * politicasPorPagina;
  const primerIndice = ultimoIndice - politicasPorPagina;
  const politicasPagina = politicas.slice(primerIndice, ultimoIndice);
  const numPag = Math.ceil(politicas.length/politicasPorPagina);
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
    <>
      <div className='mb-4'>
        <h5>Total de dias disponibles: {totalDiasDisponibles}</h5>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {politicasPagina.map( (politica, index) => (
          <div className="col">
            <div className="card">
              <div className='card-header'>
                <h5 className='card-title mt-1'>{politica.titulo_politica}</h5>
              </div>
              <div className="card-body">
                  <tr>Dias disponibles: {politica.dias_libres_disponibles}</tr>
                  <hr/>
                  <tr>Dias pendientes
                    de aprobación: {politica.dias_pendientes_aprobacion}</tr>
                  <hr/>
                  <tr>Dias próximos
                    a utilizar: {politica.dias_proximos_utilizar}</tr>
              </div>
            </div>
          </div>
        ))}
      </div>
      {politicas.length > 6 ? (
        <nav className='mt-4'>
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
      ) : (<></>)
      }
    </>
	);
}