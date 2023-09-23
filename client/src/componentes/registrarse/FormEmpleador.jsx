import React from "react";
import FormInput, {handleSubmit} from './FormInput'

export const FormEmpleador = ({ formData, setForm, errForm, setErrForm, navigation }) => {

	const inputs = [
		{
		  id:1,
		  name:"empleadorName",
			type:"text",
			placeholder:"Nombre empleador, completo",
			errorMessage: "nombre con 2 apellidos",
			required: true,
			patron: /^([a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+)$/,},
		{
		  id:2,
		  name:"empleadorCorreo",
			type:"text",
			placeholder:"Email personal",
			errorMessage: "ejemplo@dominio.com",
			required: true,
			patron: /^([a-zA-Z0-9&\-_.]+@[a-zA-Z.]+.[a-zA-Z]{2,})$/ },
		{
		  id:3,
		  name:"empleadorCorreo2",
			type:"text",
			placeholder:"email-opcional",
			errorMessage: "ejemplo@dominio.com",
			required: false,
			patron: /^([a-zA-Z0-9&\-_.]+@[a-zA-Z.]+.[a-zA-Z]{2,})$/ },
		{
		  id:4,
		  name:"empleadorTel",
			type:"text",
			placeholder:"telefono",
			errorMessage:"1234-5678",
			required: true,
			patron: /^([876][0-9]{3}-[0-9]{4})$/ },
		{
		  id:5,
		  name:"empleadorTel2",
			type:"text",
			placeholder:"telefono-opcional",
			errorMessage:"1234-5678",
			required: false,
			patron: /^([876][0-9]{3}-[0-9]{4})$/ },
		{
		  id:6,
		  name:"empleadorPass",
			type:"password",
			placeholder:"password",
			errorMessage:"1234-5678",
			required: true,
			patron: /$/ },
	]

	const atrasClick = (e) => {
	 navigation.previous();
	}

	const nextClick = (e) => {
		let inputsAreValid = handleSubmit(inputs, formData, setErrForm, errForm)
		if (!inputsAreValid) {
				// enviar datos a la BD
		}
	}

	return (
		<div className="container col-5 align-middle position-static">
			<div className="card shadow m-3">
				<div className="card-body">
				 	<h1 className="card-title">Registro | Empleador</h1><br />
			      <form className="px-4 py-3">
			        {inputs.map((input) => (
			          <FormInput
			            key={input.id}
			            {...input}
			            value={formData[input.name]}
			            boolError={errForm[input.name]}
			            onChange={setForm}
			          />
			        ))}
		      	</form>
		      	<div>
		      		<button onClick={atrasClick} className="btn col-3 btn-secondary ">Atras</button>
		      		<button onClick={nextClick} className="btn col-4 btn-primary ">Submit	</button>
		      	</div>
		      </div>
		  </div>
		</div>
	);
};