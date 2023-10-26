import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function BuscarPoliticas({ politicas, filtrarPoliticas }) {
    const [busqueda, buscar] = useState('');
    const [filtro, filtrarPor] = useState('titulo');

    return (
        <div className="busqueda">
            <button type="submit" name='Buscar' className='btn btn-primary icono'
                onClick={() =>
                    filtrarPolitica({ politicas, filtrarPoliticas, busqueda, filtro })}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
            <input
                className="col-8 campo"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => buscar(e.target.value)}
            />
            <select
                className="col-3 opciones"
                name="filtro"
                value={filtro}
                onChange={(e) => filtrarPor(e.target.value)}
            >
                <option value="titulo" name="Por Titulo">Por Titulo</option>
                <option value="fecha_inicio">Por Fecha de Inicio</option>
                <option value="dias_a_dar">Por Dias a Dar</option>
            </select>
        </div>
    );
}

function filtrarPolitica({ politicas, filtrarPoliticas, busqueda, filtro }) {
    busqueda = busqueda.trim();
    if (politicas && Array.isArray(politicas)) {
        const politicasFiltradas = politicas.filter((politica) => {
            if (filtro === 'titulo') {
                return politica.titulo.includes(busqueda);
            } else if (filtro === 'fecha_inicio') {
                return politica.fecha_inicio.includes(busqueda);
            } else if (filtro === 'dias_a_dar') {
                return politica.dias_a_dar.includes(busqueda);
            }
            return true; // Si el filtro no coincide con ninguno, no aplicar ningún filtro
        });
        filtrarPoliticas(politicasFiltradas);
    } else {
        console.error('Hubo un error al buscar politicas: politicas');
    }
}

export default BuscarPoliticas;