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
import EditarEmpleadoHTML from './editarEmpleadoHTML';


const EditarEmpleado = () => {

  const { cedula } = useParams();
  const navigate = useNavigate();

  const [datosEmpleado, setDatosEmpleado] = useState({
    cedula: "",
    contrasena: "",
    nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    rol: "",
    telefono1: "",
    telefono2: "",
    correo1: "",
    correo2: "",
    fecha_contratacion: ""
  });

  const URIInfoEmpleados = URLApi+`empleados/byCedula/${cedula}`;
  const URIInfoUsuarios = URLApi+`usuario/byCedula/${cedula}`;
  const URIActualizarDatos = URLApi+`editarEmpleado/`;

// Función para obtener la primera parte de los datos (de la tabla EMPLEADO).
const obtenerInfoEmpleado = async () => {
    try {
      const respuesta = await axios.get(URIInfoEmpleados);
      const datosEmpleado = respuesta.data;

      // Se da formato a la fecha obtenida de la base de datos.
      const fechaContratacion = new Date(datosEmpleado.fecha_contratacion);
      const año = fechaContratacion.getUTCFullYear();
      const mes = fechaContratacion.getUTCMonth() + 1;
      const dia = fechaContratacion.getUTCDate();
      const fechaContratacionFormateada = `${año}-${mes.toString().padStart(2, 
        '0')}-${dia.toString().padStart(2, '0')}`;
      reset();

      // Actualiza el estado con los datos de la tabla EMPLEADO.
      setDatosEmpleado((prevData) => ({ ...prevData, ...datosEmpleado, 
        fecha_contratacion: fechaContratacionFormateada }));

      reset();

    } catch (error) {
      console.error('Error al obtener datos del empleado de la tabla EMPLEADO:', error);
    } 
  };
  
  // Función para obtener la primera parte de los datos (de la tabla USUARIO).
  const obtenerInfoUsuarios = async () => {
    try {
      const respuesta = await axios.get(URIInfoUsuarios);
      const datos = respuesta.data;

      // Actualiza el estado con los datos de la tabla USUARIO.
      setDatosEmpleado((prevData) => ({ ...prevData, ...datos }));

      reset();

    } catch (error) {
      console.error('Error al obtener datos del empleado desde la segunda API:', error);
    }
  };

  // Llamado a las funciones para obtener datos del empleado.
  useEffect(() => {
    obtenerInfoEmpleado();
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

  const onSubmit = handleSubmit(async (data) => {

    // Realiza la solicitud de actualización de datos del empleado con los nuevos valores.
    try {
      
        data.cedula=cedula;
        const respuesta = await axios.post(URIActualizarDatos, data);
        console.log('Solicitud POST exitosa:', respuesta.data);

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
      <EditarEmpleadoHTML 
      onSubmit = {handleSubmit(onSubmit)}
      datosEmpleado = {datosEmpleado}
      register = {register}
      errors = {errors}
      watch = {watch}
      handleCancelClick = {handleCancelClick}
      />
    )
}

export default EditarEmpleado;