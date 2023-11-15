import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useAutent } from "../../contexto/ContextoAutenticacion";
import PoliticasFormularioHTML from "./PoliticasFormularioHTML";
import { obtenerPatronesValidacion, mensajesError,
  transformarDatosAntesDeEnviar, convertirDatosRecibidos } from "./AyudanteFormulario";
import { URLApi } from '../Compartido/Constantes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import 'react-toastify/dist/ReactToastify.css';

const politicas = URLApi + 'politicas';

function EditarPolitica(props) {
  // Agrega un estado para los datos de la política
  const [datosPolitica, setDatosPolitica] = useState(null);
  const { usuarioAutenticado } = useAutent();
  const empresa = usuarioAutenticado.cedula_empresa;
  const { titulo } = props.match.params;

  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();

  const [desactivarFechaInicio, setDesactivarFechaInicio] = useState(false);
  const [desactivarIncremento, setDesactivarIncremento] = useState(false);

  const patronesValidacion = obtenerPatronesValidacion(desactivarIncremento);

  useEffect(() => {
    // Realiza una solicitud GET para obtener los datos de la política
    axios.get(`${politicas}/searchPolitica/${titulo}/${empresa}`)
      .then((response) => {
        const datosPolitica = convertirDatosRecibidos(response.data);
        // Establece los datos de la política cuando están disponibles
        setDatosPolitica(datosPolitica);
        // Rellena el formulario con los datos de la política
        setValue("titulo", datosPolitica.titulo);
        setValue("periodo", datosPolitica.periodo);
        setValue("unidad_periodo", datosPolitica.unidad_periodo);
        setValue("fecha_inicio", datosPolitica.fecha_inicio);
        setValue("fecha_final", datosPolitica.fecha_final);
        setValue("dias_a_dar", datosPolitica.dias_a_dar);
        setValue("unidad_a_dar", datosPolitica.unidad_a_dar);
        setValue("dias_a_incrementar", datosPolitica.dias_a_incrementar);
        setValue("unidad_incremento", datosPolitica.unidad_incremento);
        setValue("acumulativo", datosPolitica.acumulativo);
        setValue("descripcion", datosPolitica.descripcion);

        setDesactivarFechaInicio(datosPolitica.inicia_desde_contrato)
        setDesactivarIncremento(!datosPolitica.incrementativo);
      })
      .catch((error) => {
        console.error('Error al obtener los datos de la política', error);
        toast.error('Hubo un error al obtener los datos de la política');
      });
  }, [titulo, setValue]);

  const enviarFormulario = (datos) => {
    const datosFormulario = {
      ...transformarDatosAntesDeEnviar(datos),
      cedula_empresa: empresa,
    };

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

  const cancelarFormulario = () => {
    console.log("Formulario cancelado");
    // Aquí puedes realizar acciones específicas de cancelación
  };

  return (
    <>
      <PoliticasFormularioHTML
        onSubmit={handleSubmit(enviarFormulario)}
        handleCancel={cancelarFormulario}
        setDisableStartDate={setDesactivarFechaInicio}
        disableStartDate={desactivarFechaInicio}
        disableIncremental={desactivarIncremento}
        setDisableIncremental={setDesactivarIncremento}
        clearErrors={getValues} // Cambiado a getValues
        errors={errors}
        mensajesError={mensajesError}
        register={register}
        patronesValidacion={patronesValidacion}
        datosPolitica={datosPolitica}
        accion="Editar"
      />
      <ToastContainer />
    </>
  );
};

export const ModalEditarPol = (props) => {
  const {botonRef, setPolValores, match } = props;
  const titulo = match.params.titulo;
  const abrir = () => {
    setPolValores({
      componente: <EditarPolitica {...props}/>,
      modalID:"modalEditarPol",
      titulo: <h3 className='mt-2'>Editar Política: {titulo}</h3>,
      tituloEstilos: 'titulo-ventana',
      tamanio:"modal-lg"});
    botonRef.current.click();
  };

  return (
    <button className="btn-primary me-2" onClick={abrir}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </button>
  );
};

export default EditarPolitica;
