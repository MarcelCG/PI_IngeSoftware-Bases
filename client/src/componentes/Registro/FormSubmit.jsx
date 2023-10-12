import axios from 'axios';
import React, {useState} from "react";
import {FormReview} from './FormInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer, toast } from 'react-toastify';


export const FormSubmit = ({ formData, setForm, errForm, setErrForm, navigation }) => {
	const [loading, setloading] = useState(false);

	const navigate = useNavigate();

	const empresaValues = [
		{
			id:1,
			name:"empresaName",
			style:"",
			label:"Nombre",
		},
		{
			id:2,
			name:"empresaCorreo1",
			style:"col-6",
			label:"Correo",
		},
		{
			id:3,
			name:"empresaCorreo2",
			style:"col-6",
			label:"Correo opcional",
		},
		{
			id:4,
			name:"empresaTel1",
			style:"col-6",
			label:"Telefono",
		},
		{
			id:5,
			name:"empresaTel2",
			style:"col-6",
			label:"Telefono opcional",
		},
		{
			id:6,
			name:"empresaCedu",
			style:"",
			label:"Cedula Juridica",
		},
	]

	const empleadorValues = [
		{
			id:1,
			name:"empleadorName",
			style:"col-4 ",
			label:"Nombre",
		},
		{
			id:2,
			name:"empleadorApe1",
			style:"col-4",
			label:"Apellido 1",
		},
		{
			id:3,
			name:"empleadorApe2",
			style:"col-4",
			label:"Apellido 2",
		},
		{
			id:4,
			name:"empleadorCedu",
			style:"",
			label:"Cedula",
		},
		{
			id:5,
			name:"empleadorCorreo1",
			style:"col-6",
			label:"Correo",
		},
		{
			id:6,
			name:"empleadorCorreo2",
			style:"col-6",
			label:"Correo opcional",
		},
		{
			id:7,
			name:"empleadorTel1",
			style:"col-6",
			label:"Telefono",
		},
		{
			id:8,
			name:"empleadorTel2",
			style:"col-6",
			label:"Telefono opcional",
		},
	]

	const sendDataDB = async (e) => {
		setloading(true);
		let errorDesc = "ERROR: Vuelva a intentar mas tarde";
	  try {
	  	// eslint-disable-next-line no-unused-vars
	    const response = await axios.post('http://localhost:5000/api/registro', {
	      formData
	    });
	    errorDesc = "SUCCESS: Registro exitoso!\nRedirigiendo...";
	    toast.success(errorDesc,{position: toast.POSITION.TOP_CENTER, className:"alert alert-success"});
	   	// redirigir
      	setTimeout(() => {
        	navigate('/');
      	}, 	3000); 
	  }
	  catch (error) {
	  	if(error.response){
		  	switch(error.response.data.message){
		    	case 1:
	    			errorDesc = "ERROR: La cedula del EMPLEADOR ya existe";
	    		break;
	    		case 2:
	    			errorDesc = "ERROR: La cedula de la EMPRESA ya existe";
	    		break;
	    		case 3:
	    			errorDesc = "ERROR: La cedula de la EMPRESA y del EMPLEADOR ya existe";
	    		break;
	    	  	default:
		   	}
		}
	  	toast.error(errorDesc,{position: toast.POSITION.TOP_CENTER, className:"alert alert-danger"});
	  	setloading(false);
	  }
	};

	return (
		<div className="container col-5 position-static">
	    <ToastContainer autoClose={2500}/>
			<div className="card border-dark shadow m-3">
				<div className="card-header">
					<h2>Formulario | Review </h2>
				</div>
				<div className="card-body">
					<h4 className="px-3">Empresa</h4>
				 	<div className="row alert alert-light m-3">
				 		{empresaValues.map((empresaV) => (
				 			<div className={empresaV.style} key={empresaV.id}>
				 				<FormReview {...empresaV} value={formData[empresaV.name]} />
				 			</div>
				 		))}
				 	</div>
				 	<h4 className="px-3">Empleador</h4>
				 	<div className="row alert alert-light m-3">
				 		{empleadorValues.map((empresaV) => (
				 			<div className={empresaV.style} key={empresaV.id}>
				 				<FormReview {...empresaV} value={formData[empresaV.name]} />
				 			</div>
				 		))}
				 	</div>
				 	<div className="row px-4 justify-content-between">
				 		<button onClick={() => navigation.previous()} className="btn col-3 btn-secondary" disabled={loading}>atras</button>
				 		<button onClick={sendDataDB} className="btn col-3 btn-primary" disabled={loading}>
				 			{loading ? (<div className="spinner-border spinner-border-sm" role="status" />) : ("Submit")}
				 		</button>
				 	</div>
		        </div>
		  	</div>
		</div>
	);
};