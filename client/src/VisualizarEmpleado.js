import React, { useState, useEffect } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

function VisualizarEmpleado() {
  const [datosEmpleado, setDatosDelEmpleado] = useState( {
    nombreCompleto: "",
    cedula: "",
    correo: "",
    telefono: "",
    fechaContratacion: "",
    jornadaLaboral: "",
    rol: ""
  });

  // Función para cargar los datos del empleado (se debe obtener estos datos de la BD)
  const cargarDatosDelEmpleado = () => {
    // Simulación de carga de datos del empleado
    const datosEmpleado = {
      nombreCompleto: "Nombre del Empleado Apellido1 Apellido2",
      cedula: "1-04790-1672",
      correo: "empleado@ejemplo.com",
      telefono: "82726383",
      fechaContratacion: "20/09/2023",
      jornadaLaboral: "Tiempo completo",
      rol: "Analista"
    };

    setDatosDelEmpleado(datosEmpleado);
  };

  // Llama a la función para cargar los datos del empleado cuando se carga el componente (Base de datos)
  //useEffect(() => {
   // cargarDatosDelEmpleado();
  //}, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Información del Empleado</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-header" style={{ backgroundColor: '#4f709c', color: '#ffffff' }}>
              <h5 className="mb-0">Datos Personales</h5>
            </div>
            <div className="card-body">
              <p><strong>Nombre:</strong> {datosEmpleado.nombreCompleto}</p>
              <p><strong>Cédula:</strong> {datosEmpleado.cedula}</p>
              <p><strong>Correo:</strong> {datosEmpleado.correo}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-header" style={{ backgroundColor: '#4f709c', color: '#ffffff' }}>
              <h5 className="mb-0">Detalles de Empleo</h5>
            </div>
            <div className="card-body">
              <p><strong>Teléfono:</strong> {datosEmpleado.telefono}</p>
              <p><strong>Fecha de Contratación:</strong> {datosEmpleado.fechaContratacion}</p>
              <p><strong>Jornada Laboral:</strong> {datosEmpleado.jornadaLaboral}</p>
              <p><strong>Rol:</strong> {datosEmpleado.rol}</p>
            </div>
          </div>
        </div>
      </div>
      <button onClick={cargarDatosDelEmpleado} className="btn btn-primary mb-3">
      Cargar Datos del Empleado
      </button>
    </div>
  );
}

export default VisualizarEmpleado;
