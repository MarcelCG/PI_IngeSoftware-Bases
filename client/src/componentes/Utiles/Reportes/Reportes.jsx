import _ from 'lodash';
import ReportesTabla from './ReportesTabla'
import React, { useState, useEffect } from 'react';
import ListaFiltros from './ListaFiltros'
import {listaFiltros, MyData} from './EjemploDatos'
import ReportesOpciones from './ReportesOpciones'
export default function Reportes (originales, ) {

	originales = [
		{id: '3', cuerpo: 'mundo'},
		{id: '2', cuerpo: 'costa rica'},
		{id: '3', cuerpo: 'comadreja'},
		{id: '3', cuerpo: 'comadreja'},
		{id: '4', cuerpo: 'chaca'},
		{id: '5', cuerpo: 'lito'},
		{id: '6', cuerpo: 'lito'}
	];

	const [datos, setDatos] = useState([...originales]);

	const [booleano, setBooleano] = useState(false);
	const props = {listaFiltros, datos, setDatos, booleano, setBooleano, originales}; 

	return (
		<div className='container p-1'>
			<div className='row container rounded shadow mb-3'>		
				<ReportesOpciones {...props}/>
			</div>
			<div className='container'>
				<ListaFiltros {...props}/>
			</div>
			<ReportesTabla {...props}/>
		</div>
	);
};