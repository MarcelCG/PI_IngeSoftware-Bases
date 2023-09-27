import React from "react";
import FormInput, {handleSubmit} from './FormInput'

export const FormEmpresa = ({ formData, setForm, errForm, setErrForm, navigation }) => {

	const inputs = [
		{
		  id:1,
		  type:"text",
		  name:"empresaName",
			placeholder:"Nombre de empresa",
			errorMessage: "min. 3 letras, solo se permiten '&','-','_','.' y espacios",
			required: true,
			patron: /^([a-zA-Z0-9&\-_.]{3,}[a-zA-Z0-9 &\-_.]*)$/,},
		{
		  id:2,
			type:"text",
			name:"empresaCorreo",
			placeholder:"Email empresarial",
			errorMessage: "ejemplo@dominio.com",
			required: true,
			patron: /^([a-zA-Z0-9&\-_.]+@[a-zA-Z.]+.[a-zA-Z]{2,})$/ },
		{
		  id:3,
			type:"text",
			name:"empresaCorreo2",
			placeholder:"Email *opcional",
			errorMessage: "ejemplo@dominio.com",
			required: false,
			patron: /^([a-zA-Z0-9&\-_.]+@[a-zA-Z.]+.[a-zA-Z]{2,})$/ },
		{
		  id:4,
			type:"text",
			name:"empresaTel",
			placeholder:"Numero de telefono",
			errorMessage:"1234-5678",
			required: true,
			patron: /^([876][0-9]{3}-[0-9]{4})$/},
		{
		  id:5,
			type:"text",
			name:"empresaTel2",
			placeholder:"Numero de telefono *opcional",
			errorMessage:"1234-5678",
			required: false,
			patron: /^([876][0-9]{3}-[0-9]{4})$/ },
		{
		  id:6,
			type:"text",
			name:"empresaCedu",
			placeholder:"Cedula juridica de la empresa",
			errorMessage:"Solo numeros, 10 digitos",
			required: true,
			patron: /^([0-9]{10})$/},
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
					  <form className="px-4 py-3">
						  {inputs.map((input) => (
						  <FormInput
					      key={input.id}
					      {...input}
					      value={formData[input.name]}
					      boolError={errForm[input.name]}
						    onChange={setForm}
						  />))}
				    </form>
			    <button onClick={nextClick} className="text-right btn col-3 btn-primary">next</button>
			  </div>
			</div>
		</div>
	);
};