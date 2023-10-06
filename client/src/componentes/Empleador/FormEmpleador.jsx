import React from "react";
import FormInput, {handleSubmit, TogglePassword} from '../Registro/FormInput'

export const FormEmpleador = ({ formData, setForm, errForm, setErrForm, navigation }) => {

	const [inputType, toggle] = TogglePassword();

	const inputs = [
		{
		 	id:1,
		 	name:"empleadorName",
			type:"text",
			style:"col-4",
			label:"Nombre",
			placeholder:"Nombre",
			errorMessage: "Solo se permiten letras",
			required: true,
			patron: /^([a-zA-ZÁáÉéÍíÓóÚú]+[a-zA-ZÁáÉéÍíÓóÚú ]*)$/
		},

		{
		  id:2,
		  name:"empleadorApe1",
			type:"text",
			style:"col-4",
			label:"Primer apellido",
			placeholder:"Primer apellido",
			errorMessage: "Solo se permiten letras",
			required: true,
			patron: /^([a-zA-ZÁáÉéÍíÓóÚú]+[a-zA-ZÁáÉéÍíÓóÚú ]*)$/
		},
		{
		  id:3,
		  name:"empleadorApe2",
			type:"text",
			style:"col-4",
			label:"Segundo apellido",
			placeholder:"Segundo apellido",
			errorMessage: "Solo se permiten letras",
			required: true,
			patron: /^([a-zA-ZÁáÉéÍíÓóÚú]+[a-zA-ZÁáÉéÍíÓóÚú ]*)$/
		},
		{
		  id:4,
		  name:"empleadorCedu",
			type:"text",
			placeholder:"1-2345-6789",
			label:"Cedula de identidad",
			errorMessage: "Ejemplo: 1-2345-6789",
			required: true,
			patron: /^([1-9]-[0-9]{4}-[0-9]{4})$/
		},
		{
		  id:5,
		  name:"empleadorCorreo1",
			type:"text",
			style:"col-6",
			label:"Correo personal",
			placeholder:"correo@dominio.com",
			errorMessage: "Ejemplo: correo@dominio.com",
			required: true,
			patron: /^([a-zA-Z0-9&-_.]+@[a-zA-Z.]+.[a-zA-Z]{2,})$/
		},
		{
		  id:6,
		  name:"empleadorCorreo2",
			type:"text",
			style:"col-6",
			label:"Opcional",
			placeholder:"correo@dominio.com*",
			errorMessage: "Ejemplo: correo@dominio.com",
			required: false,
			patron: /^([a-zA-Z0-9&\-_.]+@[a-zA-Z.]+.[a-zA-Z]{2,})$/
		},
		{
		  id:7,
		  name:"empleadorTel1",
			type:"tel",
			label:"Telefono personal",
			style:"col-6",
			placeholder:"8888-8888",
			errorMessage:"Ejemplo: 1234-5678",
			required: true,
			patron: /^([87624][0-9]{3}-[0-9]{4})$/
		},
		{
		  id:8,
		  name:"empleadorTel2",
			type:"tel",
			label:"Opcional",
			style:"col-6",
			placeholder:"8888-8888*",
			errorMessage:"Ejemplo: 1234-5678",
			required: false,
			patron: /^([87624][0-9]{3}-[0-9]{4})$/
		},
		{
		  id:9,
		  name:"empleadorPass",
			type: inputType,
			label:"Contraseña",
			placeholder:"*********",
			errorMessage:"No cumple con los requisitos",
			required: true,
			isPassword:true,
			patron: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%&_\\-]).{8,20}$/ }
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
				<div className="card-header"><h1>Formulario | Empleador</h1></div>
					<div className="card-body">
			      <form className="px-4 row py-3">
			        {inputs.map((input) => (
			        <div className={input.style} key={input.id}>
				        <FormInput
			            {...input}
			            value={formData[input.name]}
			            boolError={errForm[input.name]}
			            onChange={(e) => setForm({ ...formData, [input.name]: e.target.value })}
			            toggle={toggle}
			          />
			        </div>
			        ))}
			        <small id="passReq" className="row form-text text-muted">
					  contraseña requisitos:
					  <div>8 - 20 caracteres</div>
					  <div>Al menos 1 mayúscula, 1 minúscula y 1 número</div>
					  <div>Al menos 1 signo especial [ ! , @ , # , $ , % , & , _ , \ , - ]</div>
					</small>
	      	  </form>
	      	  <div className="row px-4 justify-content-between">
		      	<button onClick={() => navigation.previous()} className="btn col-3 btn-secondary">atras</button>
		      	<button onClick={nextClick} className="btn col-3 btn-primary">siguiente</button>
		     </div>
			  </div>
			</div>
		</div>
	);
};