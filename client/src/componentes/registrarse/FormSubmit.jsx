import React, {useState} from "react";
import {FormReview} from './FormInput'
import axios from 'axios';

export const FormSubmit = ({ formData, setForm, errForm, setErrForm, navigation }) => {
	
	const [error, setError] = useState(false);

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
			name:"empresaCorreo",
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
			name:"empresaTel",
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
			style:"col-4",
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
			name:"empleadorCorreo",
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
			name:"empleadorTel",
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
	  try {
	    const response = await axios.post('http://localhost:5000/api/registro', {
	      formData
	    });
	    console.log('POST exitoso:', response.data);
	    setError(false);
	  }
	  catch (error) {
	  		console.log("numero magico: ", error.request);
	    	setError(true);
	    	setErrorDescr("");
	  }
	  if(error && errorDescr){
	  	console.log("solo para que no brinque error[temporal]")
	  }
	};

	return (
		<div className="container col-5 position-static">
			<div className="card border-dark shadow m-3">
			<div className="card-header">
				<h1>Formulario | Review </h1></div>
				<div className="card-body">
				 	<div className="px-4 row py-3">
				 		{empresaValues.map((empresaV) => (
				 			<div
				 				className={empresaV.style} key={empresaV.id}>
				 				<FormReview
				 					{...empresaV} value={formData[empresaV.name]} />
				 			</div>
				 		))}
				 	</div>
				 	<div className="px-4 row py-3">
				 		{empleadorValues.map((empresaV) => (
				 			<div
				 				className={empresaV.style} key={empresaV.id}>
				 				<FormReview
				 					{...empresaV} value={formData[empresaV.name]} />
				 			</div>
				 		))}
				 	</div>
				 	<button onClick={() => navigation.previous()} className="btn col-3 btn-secondary ">Atras</button>
				 	<button onClick={sendDataDB} className="btn col-3 btn-secondary ">S U B M I T</button>
		        </div>
		  	</div>
		</div>
	);
};