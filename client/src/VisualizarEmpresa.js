import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

function VisualizarEmpresa() {
  const { empresa } = useParams();
  // Se definen los valores iniciales para los atributos de la empresa
  const [datosEmpresa, setDatosDeEmpresa] = useState({
    nombre: "",
    cedula_juridica: "",
    telefono: "",
    correo: "",
  });

  useEffect(() => {
  async function cargarDatosEmpresa() {
      try {
        const response = await axios.get(`http://localhost:5000/api/empresa/getEmpresaInfo/${empresa}`);
        
        if (response.status === 200) {

          const data = response.data.data;
          console.log(data);
          // Actualiza el estado con los datos específicos del JSON de respuesta
          setDatosDeEmpresa({
            nombre: data.nombre,
            cedula_juridica: data.cedula_juridica,
            telefono: data.telefono[1]?.telefono || '',
            correo: data.correo[1]?.correo || '',
          });
        } else if (response.status === 404) {
          throw new Error('Empresa no encontrada');
        } else {
          throw new Error('Error en el servidor');
        }
    } catch (error) {
      // Maneja errores y actualiza el estado de acuerdo a la respuesta
      if (error.message === 'Empresa no encontrada') {
        setDatosDeEmpresa({ error: 'Empresa no encontrada' });
      } else {
        setDatosDeEmpresa({ error: 'Error en el servidor' });
      }
      console.error('Error al cargar datos de la empresa:', error);
    }
  }

  cargarDatosEmpresa(); // Llama a la función aquí dentro del efecto
}, [empresa]);

  

  // Llama a la función para cargar los datos del empleado cuando se carga el componente (Base de datos)
  
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-header" style={{ backgroundColor: '#4f709c', color: '#ffffff' }}>
              <h5 className="text-center mb-0">Información de la empresa</h5>
            </div>
            <div className="card-body">
              <p><strong>Nombre:</strong> {datosEmpresa.nombre}</p>
              <p><strong>Cédula Juridica:</strong> {datosEmpresa.cedula_juridica}</p>
              <p><strong>Telefono:</strong> {datosEmpresa.telefono}</p>
              <p><strong>Correo Informativo:</strong> {datosEmpresa.correo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisualizarEmpresa;
