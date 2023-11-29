import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function BuscarSolicitud(props) {
    const {
        solicitud,
        filtrarsolicitudes,
        esEmpleador,
        busqueda,
        buscar,
        filtro,
        filtrarPor,
        estado,
        solicitudesFiltradas
    } = props;

    return (
        <div className="busqueda">
            <button type="submit" name='Buscar' className='btn btn-primary icono'
                onClick={() => filtrarConEstado({
                    solicitud,
                    filtrarsolicitudes,
                    busqueda,
                    filtro,
                    estado,
                    solicitudesFiltradas
                })}
            >
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
                {esEmpleador === true ? (
                    <>
                        <option value="nombre_completo" name="Por Nombre">Por Nombre</option>
                        <option value="politica">Por Politica</option>
                        <option value="fecha">Por Fecha</option>
                    </>
                ) : (
                    <>
                        <option value="politica">Por Politica</option>
                        <option value="fecha">Por Fecha</option>
                    </>
                )}
            </select>
        </div>
    );
}

function filtrarConEstado({ solicitud, filtrarsolicitudes, busqueda, filtro, estado, solicitudesFiltradas }) {
    if (estado === 'Todos') {
        filtrarSolicitud({ solicitud, filtrarsolicitudes, busqueda, filtro });
    } else {
        filtrarSolicitud({ solicitud: solicitudesFiltradas, filtrarsolicitudes, busqueda, filtro });
    }
}

function filtrarSolicitud({ solicitud, filtrarsolicitudes, busqueda, filtro }) {
    busqueda = busqueda ? busqueda.trim() : '';

    if (!busqueda) {
        filtrarsolicitudes(solicitud);
        return;
    }

    if (solicitud && Array.isArray(solicitud)) {
        const solicitudesFiltrados = solicitud.filter((solicitud) => {
            if (filtro === 'nombre_completo') {
                return solicitud.nombre_completo.toLowerCase().includes(busqueda.toLowerCase());
            } else if (filtro === 'politica') {
                return solicitud.politica.toLowerCase().includes(busqueda.toLowerCase());
            } else if (filtro === 'fecha') {
                let fecha = solicitud.fecha_inicio + "-" + solicitud.fecha_final;
                fecha = fecha.replace(/\s/g, "");
                return fecha.toLowerCase().includes(busqueda.replace(/\s/g, "").toLowerCase());
            }
            return true;
        });
        filtrarsolicitudes(solicitudesFiltrados);
    } else {
        console.error('Hubo un error al buscar solicitudes: solicitudes');
    }
}

export { filtrarSolicitud };
export default BuscarSolicitud;
