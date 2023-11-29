import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PDFDownloadLink } from "@react-pdf/renderer"
import ReportePDF  from "../Reportes/ReportePDF"

export const ActualizarLibresHTML = (props) => {
	const {
		esEmpleador,
		esPrimeroDelMes,
		cargarDatos,
		cargando,
		botonRef
	} = props;

	return (
		<>
			{(esEmpleador && esPrimeroDelMes) && <div>
				<ToastContainer autoClose={2500}/>
				<PDFDownloadLink document={<ReportePDF {...props} />} fileName='ReporteBalances.pdf'>
					<button className="btn btn-primary btn-lg"
						onClick={cargarDatos} disabled={cargando}>
						{cargando ? ("Actualizando..."):("Actualizar libres")}
					</button >
				</PDFDownloadLink>
			</div>}
		</>
	);
};
