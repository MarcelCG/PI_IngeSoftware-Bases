import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function FiltrarSolicitudesEmpleador({solicitudes, filtrarSolicitudes}) {
    const [filtroEstado, setFiltroEstado] = useState('Todos');
    
    const handleFiltroEstado = (nuevoEstado) => {
        setFiltroEstado(nuevoEstado);
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
            onChange={(e) => handleFiltroEstado(e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="Pendiente">Pendientes</option>
            <option value="Aprobada">Aprobadas</option>
            <option value="Rechazada">Rechazadas</option>
        </select>
    )
}

export default FiltrarSolicitudesEmpleador