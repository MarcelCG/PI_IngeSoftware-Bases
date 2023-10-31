import axios from 'axios';
import _ from "lodash";
import EditarEmpresaHTML from './EditarEmpresaHTML'
import React, { useState } from 'react'
import {handleSubmit} from '../Registro/FormInput'
import { URLApi } from '../Compartido/Constantes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export const EditarEmpresa = ({ datosEmpresa, botonRef, setModalValores, setDatosDeEmpresa}) => {


	const [formulario, setFormulario] = useState({
		nombre: datosEmpresa.nombre,
    correo1: datosEmpresa.correo1,
    correo2: datosEmpresa.correo2||"",
    telefono1: datosEmpresa.telefono1,
    telefono2: datosEmpresa.telefono2||"",
    cedula_juridica: datosEmpresa.cedula_juridica,
	});
	const [errores, setErrores] = useState({
    nombre: false,
    correo1: false,
    correo2: false,
    telefono1: false,
    telefono2: false,
    cedula_juridica: false,
  });
	const campos = [
		{
		  id:1,
		  type:"text",
		  name:"nombre",
		  label:"Nombre de empresa",
			placeholder:"Nombre de empresa",
			errorMessage: "Debe contener al menos 3 letras y puede incluir caracteres especiales como '&', '-', '_', o '.'",
			required: true,
			patron: /^([a-zA-Z0-9&\-_.]{3,}[a-zA-Z0-9 &\-_.]*)$/,},
		{
		  id:2,
			type:"text",
			name:"correo1",
			label:"Correo empresaria",
			style:"col-6",
			placeholder:"correo@dominio.com",
			errorMessage: "ejemplo@dominio.com",
			required: true,
			patron: /^([a-zA-Z0-9&\-_.]+@[a-zA-Z.]+.[a-zA-Z]{2,})$/ },
		{
		  id:3,
			type:"text",
			name:"correo2",
			label:"Opcional",
			style:"col-6",
			placeholder:"correo@dominio.com*",
			errorMessage: "ejemplo@dominio.com",
			required: false,
			patron: /^([a-zA-Z0-9&\-_.]+@[a-zA-Z.]+.[a-zA-Z]{2,})$/ },
		{
		  id:4,
			type:"text",
			name:"telefono1",
			label:"Telefono empresarial",
			style:"col-6",
			placeholder:"8888-8888",
			errorMessage:"Ejemplo: 1234-5678",
			required: true,
			patron: /^([876][0-9]{3}-[0-9]{4})$/},
		{
		  id:5,
			type:"text",
			name:"telefono2",
			label:"Opcional",
			style:"col-6",
			placeholder:"8888-8888*",
			errorMessage:"1234-5678",
			required: false,
			patron: /^([876][0-9]{3}-[0-9]{4})$/ },
		{
		  id:6,
			type:"disable",
			name:"cedula_juridica",
			label:<>Cedula juridica | <b>No se puede cambiar</b></>,
			patron:/^(.*)$/,
			disabled: true,
			placeholder:datosEmpresa.cedula_juridica,
			required: true}
	];

	const enviarDatos = async (formulario) => {
		let errorDesc = "ERROR: Vuelva a intentar mas tarde";
	  try {
	  	const empresa = {...formulario};
	  	const url = URLApi+`empresa/editar${empresa}`;
	  	console.log("URL: ", url);
	  	const respuesta = await axios.put(url, {empresa});
	  	const exito = 200;
	  	if(respuesta.status === exito){
	  		botonRef.current.click();
		    errorDesc = "EXITO: empresa actualizada!";
		    toast.success(errorDesc);
		    setDatosDeEmpresa(formulario);
		    setFormulario(formulario);
		  } else {
		  	errorDesc = "ERROR: vuelva a intentar mas tarde";
		    toast.error(errorDesc);
		  }
	  }
	  catch (error) {
	  	errorDesc = "ERROR: vuelva a intentar mas tarde";
	  	toast.error(errorDesc);
		}
	};

	const actualizarEmpresa = (formularioNuevo) => {
		const iguales = _.isEqual(formulario, formularioNuevo);
		let arregloErrores = handleSubmit(campos, formularioNuevo, setErrores);
		const valores = Object.values(arregloErrores);
		const valido = valores.some(item => item === true);
		if (valido === false && iguales === false) {
			enviarDatos(formularioNuevo);
		}
		return arregloErrores;
	};

	const props = {setModalValores, actualizarEmpresa, campos, datosEmpresa, formulario, setFormulario, errores, setErrores};

	const abrirEditarEmpresa = () => {
		setModalValores({
			titulo:"Editar empresa",
			modalID:"modalEmpresa",
			componente: <EditarEmpresaHTML {...props}/>,
			tamanio:"modal-lg",
			tituloEstilos: "titulo-ventana"
		});
		botonRef.current.click();
	};

	return (
		<>
			<ToastContainer autoClose={2500}/>
			<button className="btn-primary me-2" onClick={abrirEditarEmpresa}>
				Editar empresa <FontAwesomeIcon icon={faPenToSquare}/>
			</button>
		</>
	);
}; 