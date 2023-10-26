import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';

export const ActualizarLibresHTML = (props) => {
	const {
		esEmpleador,
		esPrimeroDelMes,
		cargarDatos,
		cargando 
	} = props;
	return (
		<>
			{(esEmpleador && esPrimeroDelMes) && <div>
				<ToastContainer autoClose={2500}/>
				<button className="btn btn-primary btn-lg"
					onClick={cargarDatos} disabled={cargando}>
					{cargando ? ("Actualizando..."):("Actualizar libres")}
				</button >
			</div>}
		</>
	);
};
