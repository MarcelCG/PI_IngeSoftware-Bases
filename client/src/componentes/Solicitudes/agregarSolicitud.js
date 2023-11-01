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
const agregarSolicitud = URLApi + 'solicitudes/';

function AgregarSolicitud() {
  const {usuarioAutenticado} = useAutent(); 
  const cedula = usuarioAutenticado.cedula;
  const empresa = usuarioAutenticado.cedula_empresa;

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

  const navegar = useNavigate();

  const {register, handleSubmit, 
    formState: {errors},
    reset,
    clearErrors
	} = useForm()

  const onSubmit = handleSubmit(async (data) => {
    const datosConFormato = formatoDatos(data);
    console.log(datosConFormato);
    axios.post(agregarSolicitud, datosConFormato).then((respuesta) => {
        console.log('Solicitud POST exitosa:', respuesta.data);
        toast.success('Solicitud agregada con éxito');
        reset();
      }).catch((error) => {
        console.error('Error en la solicitud POST:', error);
        toast.error('Hubo un error inesperado al agregar la solicitud, trate de nuevo');
      });
  });

  const formatoDatos = (data) => {
    let horaInicio = "";
    let horasSolicitadas = "";
    if (data.ajustarHoras) {
      horaInicio = data.hora_inicio;
      horasSolicitadas = data.horas_solicitadas;
    } else {
      horaInicio = null;
      horasSolicitadas = null;
    }
    let comentariosJS = ""
    if (data.comentarios === "") {
      comentariosJS = null;
    } else {
      comentariosJS = data.comentarios;
    }

    return {
      cedula_empleado: cedula,
      titulo: data.politica,
      cedula_empresa: empresa,
      inicio_fechas_solicitadas: data.fecha_inicio,
      dias_solicitados: data.dias_solicitados,
      hora_inicio: horaInicio,
      horas_solicitadas: horasSolicitadas,
      comentarios: comentariosJS
    };
  };

  // Función para cancelar el formulario
  const handleCancel = () => {
    console.log("Formulario cancelado");
    navegar('/app/solicitudes');
  };
  
  let props = {
		libresPorPolitica,
		handleCancel,
		register,
		handleSubmit,
		errors,
		clearErrors,
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
