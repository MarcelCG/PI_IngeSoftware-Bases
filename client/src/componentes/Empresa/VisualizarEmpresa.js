import {EditarEmpresa} from './EditarEmpresa'
import {Modal} from '../Utiles/Modal'
import React, { useState, useEffect, useRef } from 'react';
import { useAutent } from '../../contexto/ContextoAutenticacion';
import 'bootstrap/dist/css/bootstrap.css';
import {URLApi} from '../Compartido/Constantes';
import axios from 'axios';

function VisualizarEmpresa() {
  const {usuarioAutenticado} = useAutent();
  const empresa = usuarioAutenticado.cedula_empresa;
  const [datosEmpresa, setDatosDeEmpresa] = useState({
    nombre: "",
    cedula_juridica: "",
    telefono1: "",
    telefono2: "",
    correo1: "",
    correo2: "",
  });

  const [modalValores, setModalValores] = useState({modalID:"modalEmpresa"})
  const botonRef = useRef(null);
  const [cargando, setCargando] = useState(false);
  useEffect(() => {
  async function cargarDatosEmpresa() {
      try {
        const response = await axios.get(`${URLApi}empresa/getEmpresaInfo/${empresa}`);
        
        if (response.status === 200) {

          const data = response.data.data;
          // Actualiza el estado con los datos específicos del JSON de respuesta
          setDatosDeEmpresa({
            nombre: data.nombre,
            cedula_juridica: data.cedula_juridica,
            telefono1: data.telefono1,
            telefono2: data.telefono2,
            correo1: data.correo1,
            correo2: data.correo2
          });
          setCargando(true);
        } else if (response.status === 404) {
          throw new Error('Empresa no encontrada');
        } else {
          throw new Error('Error en el servidor');
        }
      setCargando(true);
    } catch (error) {
      setCargando(true);
      if (error.message === 'Empresa no encontrada') {
        setDatosDeEmpresa({ error: 'Empresa no encontrada' });
      } else {
        setDatosDeEmpresa({ error: 'Error en el servidor' });
      }
    }
  }
  cargarDatosEmpresa(); 
}, [empresa]);

  const props = {setDatosDeEmpresa, datosEmpresa, botonRef, setModalValores, ...modalValores};
  return (
    <div className="container mt-2">
      {cargando && (
        <>
          <Modal {...props} />
          <div ref={botonRef} data-bs-toggle="modal" data-bs-target={`#${modalValores.modalID}`} />
        </>
      )}
      <div className="row justify-content-center">
        <div className="mb-3">
          <div className="card-body p-0">
            <p><strong>Nombre:</strong> {datosEmpresa.nombre}</p>
            <p><strong>Cédula Jurídica:</strong> {datosEmpresa.cedula_juridica}</p>
            <p><strong>Teléfono:</strong> {datosEmpresa.telefono1}</p>
            <p><strong>Teléfono adicional:</strong> {datosEmpresa.telefono2||" - "}</p>
            <p><strong>Correo Informativo:</strong> {datosEmpresa.correo1}</p>
            <p><strong>Correo Informativo adicional:</strong> {datosEmpresa.correo2||" - "}</p>
          </div>
        </div>
      </div>
      {cargando ? (
        <div className="d-grid justify-content-md-end disabled">
          <EditarEmpresa {...props} />
        </div>
      ) : (
        <div className="d-grid justify-content-md-end">
          <button className="btn btn-primary me-2" disabled>
            Editar Empresa
          </button>
        </div>
      )}
    </div>
  );
}

export default VisualizarEmpresa;
