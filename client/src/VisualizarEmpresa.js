import React, { useState, useEffect } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

function VisualizarEmpresa({ cedulaEmpresa }) {
  // Se definen los valores iniciales para los atributos de la empresa
  const [datosEmpresa, setDatosDeEmpresa] = useState({
    nombre: "",
    cedula_juridica: "",
    telefono: "",
    correoInformativo: "",
  });
  useEffect(() => {
    const cargarDatosEmpresa = async () => {
        fetch(`http://localhost:4223/api/empresa/byCedula/${cedulaEmpresa}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else if (response.status === 404) {
              throw new Error('Empresa no encontrada');
            } else {
              throw new Error('Error en el servidor');
            }
          })
          .then((data) => {
            // Actualiza el estado con los datos específicos del JSON de respuesta
            setDatosDeEmpresa({
              nombre: data.nombre_empresa,
              cedula_juridica: data.cedula_juridica,
              telefono: data.telefono,
              correoInformativo: data.correo
            });
          })
          .catch((error) => {
            // Maneja errores y actualiza el estado de acuerdo a la respuesta
            if (error.message === 'Empresa no encontrada') {
              setDatosDeEmpresa({ error: 'Empresa no encontrada' });
            } else {
              setDatosDeEmpresa({ error: 'Error en el servidor' });
            }
            console.error('Error al cargar datos de la empresa:', error);
          });
      };
  
    cargarDatosEmpresa(); // Llama a la función aquí dentro del efecto
  
  }, [cedulaEmpresa]);

  

  // Llama a la función para cargar los datos del empleado cuando se carga el componente (Base de datos)
  
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Información de la Empresa</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-header" style={{ backgroundColor: '#4f709c', color: '#ffffff' }}>
              <h5 className="mb-0">Datos Personales</h5>
            </div>
            <div className="card-body">
              <p><strong>Nombre:</strong> {datosEmpresa.nombre}</p>
              <p><strong>Cédula Juridica:</strong> {datosEmpresa.cedula_juridica}</p>
              <p><strong>Telefono:</strong> {datosEmpresa.telefono}</p>
              <p><strong>Correo Informativo:</strong> {datosEmpresa.correoInformativo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisualizarEmpresa;
