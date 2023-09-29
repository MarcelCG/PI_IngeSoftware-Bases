import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

// El componente VisualizarEmpleado acepta un prop llamado "empleado"
function VisualizarEmpleado({ empleado }) {
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
              <p><strong>Nombre:</strong> {empleado.nombreCompleto}</p>
              <p><strong>Cédula:</strong> {empleado.cedula}</p>
              <p><strong>Correo:</strong> {empleado.correo}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-header" style={{ backgroundColor: '#4f709c', color: '#ffffff' }}>
              <h5 className="mb-0">Detalles de Empleo</h5>
            </div>
            <div className="card-body">
              <p><strong>Teléfono:</strong> {empleado.telefono}</p>
              <p><strong>Fecha de Contratación:</strong> {empleado.fechaContratacion}</p>
              <p><strong>Jornada Laboral:</strong> {empleado.jornadaLaboral}</p>
              <p><strong>Rol:</strong> {empleado.rol}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisualizarEmpleado;

