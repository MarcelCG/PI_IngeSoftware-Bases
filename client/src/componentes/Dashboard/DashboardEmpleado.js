import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAutent } from '../../contexto/ContextoAutenticacion';
import { DashboardEmpleadoHTML } from './DashboardEmpleadoHTML';
import { URLApi } from '../Compartido/Constantes';

const infoEmpleadoURI = URLApi + 'libres/obtenerInfoLibresPorPolitica/';

function DashboardEmpleado() {
  const {usuarioAutenticado} = useAutent();
  const cedulaEmpleado = usuarioAutenticado.cedula;
  
  useEffect(() => {
    const infoPoliticasEmpleado = infoEmpleadoURI + cedulaEmpleado;
    const obtenerInfoLibresPorPolitica = async () => {
        try {
            const respuesta = await axios.get(infoPoliticasEmpleado);
            setPoliticas(respuesta.data);
        } 
        catch (error) {
            console.error('Error al obtener las politicas:', error);
        }
    };
    obtenerInfoLibresPorPolitica();
  
  }, [cedulaEmpleado]);
  const [politicas, setPoliticas] = useState([]);
  console.log(politicas);

  let props = {politicas}

  return (
    <div className="container mt-2 card-body p-2">
      <DashboardEmpleadoHTML {...props}/>
    </div>
  );
}

export default DashboardEmpleado;