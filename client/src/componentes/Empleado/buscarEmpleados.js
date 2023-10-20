import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function BuscarEmpleados({empleados, filtrarEmpleados}){
    const [busqueda, buscar] = useState('');
    const [filtro, filtrarPor] = useState('nombre_completo');

    return (
        <div className="busqueda">
            <button type="submit" className='btn btn-primary icono'
             onClick={() => 
                filtrarEmpleado({empleados, filtrarEmpleados, busqueda, filtro})}>
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
                value={filtro}
                onChange={(e) => filtrarPor(e.target.value)}
            >
                <option value="nombre_completo">Por Nombre</option>
                <option value="correo">Por Correo</option>
                <option value="cedula">Por Cedula</option>
                <option value="rol">Por Rol</option>
            </select>
        </div>
    );
}

function filtrarEmpleado({empleados, filtrarEmpleados, busqueda, filtro}){
    busqueda = busqueda.trim();
    if (empleados && Array.isArray(empleados)) {
        const empleadosFiltrados = empleados.filter((empleado) => {
          if (filtro === 'nombre_completo') {
            return empleado.nombre_completo.includes(busqueda);
          } else if (filtro === 'correo') {
            return empleado.correo.includes(busqueda);
          } else if (filtro === 'cedula') {
            return empleado.cedula.includes(busqueda);
          } else if (filtro === 'rol') {
            return empleado.rol.includes(busqueda);
          }
          return true; // Si el filtro no coincide con ninguno, no aplicar ningún filtro
        });
        filtrarEmpleados(empleadosFiltrados);
    } else {
        console.error ('Hubo un error al buscar empleados: empleados');
    }
}

export default BuscarEmpleados;