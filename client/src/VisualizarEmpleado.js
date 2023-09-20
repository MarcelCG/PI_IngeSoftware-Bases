import React, { useState, useEffect } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

function VisualizarEmpleado() {
  const [employeeData, setDatosDelEmpleado] = useState( {
    nombreCompleto: "",
    cedula: "",
    correo: "",
    telefono: "",
    fechaContratacion: "",
    jornadaLaboral: "",
    rol: ""
  });

  // Función para cargar los datos del empleado (debes obtener estos datos de alguna fuente)
  const cargarDatosDelEmpleado = () => {
    // Simulación de carga de datos del empleado
    const datosEmpleado = {
      nombreCompleto: "Nombre del Empleado Apellido1 Apellido2",
      cedula: "1234567890",
      correo: "empleado@ejemplo.com",
      telefono: "9876-5432",
      fechaContratacion: "20/09/2023",
      jornadaLaboral: "Tiempo completo",
      rol: "Analista"
    };

    setDatosDelEmpleado(datosEmpleado);
  };

  // Llama a la función para cargar los datos del empleado cuando se carga el componente (Base de datos)
  useEffect(() => {
    cargarDatosDelEmpleado();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Información del Empleado</h2>
      <div className="row">
        <div className="col-md-6">
          <p><strong>Nombre:</strong> {employeeData.nombreCompleto}</p>
          <p><strong>Cédula:</strong> {employeeData.cedula}</p>
          <p><strong>Correo:</strong> {employeeData.correo}</p>
        </div>
        <div className="col-md-6">
          <p><strong>Teléfono:</strong> {employeeData.telefono}</p>
          <p><strong>Fecha de Contratación:</strong> {employeeData.fechaContratacion}</p>
          <p><strong>Jornada Laboral:</strong> {employeeData.jornadaLaboral}</p>
          <p><strong>Rol:</strong> {employeeData.rol}</p>
        </div>
      </div>
    </div>
  );
}

export default VisualizarEmpleado;
