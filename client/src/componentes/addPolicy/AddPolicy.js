import React, {useState} from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import AddPolicyForm from "./AddPolicyForm";
import 'react-toastify/dist/ReactToastify.css';
import "./AddPolicy.css"

// URL para el Api
const api = 'http://localhost:5000/api';

// URL para el manejo de politicas
const politicas = api + '/politicas';

// Cedula de la empresa que inició sesión
const empresa = '123ABC';

function AddPolicy() {

  // Configuración del formulario usando react-hook-form
  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm();

  // Estado del checkbox de "Rige a partir del contrato"
  const [disableStartDate, setDisableStartDate] = useState(false);

  // Estado del checkbox de "Incrementativo"
  const [disableIncremental, setDisableIncremental] = useState(false);

  // Mensajes de error estándar
  const errorMessages = {
    required: "Este campo es obligatorio",
  };

  // Patrones de validación específicos para cada campo
  const validationPatterns = {
    periodo: {
      pattern: {
        value: /^[1-9]\d*$/,
        message: "Este campo debe ser mayor a 0"
      },
    },
    dias_a_dar: {
      pattern: {
        value: /^[1-9]\d*$/,
        message: "Este campo debe ser mayor a 0"
      },
    },
    dias_a_incrementar: {
      pattern: {
        value: !disableIncremental ? /^[1-9]\d*$/ : '',
        message: "Este campo debe ser mayor a 0"
      },
    },
  };

  // Función que se ejecuta al enviar el formulario
  const onSubmit = (data) => {
    const formData = transformDataBeforeSubmit(data);
  
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
  };

  // Esta función prepara los datos antes de enviarlos
  const transformDataBeforeSubmit = (data) => {
    return {
      titulo: data.titulo,
      cedula_empresa: empresa,
      periodo: data.periodo * (data.periodUnit === "1/24" ? (1/24): data.periodUnit),
      fecha_inicio: data.inicia_desde_contrato ? '2023-01-01': data.fecha_inicio,
      fecha_final: data.fecha_final,
      inicia_desde_contrato: data.inicia_desde_contrato,
      dias_a_dar: data.dias_a_dar * (data.dias_a_darUnit === "1/24" ? (1/24): data.dias_a_darUnit),
      incrementativo: !data.incrementativo,
      dias_a_incrementar: data.incrementativo ? 0 : data.dias_a_incrementar * (data.incrementalUnit === "1/24" ? (1/24): data.incrementalUnit),
      acumulativo: data.acumulativo,
      activo:true,
      descripcion: data.descripcion,
    };
  };

  // Función para cancelar el formulario
  const handleCancel = () => {
    console.log("Formulario cancelado");

    /*Aquí debería volver a la pantalla visualizar políticas*/
  };
  

  return (
    <div className="formulario bg-white" >
        <h1 className="titulo">Agregar Política</h1>

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
    </div>
  );
}

export default AddPolicy;
