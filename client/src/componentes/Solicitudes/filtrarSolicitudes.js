import React, {useState, useEffect} from "react";

function FiltrarSolicitudes({cambiarPagina, solicitudes, filtrarSolicitudes}) {
    const [filtroEstado, setFiltroEstado] = useState('Todos');
    
    const manejarFiltroEstado = (nuevoEstado) => {
        setFiltroEstado(nuevoEstado);
        cambiarPagina(1)
    };
    
    useEffect(() => {
        // Filtrar las solicitudes según el estado seleccionado
        const solicitudesFiltradas = solicitudes.filter(solicitud => {
            if (filtroEstado === 'Todos') {
                return true;
            } else {
                return solicitud.estado === filtroEstado;
            }
        });
        filtrarSolicitudes(solicitudesFiltradas);
    }, [filtroEstado, solicitudes]);

    return (
        <select className="col-2 mt-3 continuar"
            value={filtroEstado}
            onChange={(e) => manejarFiltroEstado(e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="Pendiente">Pendientes</option>
            <option value="Aprobada">Aprobadas</option>
            <option value="Rechazada">Rechazadas</option>
        </select>
    )
}

export default FiltrarSolicitudes