import React, { useState, useEffect } from "react";
import { filtrarSolicitud } from "./buscarSolicitud";

function FiltrarSolicitudes(props) {
    const {
        cambiarPagina,
        solicitudes,
        filtrarSolicitudes,
        busqueda,
        filtro,
        solicitudesGlob,
        filtroEstado,
        setFiltroEstado
    } = props;

    const manejarFiltroEstado = (nuevoEstado) => {
        setFiltroEstado(nuevoEstado);
        cambiarPagina(1);
        filtrarSolicitud({
            solicitud: solicitudesGlob,
            filtrarsolicitudes: filtrarSolicitudes,
            busqueda: busqueda,
            filtro: filtro
        });
    };

    useEffect(() => {
        const solicitudesFiltradas = solicitudes.filter(solicitud => {
            if (filtroEstado === 'Todos') {
                return true;
            } else {
                return solicitud.estado === filtroEstado;
            }
        });
        filtrarSolicitudes(solicitudesFiltradas);
    }, [filtroEstado]);

    return (
        <select className="col-2 mt-3 continuar"
            value={filtroEstado}
            onChange={(e) => manejarFiltroEstado(e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="Pendiente">Pendientes</option>
            <option value="Aprobada">Aprobadas</option>
            <option value="Rechazada">Rechazadas</option>
            <option value="Cancelada">Cancelada</option>
        </select>
    )
}

export default FiltrarSolicitudes;
