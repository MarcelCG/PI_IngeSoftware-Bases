import React, { useState, useEffect } from 'react';
import { useAutent } from '../../contexto/ContextoAutenticacion';
import 'bootstrap/dist/css/bootstrap.css';
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
    cedula: "",
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
    <div className="container">
      <h2 className="text-center mb-4">Información del Empleador</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Datos Personales</h5>
            </div>
            <div className="card-body">
              <p><strong>Nombre: </strong>{datosEmpleador.nombre}</p>
              <p><strong>Primer Apellido: </strong>{datosEmpleador.primer_apellido}</p>
              <p><strong>Segundo Apellido: </strong>{datosEmpleador.segundo_apellido}</p>
              <p><strong>Correo: </strong>{datosEmpleador.correo1}</p>
              <p><strong>Cédula: </strong> {datosEmpleador.cedula}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Datos de la Empresa</h5>
            </div>
            <div className="card-body">
              <p><strong>Nombre de la Empresa: </strong>{datosEmpleador.nombre_empresa}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisualizarEmpleadorPorCedula;
