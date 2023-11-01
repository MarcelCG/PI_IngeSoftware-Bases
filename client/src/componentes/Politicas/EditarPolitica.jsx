import React, { useState, useEffect } from "react";
import { useForm, setValue } from "react-hook-form";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useAutent } from "../../contexto/ContextoAutenticacion"; // Asumiendo que se llama useAutent
import EditarPoliticaFormulario from "./EditarPoliticaFormulario";
import { URLApi } from '../Compartido/Constantes';
import 'react-toastify/dist/ReactToastify.css';
// import "./AddPolicy.css"

// URL para el manejo de políticas
const politicas = URLApi + 'politicas';

function EditarPolitica(props) {

  // Cédula de la empresa que inició sesión
  const { usuarioAutenticado } = useAutent(); 
  const empresa = usuarioAutenticado.cedula_empresa;
  const { titulo } = props.match.params; // Obtenemos el título de la política desde las props
  // Configuración del formulario usando react-hook-form
  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm();

  // Estado del checkbox de "Rige a partir del contrato"
  const [desactivarFechaInicio, setDesactivarFechaInicio] = useState(false);

  // Estado del checkbox de "Incrementativo"
  const [desactivarIncremento, setDesactivarIncremento] = useState(false);

  // Mensajes de error estándar
  const mensajesError = {
    requerido: "Este campo es obligatorio",
  };

  // Patrones de validación específicos para cada campo
  const patronesValidacion = {
    periodo: {
      patrón: {
        valor: /^[1-9]\d*$/,
        mensaje: "Este campo debe ser mayor a 0"
      },
    },
    díasADar: {
      patrón: {
        valor: /^[1-9]\d*$/,
        mensaje: "Este campo debe ser mayor a 0"
      },
    },
    díasAIncrementar: {
      patrón: {
        valor: !desactivarIncremento ? /^[1-9]\d*$/ : '',
        mensaje: "Este campo debe ser mayor a 0"
      },
    },
  };

  useEffect(() => {
    // Realiza una solicitud para obtener los datos de la política que se va a editar
    axios.get(`${politicasURL}/${empresa}/${titulo}`)
      .then((response) => {
        const datosPolitica = response.datos;

        // Rellena el formulario con los datos de la política
        setValue("titulo", datosPolitica.titulo);
        setValue("periodo", datosPolitica.periodo);
        setValue("unidadPeriodo", "1/24");
        setValue("fecha_inicio", datosPolitica.inicia_desde_contrato ? "" : datosPolitica.fecha_inicio);
        setValue("fecha_final", datosPolitica.fecha_final);
        setValue("desdeContrato", datosPolitica.inicia_desde_contrato);
        setValue("díasADar", datosPolitica.dias_a_dar);
        setValue("unidadDíasADar", "1/24");
        setValue("incrementativo", !datosPolitica.incrementativo);
        setValue("díasAIncrementar", datosPolitica.dias_a_incrementar);
        setValue("unidadIncremento", "1/24");
        setValue("acumulativo", datosPolitica.acumulativo);
        setValue("descripcion", datosPolitica.descripcion);
      })
      .catch((error) => {
        console.error('Error al obtener los datos de la política', error);
        toast.error('Hubo un error al obtener los datos de la política');
      });
  }, [empresa, titulo, setValue]);

  const enviarFormulario = (datos) => {
    const datosFormulario = transformarDatosAntesDeEnviar(datos);

    // Realiza una solicitud para actualizar la política
    axios.put(`${politicasURL}/${empresa}/${titulo}`, datosFormulario)
      .then((response) => {
        console.log('Solicitud PUT exitosa:', response.datos);
        toast.success('Política actualizada con éxito');
      })
      .catch((error) => {
        console.error('Error en la solicitud PUT:', error);
        toast.error('Hubo un error inesperado al editar la política, inténtelo de nuevo');
      });
  };

  // Esta función prepara los datos antes de enviarlos
  const transformarDatosAntesDeEnviar = (datos) => {
    return {
      titulo: datos.titulo,
      cedula_empresa: empresa,
      periodo: datos.periodo * (datos.unidadPeriodo === "1/24" ? (1/24): datos.unidadPeriodo),
      fecha_inicio: datos.desdeContrato ? '2023-01-01': datos.fecha_inicio,
      fecha_final: datos.fecha_final,
      desde_contrato: datos.desdeContrato,
      días_a_dar: datos.díasADar * (datos.unidadDíasADar === "1/24" ? (1/24): datos.unidadDíasADar),
      incrementativo: !datos.incrementativo,
      días_a_incrementar: datos.incrementativo ? 0 : datos.díasAIncrementar * (datos.unidadIncremento === "1/24" ? (1/24): datos.unidadIncremento),
      acumulativo: datos.acumulativo,
      activo: true,
      descripcion: datos.descripcion,
    };
  };

  // Función para cancelar el formulario
  const cancelarFormulario = () => {
    console.log("Formulario cancelado");

    /* Aquí debería volver a la pantalla para visualizar políticas */
  };
  

  return (
    <div className="formulario bg-white">
      <h1 className="titulo">Editar Política</h1>

      <EditarPoliticaFormulario
        onSubmit={handleSubmit(enviarFormulario)}
        cancelarFormulario={cancelarFormulario}
        setDesactivarFechaInicio={setDesactivarFechaInicio}
        desactivarFechaInicio={desactivarFechaInicio}
        desactivarIncremento={desactivarIncremento}
        setDesactivarIncremento={setDesactivarIncremento}
        clearErrors={clearErrors}
        errors={errors}
        mensajesError={mensajesError}
        register={register}
        patronesValidacion={patronesValidacion}
      />

      <ToastContainer />
    </div>
  );
}

export default EditarPolitica;


