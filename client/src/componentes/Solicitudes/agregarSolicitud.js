import {FormularioSolicitud} from "./FormularioSolicitud";
import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useAutent } from "../../contexto/ContextoAutenticacion";
import { URLApi } from '../Compartido/Constantes';
import 'react-toastify/dist/ReactToastify.css';

const obtenerLibres = URLApi + 'solicitudes/libresPorPolitica/';

function AgregarSolicitud() {
  const {usuarioAutenticado} = useAutent(); 
  const cedula = usuarioAutenticado.cedula;

  useEffect(() => {
    let obtenerLibresURI = obtenerLibres + cedula;
    const obtenerLibresPorPolitica = async () => {
      try {
        const respuesta = await axios.get(obtenerLibresURI);
        setLibresPorPolitica(respuesta.data);
      }
      catch(error) {
        console.error("Error al obtener los libres por politica:", error);
      }
    };
    obtenerLibresPorPolitica();
  }, []);
  const [libresPorPolitica, setLibresPorPolitica] = useState([]);

  const {register, handleSubmit, 
    formState: {errors},
    watch,
    reset,
    clearErrors
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  };

  let props = {
    libresPorPolitica,
    errors,
    register,
    clearErrors,
    handleSubmit,
    onSubmit
  }


  return (
    <div className="container col-6 position-static ventana" >
        <div className='card border-dark shadow m-3'>
          <div className='card-header titulo-ventana'>
            <h3 className="titulo-ventana">Crear Solicitud</h3>
          </div>
          <FormularioSolicitud {...props}/>

          <ToastContainer />
        </div>
    </div>
  );
}

export default AgregarSolicitud;
