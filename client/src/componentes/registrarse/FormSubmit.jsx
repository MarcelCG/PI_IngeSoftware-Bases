import React, {useState, useRef} from "react";
import {FormReview} from './FormInput'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';

export const FormSubmit = ({ formData, setForm, errForm, setErrForm, navigation }) => {
	const buttonRef = useRef(null);
	const [errorDescr, setErrorDescr] = useState("");

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

	const openModal = (buttonRef) => {
	    if (buttonRef.current) {
	      buttonRef.current.click();
	    }
	  };

	const sendDataDB = async (e) => {
	  try {
	    const response = await axios.post('http://localhost:5000/api/registro', {
	      formData
	    });
	    if(response !== 200){
	    	switch(response){
	    		case 1:
	    			setErrorDescr("La cedula del empleador ya existe");
	    		break;
	    		case 2:
	    			setErrorDescr("La cedula de la empresa ya existe");
	    		break;
	    		case 3:
	    			setErrorDescr("La cedula de la empresa y del empleador ya existe");
	    		break;
	    	    default:
	   		}
	   		openModal(buttonRef);
	    }
	    else {
	    	console.log('POST exitoso:', response.data);
	    }
	  }
	  catch (error) {
	  		console.log("E R R O R: ", error);
	  		openModal(buttonRef);
	    	setErrorDescr("Ha ocurrido un error, vuelva a intentar mas tarde");
	  }
	};

	return (
		<div className="container col-5 position-static">
		<button hidden="true" data-bs-toggle="modal" data-bs-target="#errorModal" ref={buttonRef} />
	    <div className="modal fade" id="errorModal">
	      <div className="modal-dialog modal-dialog-centered">
	        <div class="alert alert-danger" role="alert">
			  		{errorDescr}
			  	</div>
	      </div>
	    </div>
			<div className="card border-dark shadow m-3">
				<div className="card-header">
					<h2>Registro | Review </h2>
				</div>
				<div className="card-body">
					<h4 className="px-3">Empresa</h4>
				 	<div className="row alert alert-light m-3">
				 		{empresaValues.map((empresaV) => (
				 			<div
				 				className={empresaV.style} key={empresaV.id}>
				 				<FormReview
				 					{...empresaV} value={formData[empresaV.name]} />
				 			</div>
				 		))}
				 	</div>
				 	<h4 className="px-3">Empleador</h4>
				 	<div className="row alert alert-light m-3">
				 		{empleadorValues.map((empresaV) => (
				 			<div
				 				className={empresaV.style} key={empresaV.id}>
				 				<FormReview
				 					{...empresaV} value={formData[empresaV.name]} />
				 			</div>
				 		))}
				 	</div>
				 	<div className="row px-4 justify-content-between">
				 		<button onClick={() => navigation.previous()} className="btn col-3 btn-secondary ">atras</button>
				 		<button onClick={sendDataDB} className="btn col-3 btn-primary ">submit</button>
				 	</div>
		        </div>
		  	</div>
		</div>
	);
};