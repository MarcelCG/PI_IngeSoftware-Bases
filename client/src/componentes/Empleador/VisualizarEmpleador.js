import React, { useState, useEffect } from 'react';
import { useAutent } from '../../contexto/ContextoAutenticacion';
import { URLApi } from '../Compartido/Constantes';
import axios from 'axios';



function VisualizarEmpleadorPorCedula() {
  const {usuarioAutenticado} = useAutent();
  const cedulaEmpleador = usuarioAutenticado.cedula;

  const [datosEmpleador, setDatosEmpleador] = useState({
    nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    correo1: "",
    correo2: "",
    cedula: "",
    telefono1: "",
    telefono2: "",
    nombre_empresa: ""
  });

  const cargarDatosDelEmpleador = async () => {
    try {
      console.log(cedulaEmpleador);
      // Realizar una solicitud al backend para obtener los datos del empleador por su cédula
      const response = await axios.get(`${URLApi}empleador/byCedula/${cedulaEmpleador}`);
      
      if (response.status === 200) {
        const data = response.data;
        setDatosEmpleador(data);
      } else {
        console.error("Error al obtener los datos del empleador");
      }
    } catch (error) {
        console.error("Error en la solicitud al servidor:", error);
    }
  };

  // Llama a la función para cargar los datos del empleador cuando se carga el componente
  useEffect(() => {
    cargarDatosDelEmpleador();
  }, [cedulaEmpleador]);

  return (
    <div>
      <div className="card-body">
        <p><strong>Nombre: </strong>{datosEmpleador.nombre}</p>
        <p><strong>Primer Apellido: </strong>{datosEmpleador.primer_apellido}</p>
        <p><strong>Segundo Apellido: </strong>{datosEmpleador.segundo_apellido}</p>
        <p><strong>Cédula: </strong> {datosEmpleador.cedula}</p>
        <p><strong>Correos: </strong>{datosEmpleador.correo1} &nbsp;
          {datosEmpleador.correo2 ? datosEmpleador.correo2 : ''}
        </p>
        <p><strong>Teléfonos: </strong>{datosEmpleador.telefono1} &nbsp;
          {datosEmpleador.telefono2 ? datosEmpleador.telefono2 : ''}
        </p>
      </div>
    </div>
          
  );
}

export default VisualizarEmpleadorPorCedula;
