import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function ReportesTabla ({rep, cargando, columnas, datos, pagAct, setRep}) {

	const filasPorPag = 5;
	const ultimoInd = pagAct * filasPorPag;
	const primerInd = ultimoInd - filasPorPag;
	const filasAct = datos.slice(primerInd, ultimoInd);
	const numPag = Math.ceil(datos.length/filasPorPag);
	const numeros = [...Array(numPag +1).keys()].slice(1);

	return (
		<>
		{cargando?(<div>
			<div className='rounded p-3'>
				<div className='rounded'>
					<style>{`.table th { width: ${columnas.length}%;}`}</style>
					<div className="overflow-hidden rounded">
				  <table className='table border border-secondary-subtle'>
				    <thead className='border border-secondary-subtle'>
				      <tr className='rounded'>
				        {columnas.map((col, index) => (
				          <th className='bg-dark-subtle' key={index} >
				            {col.nombre}
				          </th>
				        ))}
				      </tr>
				    </thead>
				    <tbody>
				      {filasAct.map((dato, rowIndex) => (
				        <tr key={rowIndex}>
				          {columnas.map((col, colIndex) => (
				             <td key={colIndex}>{dato[col.id]||'-'}</td>
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
						<button className="page-link outlined" onClick={() => (pagAct>1?setRep({...rep, pagAct:pagAct-1}):setRep({...rep,pagAct:1}))}>
							<FontAwesomeIcon icon={faChevronLeft} />
						</button>
					</li>
        	{numeros.map((n) => (
          <li className={`page-item ${pagAct === n ? 'active' : ''}`} key={n}>
          	<button className="page-link" onClick={() => setRep({...rep,pagAct:n})}>{n}</button>
      		</li>
        	))}
					<li className="page-item">
						<button className="page-link outlined" onClick={() => (pagAct<numeros.length?setRep({...rep,pagAct:pagAct+1}):setRep({...rep,pagAct}))}>
							<FontAwesomeIcon icon={faChevronRight} />
						</button>
					</li>
      	</ul>
    	</nav>
		</div>):(<></>)}
		</>
	);
}
