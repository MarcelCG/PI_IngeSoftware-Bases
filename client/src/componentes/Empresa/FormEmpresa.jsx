import React from "react";
import { useNavigate } from 'react-router-dom';
import FormInput, {handleSubmit} from '../Registro/FormInput'


export const FormEmpresa = ({ formData, setForm, errForm, setErrForm, navigation }) => {
	const navigate = useNavigate();

	const inputs = [
		{
		  id:1,
		  type:"text",
		  name:"empresaName",
		  label:"Nombre",
			placeholder:"Nombre de empresa",
			errorMessage: "Debe contener al menos 3 letras y puede incluir caracteres especiales como '&', '-', '_', o '.'",
			required: true,
			patron: /^([a-zA-Z0-9&\-_.]{3,}[a-zA-Z0-9 &\-_.]*)$/,},
		{
		  id:2,
			type:"text",
			name:"empresaCorreo1",
			label:"Correo empresarial",
			style:"col-6",
			placeholder:"correo@dominio.com",
			errorMessage: "ejemplo@dominio.com",
			required: true,
			patron: /^([a-zA-Z0-9&\-_.]+@[a-zA-Z.]+.[a-zA-Z]{2,})$/ },
		{
		  id:3,
			type:"text",
			name:"empresaCorreo2",
			label:"Opcional",
			style:"col-6",
			placeholder:"correo@dominio.com*",
			errorMessage: "ejemplo@dominio.com",
			required: false,
			patron: /^([a-zA-Z0-9&\-_.]+@[a-zA-Z.]+.[a-zA-Z]{2,})$/ },
		{
		  id:4,
			type:"text",
			name:"empresaTel1",
			label:"Telefono empresarial",
			style:"col-6",
			placeholder:"8888-8888",
			errorMessage:"Ejemplo: 1234-5678",
			required: true,
			patron: /^([876][0-9]{3}-[0-9]{4})$/},
		{
		  id:5,
			type:"text",
			name:"empresaTel2",
			label:"Opcional",
			style:"col-6",
			placeholder:"8888-8888*",
			errorMessage:"1234-5678",
			required: false,
			patron: /^([876][0-9]{3}-[0-9]{4})$/ },
		{
		  id:6,
			type:"text",
			name:"empresaCedu",
			label:"Cedula juridica",
			placeholder:"0123456789",
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
				<div className="card-header titulo-ventana"><h1>Formulario | Empresa</h1></div>
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
				<div className='d-flex justify-content-end mt-3'>
					<div className='align-items-right text-align-right float-right'>
						<button onClick={() => navigate('/')} className="btn btn-secondary me-2">Cancelar</button>
						<button onClick={nextClick} className="btn-primary">Siguiente</button>
					</div>
			    </div>
			  </div>
			</div>
		</div>
	);
};