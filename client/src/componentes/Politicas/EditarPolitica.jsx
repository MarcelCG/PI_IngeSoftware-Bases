import axios from 'axios';
import _ from "lodash";
import EditarPoliticaHTML from './EditarPoliticaHTML'
import React, { useState } from 'react'
import { handleSubmit } from '../Registro/FormInput'
import { URLApi } from '../Compartido/Constantes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export const EditarPolitica = ({ datosPolitica, botonRef, setModalValores, setDatosDePolitica }) => {
  const [formulario, setFormulario] = useState({
    titulo: datosPolitica.titulo,
    cedula_empresa: datosPolitica.cedula_empresa,
    periodo: datosPolitica.periodo,
    fecha_final: datosPolitica.fecha_final,
    inicia_desde_contrato: datosPolitica.inicia_desde_contrato,
    dias_a_dar: datosPolitica.dias_a_dar,
    incrementativo: datosPolitica.incrementativo,
    dias_a_incrementar: datosPolitica.dias_a_incrementar,
    acumulativo: datosPolitica.acumulativo,
    activo: datosPolitica.activo,
    descripcion: datosPolitica.descripcion,
  });

  const [errores, setErrores] = useState({
    titulo: false,
    cedula_empresa: false,
    periodo: false,
    fecha_final: false,
    inicia_desde_contrato: false,
    dias_a_dar: false,
    incrementativo: false,
    dias_a_incrementar: false,
    acumulativo: false,
    activo: false,
    descripcion: false,
  });

  const campos = [
    {
      id: 1,
      type: 'text',
      name: 'titulo',
      label: 'Título de la política',
      placeholder: 'Título de la política',
      required: true,
    },
    {
      id: 2,
      type: 'text',
      name: 'cedula_empresa',
      label: 'Cédula de la empresa',
      placeholder: 'Cédula de la empresa',
      required: true,
    },
    {
      id: 3,
      type: 'text',
      name: 'periodo',
      label: 'Periodo',
      placeholder: 'Periodo',
      required: true,
    },
    {
      id: 4,
      type: 'text',
      name: 'fecha_final',
      label: 'Fecha Final',
      placeholder: 'Fecha Final',
      required: true,
    },
    {
      id: 5,
      type: 'text',
      name: 'inicia_desde_contrato',
      label: 'Inicia Desde Contrato',
      placeholder: 'Inicia Desde Contrato',
      required: true,
    },
    {
      id: 6,
      type: 'text',
      name: 'dias_a_dar',
      label: 'Días a Dar',
      placeholder: 'Días a Dar',
      required: true,
    },
    {
      id: 7,
      type: 'text',
      name: 'incrementativo',
      label: 'Incrementativo',
      placeholder: 'Incrementativo',
      required: true,
    },
    {
      id: 8,
      type: 'text',
      name: 'dias_a_incrementar',
      label: 'Días a Incrementar',
      placeholder: 'Días a Incrementar',
      required: true,
    },
    {
      id: 9,
      type: 'text',
      name: 'acumulativo',
      label: 'Acumulativo',
      placeholder: 'Acumulativo',
      required: true,
    },
    {
      id: 10,
      type: 'text',
      name: 'activo',
      label: 'Activo',
      placeholder: 'Activo',
      required: true,
    },
    {
      id: 11,
      type: 'text',
      name: 'descripcion',
      label: 'Descripción',
      placeholder: 'Descripción',
      required: true,
    },
  ];

  const enviarDatos = async (formulario) => {
    try {
      const politica = { ...formulario };
      const respuesta = await axios.put(`${URLApi}politica/editar/${politica.titulo}`, politica);

      if (respuesta.status === 200) {
        botonRef.current.click();
        toast.success('Política actualizada con éxito');
        setDatosDePolitica(formulario);
        setFormulario(formulario);
      } else {
        toast.error('Error al actualizar la política');
      }
    } catch (error) {
      toast.error('Error al actualizar la política');
    }
  };

  const actualizarPolitica = (formularioNuevo) => {
    const iguales = _.isEqual(formulario, formularioNuevo);
    let arregloErrores = handleSubmit(campos, formularioNuevo, setErrores);
    const valores = Object.values(arregloErrores);
    const valido = valores.some((item) => item === true);
    if (valido === false && iguales === false) {
      enviarDatos(formularioNuevo);
    }
    return arregloErrores;
  };

  const props = { setModalValores, actualizarPolitica, campos, datosPolitica, formulario, setFormulario, errores, setErrores };

  const abrirEditarPolitica = () => {
    setModalValores({
      titulo: 'Editar política',
      modalID: 'modalPolitica',
      componente: <EditarPoliticaHTML {...props} />,
      tamanio: 'modal-lg',
      tituloEstilos: 'titulo-ventana',
    });
    botonRef.current.click();
  };

  return (
    <>
      <ToastContainer autoClose={2500} />
      <button className="btn-primary me-2" onClick={abrirEditarPolitica}>
        Editar política <FontAwesomeIcon icon={faPenToSquare} />
      </button>
    </>
  );
};


