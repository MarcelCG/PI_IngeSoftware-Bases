export default function Check(){
	const ejemploFecha = new Date('2020-03-07');

	return( // style={{backgroundColor: "black"}} 
		<html className='container text-center'>
		{/*header*/}
			<div className='row' >
				<img className='col-4' alt='logo' src="/logo_oraculo.png" style={{ height: '150px', width: '400px' }} />
			</div>
			<div className='row justify-content-between'>
			<hr/>
				<div className='col-6 text-start'>
					<div style={{backgroundColor:'#243A69',color:'white'}}><b>Empleado</b></div>
					<b>Nombre completo</b><br/>Jeremy Espinoza Madrigal<br/>
					<b>Telefono</b><br/>7111-1909<br/>
					<b>Correo</b><br/>Jeremy@gmail.com<br/>
					<b>Fecha</b><br/>{ejemploFecha.toLocaleDateString()}<br/>
				</div>
				<div className='col-6 text-start'>
					<div style={{backgroundColor:'#243A69',color:'white'}}><b>Companhia</b></div>
					<b>Companhia</b><br/>Oraculo<br/>
					<b>Telefono</b><br/>2238-51-29<br/>
					<b>Correo</b><br/>Oraculo@gmail.com<br/>
				</div>
				<hr/>
				<div className='row text-start'>
					<h2>Reporte balances</h2>
					<b>Descripcion</b><br/>
					<p>Reporte de calculo de balances de empleados este mes.</p>
				</div>
			</div>
			<hr/>
			<div className='row text-start'>
				<h2>Tabla</h2>

			</div>
		</html>
	);
};

export const GenerarReporte = (props) => {
	/* header
		[ cuerpo ]
	 	footer
	*/
};

export const GenerarColumnas = (tabla) => {
	/*
	
	*/
};

export const CrearReporteBalances = (Libres) => {
	/*

	*/
};