import React, { useState, useEffect } from 'react';
import {NombreEscogido, FechaEscogida} from './Filtro'
// lista de filtos con las funciones
export const listaFiltros = [
	{
		nombre:'numero',
		tipo:'text',
		funcion:NombreEscogido,
		campo:'',
		columna:'cuerpo'
	},
	{
		nombre:'fecha',
		tipo:'date',
		funcion:FechaEscogida,
		campo:'',
		columna:'cuerpo'
	},
	{
		nombre:'texto3',
		tipo:'text',
		funcion:NombreEscogido,
		campo:'',
		columna:'id'
	}
];

export const MyData = () => {
  const [datos, setDatos] = useState([
    {
      id: 'hola',
      cuerpo: 'mundo'
    },
    {
      id: 'hola',
      cuerpo: 'costa rica'
    },
    {
      id: 'hola',
      cuerpo: 'comadreja'
    }
  ]);

  return { datos, setDatos };
};
// 3 cosas
// datos, columnas y filtros