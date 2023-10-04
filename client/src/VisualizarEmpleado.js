import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function VisualizarEmpleado({ cedulaEmpleado, cedulaEmpresa }) {
  const [datosEmpleado, setDatosDelEmpleado] = useState({
    nombreCompleto: "",
    cedula: "",
    correo: "",
    telefono: "",
    fechaContratacion: "",
    jornadaLaboral: "",
    rol: ""
  });

  // Función para cargar los datos del empleado
  const cargarDatosDelEmpleado = async () => {
  try {
    // Realiza una solicitud al servidor para obtener los datos del empleado
    const response = await axios.get(`/api/empleado/${cedulaEmpleado}/${cedulaEmpresa}`); // Ajusta la ruta según tu configuración
    
    if (response.status === 200) {
      const datosEmpleado = response.data;
      setDatosDelEmpleado(datosEmpleado);
    } else {
      // Maneja el caso en que no se encuentre el empleado
      console.error('Empleado no encontrado');
    }
  } catch (error) {
    // Maneja errores de la solicitud
    console.error('Error al cargar datos del empleado', error);
  }
};


  // Carga los datos del empleado cuando el componente se monta
  useEffect(() => {
    cargarDatosDelEmpleado();
  }, [cedulaEmpleado, cedulaEmpresa]);

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
              <h5 className="mb-0">Detalles Laborales</h5>
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
    </div>
  );
}

export default VisualizarEmpleado;
