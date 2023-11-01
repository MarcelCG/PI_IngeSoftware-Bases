import React from 'react'

export const BorrarEmpresaBody = ({datosEmpresa, borrar, alternarModal}) => {
	return(
		<div>
			<p>Esta seguro que desea borrar la empresa: <br/>"<strong>{datosEmpresa.nombre||""}</strong>" ?</p>
			<b>Esta accion es irreversible.</b><br/>
			<p>- Se le notificara a todos los empleados que la empresa ha sido eliminada.
			</p>
		</div>
	);
};

export const BorrarEmpresaFooter = ({datosEmpresa, borrar, alternarModal}) => {
	return(
		<div className="container">
			<div className='row justify-content-around'>
				<button className="btn btn-secondary col-4">Atras</button>
				<button className="btn btn-secondary col-4" onClick={borrar}>Siguiente</button>
			</div>
		</div>
	);
};