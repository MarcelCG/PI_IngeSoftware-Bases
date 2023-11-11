import _ from 'lodash';
import React, { useState } from 'react';

export const FiltroPlantilla = ({Filtro, filtroInfo, setFiltroInfo, originales}) => {
	return (
		<div className='input-group'>
		  <span className='input-group-text'><b>{Filtro.nombre}</b></span>
		  <input type={Filtro.tipo} className='form-control'
			  onChange={(e) => setFiltroInfo({ ...filtroInfo, [Filtro.nombre]: e.target.value })}
		  />
		</div>
	);
};

export const FechaEscogida = (dato, fechaMenor) => {
	return ((dato >= fechaMenor)||fechaMenor==='');
};

export const FechaEscogida2 = (dato, fechaMayor) => {
	return ((dato <= fechaMayor)||fechaMayor==='');
};

export const NombreEscogido = (dato, texto) => {
  return (dato.toLowerCase().includes(texto.toLowerCase())||texto==='');
};

export const AplicarFiltros = (listaFiltros, originales, setDatos) => {
	let temporales = [...originales];
  listaFiltros.map(filtro => {
  	if(temporales !== undefined){
	    temporales = temporales.filter(dato =>
	      filtro.funcion(dato[filtro.columna], filtro.campo)
	    );
	  }
  });
  setDatos(temporales);
};

























