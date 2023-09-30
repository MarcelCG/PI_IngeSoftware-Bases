import React from "react";
import FormInput, {handleSubmit, TogglePassword} from './FormInput'

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
			patron: /^([a-zA-Z ÁáÉéÍíÓóÚú]+)$/
		},

		{
		  id:2,
		  name:"empleadorApe1",
			type:"text",
			style:"col",
			placeholder:"Apellido 1",
			errorMessage: "solo letras",
			required: true,
			patron: /^([a-zA-Z ÁáÉéÍíÓóÚú]+)$/
		},
		{
		  id:3,
		  name:"empleadorApe2",
			type:"text",
			style:"col",
			placeholder:"Apellido 2",
			errorMessage: "solo letras",
			required: true,
			patron: /^([a-zA-Z ÁáÉéÍíÓóÚú]+)$/
		},
		{
		  id:4,
		  name:"empleadorCedu",
			type:"text",
			placeholder:"Cedula",
			errorMessage: "0123456789",
			required: true,
			patron: /^([0-9]{10})$/
		},
		{
		  id:5,
		  name:"empleadorCorreo1",
			type:"text",
			placeholder:"Email personal",
			errorMessage: "ejemplo@dominio.com",
			required: true,
			patron: /^([a-zA-Z0-9&\-_.]+@[a-zA-Z.]+.[a-zA-Z]{2,})$/
		},
		{
		  id:6,
		  name:"empleadorCorreo2",
			type:"text",
			placeholder:"email-opcional",
			errorMessage: "ejemplo@dominio.com",
			required: false,
			patron: /^([a-zA-Z0-9&\-_.]+@[a-zA-Z.]+.[a-zA-Z]{2,})$/
		},
		{
		  id:7,
		  name:"empleadorTel1",
			type:"tel",
			placeholder:"telefono",
			errorMessage:"1234-5678",
			required: true,
			patron: /^([87624][0-9]{3}-[0-9]{4})$/
		},
		{
		  id:8,
		  name:"empleadorTel2",
			type:"tel",
			placeholder:"telefono-opcional",
			errorMessage:"1234-5678",
			required: false,
			patron: /^([87624][0-9]{3}-[0-9]{4})$/
		},
		{
		  id:9,
		  name:"empleadorPass",
			type: inputType,
			placeholder:"password",
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
			            onChange={setForm}
			            toggle={toggle}
			          />
			        </div>
			        ))}
			        <small id="passReq" className="row form-text text-muted">
			        	contasenha requisitos:
			        	<td>8 - 20 caracteres</td>
			        	<td>al menos 1 mayuscula, 1 minuscula y 1 numero</td>
			        	<td>al menos un signo especial [ ! , @ , # , $ , % , & , _ , \ , -]</td>
			        </small>
	      	  </form>
	      	  <div className="row px-4 justify-content-between">
		      	<button onClick={() => navigation.previous()} className="btn col-3 btn-secondary ">atras</button>
		      	<button onClick={nextClick} className="btn col-3 btn-primary ">siguiente</button>
		     </div>
			  </div>
			</div>
		</div>
	);
};