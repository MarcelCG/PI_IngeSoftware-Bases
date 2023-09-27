import React from "react";
import FormInput, {handleSubmit, TogglePassword} from './FormInput'
import axios from 'axios';

export const FormEmpleador = ({ formData, setForm, errForm, setErrForm, navigation }) => {

	const [inputType, toggle] = TogglePassword();

	const inputs = [
		{
		  id:1,
		  name:"empleadorName",
			type:"text",
			style:"col",
			placeholder:"Nombre",
			errorMessage: "solo letras",
			required: true,
			patron: /^([a-zA-Z ÁáÉéÍíÓóÚú]+)$/,},
		{
		  id:2,
		  name:"empleadorApe1",
			type:"text",
			style:"col",
			placeholder:"Apellido 1",
			errorMessage: "solo letras",
			required: true,
			patron: /^([a-zA-Z ÁáÉéÍíÓóÚú]+)$/,},
		{
		  id:3,
		  name:"empleadorApe2",
			type:"text",
			style:"col",
			placeholder:"Apellido 2",
			errorMessage: "solo letras",
			required: true,
			patron: /^([a-zA-Z ÁáÉéÍíÓóÚú]+)$/,},
		{
		  id:4,
		  name:"empleadorCorreo",
			type:"text",
			placeholder:"Email personal",
			errorMessage: "ejemplo@dominio.com",
			required: true,
			patron: /^([a-zA-Z0-9&\-_.]+@[a-zA-Z.]+.[a-zA-Z]{2,})$/ },
		{
		  id:5,
		  name:"empleadorCorreo2",
			type:"text",
			placeholder:"email-opcional",
			errorMessage: "ejemplo@dominio.com",
			required: false,
			patron: /^([a-zA-Z0-9&\-_.]+@[a-zA-Z.]+.[a-zA-Z]{2,})$/ },
		{
		  id:6,
		  name:"empleadorTel",
			type:"tel",
			placeholder:"telefono",
			errorMessage:"1234-5678",
			required: true,
			patron: /^([87624][0-9]{3}-[0-9]{4})$/ },
		{
		  id:7,
		  name:"empleadorTel2",
			type:"tel",
			placeholder:"telefono-opcional",
			errorMessage:"1234-5678",
			required: false,
			patron: /^([87624][0-9]{3}-[0-9]{4})$/ },
		{
		  id:8,
		  name:"empleadorPass",
			type: inputType,
			placeholder:"password",
			errorMessage:"1234h-5678",
			required: true,
			isPassword:true,
			patron: /$/ }
	]

	const atrasClick = (e) => {
	 navigation.previous();
	}

	const nextClick = (e) => {
		let inputsAreValid = handleSubmit(inputs, formData, setErrForm, errForm)
		if (!inputsAreValid) {
			console.log(inputs);
		}
	}

	return (
		<div className="container col-5 position-static">
			<div className="card border-dark shadow m-3">
				<div className="card-header"><h1>Formulario | Empleador</h1></div>
					<div className="card-body">
			      <form className="px-4 row py-3">
			        {inputs.map((input) => (
			        <div className={input.style} key={input.id}>
				        <FormInput
			            {...input}
			            value={formData[input.name]}
			            boolError={errForm[input.name]}
			            onChange={setForm}
			            toggle={toggle}
			          />
			        </div>
			        ))}
	      	  </form>
		      <button onClick={atrasClick} className="btn col-3 btn-secondary ">Atras</button>
		      <button onClick={nextClick} className="btn col-4 btn-primary ">Submit	</button>
			  </div>
			</div>
		</div>
	);
};