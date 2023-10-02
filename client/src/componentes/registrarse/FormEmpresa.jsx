import React from "react";
import FormInput, {handleSubmit} from './FormInput'

export const FormEmpresa = ({ formData, setForm, errForm, setErrForm, navigation }) => {


	const inputs = [
		{
		  id:1,
		  type:"text",
		  name:"empresaName",
			placeholder:"Nombre de empresa",
			errorMessage: "Debe contener al menos 3 letras y puede incluir caracteres especiales como '&', '-', '_', o '.'",
			required: true,
			patron: /^([a-zA-Z0-9&\-_.]{3,}[a-zA-Z0-9 &\-_.]*)$/,},
		{
		  id:2,
			type:"text",
			name:"empresaCorreo1",
			style:"col-6",
			placeholder:"Email empresarial",
			errorMessage: "ejemplo@dominio.com",
			required: true,
			patron: /^([a-zA-Z0-9&\-_.]+@[a-zA-Z.]+.[a-zA-Z]{2,})$/ },
		{
		  id:3,
			type:"text",
			name:"empresaCorreo2",
			style:"col-6",
			placeholder:"Email empresarial *",
			errorMessage: "ejemplo@dominio.com",
			required: false,
			patron: /^([a-zA-Z0-9&\-_.]+@[a-zA-Z.]+.[a-zA-Z]{2,})$/ },
		{
		  id:4,
			type:"text",
			name:"empresaTel1",
			style:"col-6",
			placeholder:"Telefono empresarial",
			errorMessage:"1234-5678",
			required: true,
			patron: /^([876][0-9]{3}-[0-9]{4})$/},
		{
		  id:5,
			type:"text",
			name:"empresaTel2",
			style:"col-6",
			placeholder:"Telefono empresarial *",
			errorMessage:"1234-5678",
			required: false,
			patron: /^([876][0-9]{3}-[0-9]{4})$/ },
		{
		  id:6,
			type:"text",
			name:"empresaCedu",
			placeholder:"Cedula juridica",
			errorMessage:"9 a 12 digitos numericos",
			required: true,
			patron: /^([0-9]{9,12})$/},
	]

	const nextClick = (e) => {
		let inputsAreValid = handleSubmit(inputs, formData, setErrForm, errForm)
		if (!inputsAreValid) {
			navigation.next();
		}
	}

	return (
		<div className="container col-5 position-static">
			<div className="card border-dark shadow m-3">
				<div className="card-header"><h1>Formulario | Empresa</h1></div>
					<div className="card-body">
					  <form className="px-4 row py-3">
						  {inputs.map((input) => (
						   <div className={input.style} key={input.id}>
							<FormInput
							    {...input}
							    value={formData[input.name]}
							    boolError={errForm[input.name]}
							    onChange={(e) => setForm({ ...formData, [input.name]: e.target.value })}
							/>
							</div>
						))}
				    </form>
				<div className="row px-4 justify-content-between">
			    	<button onClick={nextClick} className="text-right btn col-3 btn-primary">next</button>
			    </div>
			  </div>
			</div>
		</div>
	);
};