import React, { useState, useEffect } from "react";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useAutent } from "../../contexto/ContextoAutenticacion";
import EditarPoliticaFormulario from "./EditarPoliticaFormulario";
import { URLApi } from '../Compartido/Constantes';
import 'react-toastify/dist/ReactToastify.css';

const politicas = URLApi + 'politicas';

function EditarPolitica(props) {
  // Agrega un estado para los datos de la política
  const [datosPolitica, setDatosPolitica] = useState(null);
  const { usuarioAutenticado } = useAutent();
  const empresa = usuarioAutenticado.cedula_empresa;
  const { titulo } = props.match.params;

  const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm();

  const [desactivarFechaInicio, setDesactivarFechaInicio] = useState(false);
  const [desactivarIncremento, setDesactivarIncremento] = useState(false);

  const mensajesError = {
    requerido: "Este campo es obligatorio",
  };

  const patronesValidacion = {
    periodo: {
      valor: /^[1-9]\d*$/,
      mensaje: "Este campo debe ser mayor a 0",
    },
    díasADar: {
      valor: /^[1-9]\d*$/,
      mensaje: "Este campo debe ser mayor a 0",
    },
    díasAIncrementar: {
      valor: !desactivarIncremento ? /^[1-9]\d*$/ : '',
      mensaje: "Este campo debe ser mayor a 0",
    },
  };

  useEffect(() => {
    axios.get(`${politicas}/${empresa}/${titulo}`)
      .then((response) => {
          const datosPolitica = response.data;
          console.log("Datos de la política:", datosPolitica);
          // Establece los datos de la política cuando están disponibles
           setDatosPolitica(datosPolitica);
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

    axios.put(`${politicas}/${empresa}/${titulo}`, datosFormulario)
      .then((response) => {
        console.log('Solicitud PUT exitosa:', response.data);
        toast.success('Política actualizada con éxito');
      })
      .catch((error) => {
        console.error('Error en la solicitud PUT:', error);
        toast.error('Hubo un error inesperado al editar la política, inténtelo de nuevo');
      });
  };

  const transformarDatosAntesDeEnviar = (datos) => {
    return {
      titulo: datos.titulo,
      cedula_empresa: empresa,
      periodo: datos.periodo * (datos.unidadPeriodo === "1/24" ? (1 / 24) : datos.unidadPeriodo),
      fecha_inicio: datos.desdeContrato ? '2023-01-01' : datos.fecha_inicio,
      fecha_final: datos.fecha_final,
      desde_contrato: datos.desdeContrato,
      días_a_dar: datos.díasADar * (datos.unidadDíasADar === "1/24" ? (1 / 24) : datos.unidadDíasADar),
      incrementativo: !datos.incrementativo,
      días_a_incrementar: datos.incrementativo ? 0 : datos.díasAIncrementar * (datos.unidadIncremento === "1/24" ? (1 / 24) : datos.unidadIncremento),
      acumulativo: datos.acumulativo,
      activo: true,
      descripcion: datos.descripcion,
    };
  };

  const cancelarFormulario = () => {
    console.log("Formulario cancelado");
    // Aquí puedes realizar acciones específicas de cancelación
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
        clearErrors={getValues} // Cambiado a getValues
        errors={errors}
        mensajesError={mensajesError}
        register={register}
        patronesValidacion={patronesValidacion}
        control={control}
        datosPolitica={datosPolitica}
      />

      <ToastContainer />
    </div>
  );
}

export default EditarPolitica;
