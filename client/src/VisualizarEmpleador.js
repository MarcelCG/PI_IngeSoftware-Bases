import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function VisualizarEmpleador() {
  const [datosEmpleador, setdatosEmpleador] = useState({
    nombre: "",
    apellidos: "",
    cedula: "",
    correo: "",
    nombreEmpresa: ""
  });

  const cargarDatosDelEmpleador = () => {
    // Simulación de carga de datos del empleador
    const datosEmpleador = {
      nombre: "Nombre del Empleador",
      apellidos: "Apellido1 Apellido2",
      cedula: "1-10930219",
      correo: "empleador@empresa.com",
      nombreEmpresa: "Oraculo"
    };

    setdatosEmpleador(datosEmpleador);
  };

  // Llama a la función para cargar los datos del empleador cuando se carga el componente
  useEffect(() => {
    cargarDatosDelEmpleador();
  }, []);

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
              <p><strong>Nombre:</strong> {datosEmpleador.nombre}</p>
              <p><strong>Apellidos:</strong> {datosEmpleador.apellidos}</p>
              <p><strong>Cédula:</strong> {datosEmpleador.cedula}</p>
              <p><strong>Correo:</strong> {datosEmpleador.correo}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Datos de la Empresa</h5>
            </div>
            <div className="card-body">
              <p><strong>Nombre de la Empresa:</strong> {datosEmpleador.nombreEmpresa}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisualizarEmpleador;
