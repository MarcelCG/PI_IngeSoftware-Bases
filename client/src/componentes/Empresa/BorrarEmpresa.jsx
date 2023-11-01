import axios from 'axios';
import React from 'react'
import { URLApi } from '../Compartido/Constantes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { BorrarEmpresaBody, BorrarEmpresaFooter } from './BorrarEmpresaHTML'
import { useAutent } from '../../contexto/ContextoAutenticacion';
import { useNavigate } from 'react-router-dom';

export const BorrarEmpresa = ({ datosEmpresa, botonRef, setModalValores }) => {

	const navegar = useNavigate();

	const RedirigirInicio = () => {
		// Clear the data stored in sessionStorage
		sessionStorage.removeItem('contextoAutenticacion');
		setTimeout(() => {
    	navegar('/login');
  	}, 	3000); 

	};

	const borrar = async() => {
		let estatusDescrip = "ERROR: Vuelva a intentar mas tarde";
	  try {
	  	const cedula_juridica = datosEmpresa.cedula_juridica;
	  	const respuesta = await axios.post(`${URLApi}empresa/borrar`, { cedula_juridica: cedula_juridica });

	  	const exito = 200;
	  	if(respuesta.status === exito){
	  		alternarModal();
		    estatusDescrip = "EXITO: La empresa ha sido eliminada, redirigiendo!";
		    
		    toast.success(estatusDescrip);
		  } else {
		  	estatusDescrip = "ERROR: Vuelva a intentar mas tarde";
		    toast.error(estatusDescrip);
		  }
	  }
	  catch (error) {
	  	estatusDescrip = "ERROR: Vuelva a intentar mas tarde";
	  	toast.error(estatusDescrip);
	  }
	  RedirigirInicio();
	};

	const alternarModal = () => {
		 botonRef.current.click();
	};

	const props = {alternarModal, datosEmpresa, borrar}; 
	const AbrirBorrarModal = () => {
		setModalValores({
     titulo:<strong>PELIGRO: Borrando Empresa</strong>,
     componente: <BorrarEmpresaBody {...props}/>,
     footer:<BorrarEmpresaFooter {...props}/>,
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