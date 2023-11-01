import axios from 'axios';
import { URLApi } from '../Compartido/Constantes';
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAutent } from "../../contexto/ContextoAutenticacion";
import { toast } from 'react-toastify';

export const BorrarPolitica = ({ politica, botonRef, setPolValores }) => {
  const {
    activo,
    acumulativo,
    descripcion,
    dias_a_dar,
    dias_a_incrementar,
    fecha_final,
    fecha_inicio,
    incrementativo,
    inicia_desde_contrato,
    periodo,
    titulo
  } = politica;

  const {usuarioAutenticado} = useAutent();
  const cedula_empresa = usuarioAutenticado.cedula_empresa;

  //Funcion que realiza la solicitup HTTP para eliminar la política
  const BorrarPoliticaAPI = async () => {
    try {
        const titulo=politica.titulo;
        const respuesta = await axios.post(`${URLApi}politicas/borrar`,{
            cedula_empresa,
            titulo
          });
          toast.success('Politica eliminada con éxito', {
            position: toast.POSITION.TOP_RIGHT
          });
          botonRef.current.click();
          setTimeout(() => {
            window.location.reload();
          }, 2250);
          
      } catch (error) {
          toast.error('Hubo un error inesperado al eliminar la política, inténtelo de nuevo', {
            position: toast.POSITION.TOP_CENTER
          });  
          console.error("Error en la solicitud al servidor:", error);
      }
  };

  const AbrirAdver = () => {
    setPolValores({
      titulo: <strong>PELIGRO: Borrando Politica</strong>,
      componente: <div>¿Está seguro de que desea borrar la politica "<strong>{politica.titulo}</strong>"?</div>,
      modalID:"modalPol",
      tituloEstilos: "titulo-ventana-rojo",
      boton:"Borrar",
      funcion: BorrarPoliticaAPI
    });
    botonRef.current.click();
  };

  const borrar = () => {
    AbrirAdver();
  };

  return (
    <>
     <FontAwesomeIcon className="btn-danger" onClick={()=> borrar(politica)} icon={faTrash} />
    </>
  );
};