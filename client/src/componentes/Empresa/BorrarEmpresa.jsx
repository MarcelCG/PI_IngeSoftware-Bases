import axios from 'axios';
import _ from "lodash";
import EditarEmpresaHTML from './EditarEmpresaHTML'
import React, { useState } from 'react'
import {handleSubmit} from '../Registro/FormInput'
import { URLApi } from '../Compartido/Constantes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { BorrarEmpresaHTML } from './BorrarEmpresaHTML'

export const BorrarEmpresa = ({ datosEmpresa, botonRef, setModalValores }) => {

	const borrar = async() => {
		// let estatusDescrip = "ERROR: Vuelva a intentar mas tarde";
	  // try {
	  // 	const respuesta = await axios.post(`${URLApi}empresa/borrar/${datosEmpresa.cedula_juridica}`);
	  // 	const exito = 200;
	  // 	if(respuesta.status === exito){
	  // 		// botonRef.current.click();
		//     estatusDescrip = "EXITO: La empresa ha sido eliminada, redirigiendo!";
		//     // redirigir
		//     toast.success(estatusDescrip);
		//   } else {
		//   	estatusDescrip = "ERROR: Vuelva a intentar mas tarde";
		//     toast.error(estatusDescrip);
		//   }
	  // }
	  // catch (error) {
	  // 	estatusDescrip = "ERROR: Vuelva a intentar mas tarde";
	  // 	toast.error(estatusDescrip);
		// }
	};

	const alternarModal = () => {
		 botonRef.current.click();
	};
	const props = {alternarModal, datosEmpresa, borrar}; 
	const AbrirBorrarModal = () => {
		setModalValores({
     titulo:<strong>PELIGRO: Borrando Empresa</strong>,
     componente: <BorrarEmpresaHTML {...props} />,
     modalID:"modalEmpresa",
     tituloEstilos: "titulo-ventana-rojo"
   	});
   alternarModal();
	 };

	return (
		<>
			<ToastContainer autoClose={2500}/>
			<button className="btn btn-danger me-2" onClick={AbrirBorrarModal}>
				Borrar empresa <FontAwesomeIcon icon={faTrash}/>
			</button>
		</>
	);
};