import React, {useState} from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAutent } from "../../contexto/ContextoAutenticacion";
import AddPolicyForm from "./AddPolicyForm";
import { URLApi } from '../Compartido/Constantes';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {errorMessages, obtenerPatronesValidacion, 
  transformDataBeforeSubmit} from './AyudanteFormulario';


// URL para el manejo de politicas
const politicas = URLApi + 'politicas';

function AddPolicy() {

  // Cedula de la empresa que inició sesión
  const {usuarioAutenticado} = useAutent(); 
  const empresa = usuarioAutenticado.cedula_empresa;

  const navegar = useNavigate();
  // Configuración del formulario usando react-hook-form
  const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm();

  // Estado del checkbox de "Rige a partir del contrato"
  const [disableStartDate, setDisableStartDate] = useState(false);

  // Estado del checkbox de "Incrementativo"
  const [disableIncremental, setDisableIncremental] = useState(false);

  const validationPatterns = obtenerPatronesValidacion(disableIncremental);

  // Función que se ejecuta al enviar el formulario
  const onSubmit = (data) => {
    console.log(data);
    const formData = {
      ...transformDataBeforeSubmit(data),
      cedula_empresa: empresa,
    }
  
    axios.post(politicas, formData).then((response) => {
        console.log('Solicitud POST exitosa:', response.data);
        // Muestra una notificación de éxito
        toast.success('Política agregada con éxito');

        /*Aquí debería volver a la pantalla visualizar políticas*/
      }).catch((error) => {
        if (error.response && error.response.status === 400
          && error.response.data 
          && error.response.data.error === 'El título ya existe') {
          console.error(error.response.data.error, error);
          // Muestra una notificación de error
          toast.error('Ya existe una política con ese título');
        } else {
          console.error('Error en la solicitud POST:', error);
          // Muestra una notificación de error
        toast.error('Hubo un error inesperado al agregar la política, trate de nuevo');
        }
      });
      reset();
  };

  // Función para cancelar el formulario
  const handleCancel = () => {
    console.log("Formulario cancelado");
    navegar('/app/politicas');
  };
  
  return (
        <>
          <AddPolicyForm
            onSubmit={handleSubmit(onSubmit)}
            handleCancel={handleCancel}
            setDisableStartDate={setDisableStartDate}
            disableStartDate={disableStartDate}
            disableIncremental={disableIncremental}
            setDisableIncremental={setDisableIncremental}
            clearErrors={clearErrors}
            errors={errors}
            errorMessages={errorMessages}
            register={register}
            validationPatterns={validationPatterns}
          />

          <ToastContainer />
        </>
  );
}

export const ModalAgregarPol = ({botonRef, setPolValores }) => {
  const abrir = () => {
    setPolValores({
      componente: <AddPolicy/ >,
      modalID:"modalPol",
      titulo: <h3 className='mt-2'>Agregar Política</h3>,
      tituloEstilos: 'titulo-ventana',
      tamanio:"modal-lg"});
    botonRef.current.click();
  };

  return (
    <button className="btn btn-primary col-2 continuar" onClick={abrir}>
      <FontAwesomeIcon icon={faPlus} />Agregar
    </button>
  );
};

export default AddPolicy;
