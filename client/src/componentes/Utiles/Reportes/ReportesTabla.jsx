import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function ReportesTabla ({columnas, datos, setDatos}) {

	useEffect(()=>{

	},[datos]);
	columnas = ['id','cuerpo','0'];

	// calculo de la paginacion
  const [pagAct, actPag] = useState(1);
	const filasPorPag = 5;
	const ultimoInd = pagAct * filasPorPag;
	const primerInd = ultimoInd - filasPorPag;
	const filasAct = datos.slice(primerInd, ultimoInd);
	const numPag = Math.ceil(datos.length/filasPorPag);
	const numeros = [...Array(numPag +1).keys()].slice(1);

	return (
		<div>
			<div className='row container rounded shadow mb-3'>
				<div className='rounded  p-4'>
					<style>{`.table th { width: ${columnas.length}%;}`}</style>
					<div className="overflow-hidden rounded">
				  <table className='table border border-secondary-subtle'>
				    <thead className='border border-secondary-subtle'>
				      <tr className='rounded'>
				        {columnas.map((columna, index) => (
				          <th className='bg-dark-subtle' key={index} >
				            {columna}
				          </th>
				        ))}
				      </tr>
				    </thead>
				    <tbody>
				      {filasAct.map((dato, rowIndex) => (
				        <tr key={rowIndex}>
				          {columnas.map((col, colIndex) => (
				             <td key={colIndex}>{dato[col]||'-'}</td>
				          ))}
				        </tr>
				      ))}
				    </tbody>
				  </table>
				  </div>
			</div>
			</div>
      <nav>
        <ul className="pagination">
					<li className="page-item">
						<button className="page-link outlined" onClick={() => (pagAct>1?actPag(pagAct-1) : actPag(1))}>
							<FontAwesomeIcon icon={faChevronLeft} />
						</button>
					</li>
        	{numeros.map((n) => (
          <li className={`page-item ${pagAct === n ? 'active' : ''}`} key={n}>
          	<button className="page-link" onClick={() => actPag(n)}>{n}</button>
      		</li>
        	))}
					<li className="page-item">
						<button className="page-link outlined" onClick={() => (pagAct<numeros.length?actPag(pagAct+1):actPag(pagAct))}>
							<FontAwesomeIcon icon={faChevronRight} />
						</button>
					</li>
      	</ul>
    	</nav>
		</div>
	);
}