import React, { useEffect, useState } from "react";
import {toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { URLApi } from '../Compartido/Constantes';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import EditarPerfilEmpleadorHTML from './editarPerfilEmpleadorHTML';

const EditarPerfilEmpleador = () => {

  const { cedula } = useParams();
  const navigate = useNavigate();

  const [datosEmpleador, setDatosEmpleador] = useState({
    nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    correo1: "",
    correo2:"",
    cedula: "",
    telefono1:"",
    telefono2:"",
    nombre_empresa: ""
  });

  const URIInfoUsuarios = URLApi+`usuario/byCedula/${cedula}`;

  // Función para obtener la primera parte de los datos (de la tabla USUARIO).
  const obtenerInfoUsuarios = async () => {
    try {
      const respuesta = await axios.get(URIInfoUsuarios);
      const datos = respuesta.data;

      // Actualiza el estado con los datos de la tabla USUARIO.
      setDatosEmpleador((prevData) => ({ ...prevData, ...datos }));

      reset();

    } catch (error) {
      console.error('Error al obtener datos del empleado desde la segunda API:', error);
    }
  };

  // Llamado a las funciones para obtener datos del empleado.
  useEffect(() => {
    obtenerInfoUsuarios();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({
    mode: 'onSubmit',
  });

  const URIActualizarDatos = URLApi + `editarEmpleador/`;

  const onSubmit = handleSubmit(async (data) => {

    // Realiza la solicitud de actualización de datos del empleado con los nuevos valores.
    try {
        console.log(data);
        data.cedula=cedula;
        const respuesta = await axios.post(URIActualizarDatos, data);
        toast.success('Empleado editado con éxito', {
            position: toast.POSITION.TOP_RIGHT
        });
        setTimeout(() => {
            navigate(-1);
        }, 3000);

    } catch (error) {
      // Manejo de errores
      console.error('Error en la solicitud POST:', error);
      toast.error('Hubo un error inesperado al editar el empleado, inténtelo de nuevo', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  });

  const handleCancelClick = () => {
    navigate(-1);
  };
    return (
      <EditarPerfilEmpleadorHTML 
      onSubmit = {handleSubmit(onSubmit)}
      datosEmpleador = {datosEmpleador}
      register = {register}
      errors = {errors}
      watch = {watch}
      handleCancelClick ={handleCancelClick}
      />
    )
}

export default EditarPerfilEmpleador;

