import axios from 'axios';
import { URLApi } from '../Compartido/Constantes';
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAutent } from "../../contexto/ContextoAutenticacion";
import { ToastContainer, toast } from 'react-toastify';

export const BorrarEmpleado = ({ empleado, botonRef, setEmpleadoValores }) => {
  const {
    nombre,
    primer_apellido,
    segundo_apellido,
    cedula,
    correo1,
    correo2,
    telefono1,
    telefono2,
    fecha_contratacion,
    jornadaLaboral,
    rol
  } = empleado;

  const {usuarioAutenticado} = useAutent();
  const cedula_empresa = usuarioAutenticado.cedula_empresa;

  //Funcion que realiza la solicitup HTTP para eliminar la política
  const BorrarEmpleadoAPI = async () => {
    try {
        const cedula=empleado.cedula;
        const respuesta = await axios.post(`${URLApi}empleados/borrar`,{
            cedula
          });
        console.log("respuesta: "+respuesta);
        if (respuesta){
            toast.success('Empleado eliminado con éxito', {
                position: toast.POSITION.TOP_RIGHT
                });
            botonRef.current.click();
            setTimeout(() => {
                window.location.reload();
              }, 2250);
        }else{
            toast.error('Hubo un error inesperado al eliminar el empleado, inténtelo de nuevo', {
                position: toast.POSITION.TOP_CENTER
              });  
        }
      } catch (error) {
          toast.error('Hubo un error inesperado al eliminar el empleado, inténtelo de nuevo', {
            position: toast.POSITION.TOP_CENTER
          });  
          console.error("Error en la solicitud al servidor:", error);
      }
  };

  const AbrirAdver = () => {
    setEmpleadoValores({
      titulo: <strong>PELIGRO: Borrando Empleado</strong>,
      componente: <div>¿Está seguro de que desea borrar al empleado "<strong>{empleado.cedula}</strong>"?</div>,
      modalID:"modalPol",
      tituloEstilos: "titulo-ventana-rojo",
      boton:"Borrar",
      funcion: BorrarEmpleadoAPI
    });
    botonRef.current.click();
  };

  const borrar = () => {
    AbrirAdver();
  };

  return (
    <>
     <ToastContainer autoClose={2500}/>
     <FontAwesomeIcon className="btn-danger" onClick={()=> borrar(empleado)} icon={faTrash} />
    </>
  );
};