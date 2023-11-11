import React from 'react';

export const FiltroPlantilla = ({filtro, filtroCampo, setFiltroCampo, originales}) => {
	return (
		<div className='input-group'>
		  <span className='input-group-text'><b>{filtro.nombre}</b></span>
		  <input type={filtro.tipo} className='form-control'
			  onChange={(e) => setFiltroCampo({ ...filtroCampo, [filtro.nombre]: e.target.value })}
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

export const AplicarFiltros = (state, listaFiltros, originales, setState) => {
	let temporales = [...originales];
  listaFiltros.forEach(filtro => {
  	if(temporales !== undefined){
	    temporales = temporales.filter(dato =>
	      filtro.funcion(dato[filtro.columna], filtro.campo)
	    );
	  }
  });
  setState({...state, datos:temporales});
};
