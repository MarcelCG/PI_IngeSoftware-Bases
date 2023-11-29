import React from 'react';
import FiltrosLista from './FiltrosLista'
import ReportesTabla from './ReportesTabla'
import ReportesOpciones from './ReportesOpciones'

export default function Reportes ({rep, setRep, opciones, datosEmpresa}) {

	const props = {...rep, rep, opciones, setRep, datosEmpresa}; 
	return (
		<div className='container p-1'>
			<div className='row container shadow rounded mb-3'>		
				<ReportesOpciones {...props}/>
			</div>
			<div className='row container rounded mb-3'>
				<FiltrosLista {...props}/>
			</div>
			<div className='row container shadow rounded mb-3'>
				<ReportesTabla {...props}/>
			</div>
		</div>
	);
};