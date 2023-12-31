import React, { useState, useEffect, useRef} from 'react';
import { useAutent } from '../../contexto/ContextoAutenticacion';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { URLApi } from '../Compartido/Constantes';
import { Modal } from '../Utiles/Modal';
import {ModalEditarPerfil} from '../Perfil/editarPerfil'

function VisualizarEmpleado() {
  const {usuarioAutenticado} = useAutent();
  const cedulaEmpleado = usuarioAutenticado.cedula;
  const cedulaEmpresa = usuarioAutenticado.cedula_empresa;
  const [datosEmpleado, setDatosDelEmpleado] = useState({
    nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    cedula: "",
    correo1: "",
    correo2: "",
    telefono1: "",
    telefono2: "",
    fecha_contratacion: "",
    jornadaLaboral: "",
    rol: ""
  });
  const botonRef = useRef(null);
  const [modal, setModal] = useState({modalID:"modalEditarPerfil"});

  const [PerfilValores, setPerfilValores] = useState({
    titulo: "",
    componente: "",
    modalID:"modalEditarPerfil"
  });

  // Función para cargar los datos del empleado
  const cargarDatosDelEmpleado = async () => {
  try {
    // Realiza una solicitud al servidor para obtener los datos del empleado
    const response = await axios.get(`${URLApi}empleados/buscarEmpleado/${cedulaEmpleado}/${cedulaEmpresa}`); // Ajusta la ruta según tu configuración
    
    if (response.status === 200) {
      const datosEmpleado = response.data;
      console.log(response.data);
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

  let props = {
    ...PerfilValores,
    botonRef,
    setPerfilValores
  };

  return (
    <div className="container mt-2 card-body p-2">
      <Modal{...props}/>
      <div ref={botonRef} data-bs-toggle="modal" data-bs-target={`#${props.modalID}`}/>
      <div className="mb-3">
        <p><strong>Nombre: </strong>{datosEmpleado.nombre}</p>
        <p><strong>Primer Apellido: </strong>{datosEmpleado.primer_apellido}</p>
        <p><strong>Segundo Apellido: </strong>{datosEmpleado.segundo_apellido}</p>
        <p><strong>Cédula:</strong> {datosEmpleado.cedula}</p>
        <p><strong>Correos:</strong> {datosEmpleado.correo1} &nbsp;
          {datosEmpleado.correo2 ? datosEmpleado.correo2 : ''}
        </p>
        <p><strong>Teléfonos: </strong>{datosEmpleado.telefono1} &nbsp;
          {datosEmpleado.telefono2 ? datosEmpleado.telefono2 : ''}
        </p>
        <p><strong>Fecha de Contratación:</strong> {datosEmpleado.fecha_contratacion}</p>
        <p><strong>Rol:</strong> {datosEmpleado.rol}</p>
        <div className="text-center">
          <ModalEditarPerfil botonRef={botonRef} setModalValores={setPerfilValores} />
        </div>
      </div>
    </div>
  );
}

export default VisualizarEmpleado;
