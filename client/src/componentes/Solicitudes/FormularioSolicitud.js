import React, {useState, useEffect} from "react";


export const FormularioSolicitud = (props) => {
	const {
	libresPorPolitica,
	errors,
	errorMessages,
	register,
	handleSubmit,
	} = props;

	const solicitar2Horas = ["08:00", "08:30", "09:00", "09:30",
							"10:00", "10:30", "11:00", "11:30",
							"12:00", "12:30", "13:00", "13:30",
							"14:00", "14:30", "15:00",];
	const solicitar4Horas = ["08:00", "08:30", "09:00", "09:30",
							"10:00", "10:30", "11:00", "11:30",
							"12:00", "12:30", "13:00"]

	const [diasDisponibles, setDiasDisponibles] =
	useState(libresPorPolitica[0]);

	const cambiarDiasDisponibles = (politicaSeleccionada) => {
		let politicaEncontrada = libresPorPolitica.find(
			(politica) => politica.titulo_politica === politicaSeleccionada
		)
		setDiasDisponibles(politicaEncontrada)
	}

	useEffect(() => {
		setDiasDisponibles(libresPorPolitica[0]);
	}, [libresPorPolitica]);

	const [listaHorasMostrar, setListaHorasMostrar] = useState(2);
	const cambioLista = (e) => {
		setListaHorasMostrar(parseInt(e.target.value, 10));
	}

	const [elegirHoras, setHorasElegir] = useState(false);
	const mostrarEleccionHoras = (e) => {
		setHorasElegir(e.target.checked);
	}

	const [solicitud1Dia, setSolicitud1Dia] = useState(false);
	const manejarSolicitud1Dia = (e) => {
		if (parseInt(e.target.value, 10) === 1) {
			setSolicitud1Dia(true);
		} else {
			setSolicitud1Dia(false);
			setHorasElegir(false);
		}
	}

    return (
		<div className="card-body">
			<form className='px-4 row py-3'>
            	<div className='mt-2 form d-flex justify-content-between'>
              		<div className="col-8">
						<label htmlFor="titulo">Seleccione la Politica: </label>
						<select className="form-select" onChange={(e) =>
							 cambiarDiasDisponibles(e.target.value)}
							 >
							{
							libresPorPolitica.map((politica, index) => (
								<option key={index}>
									{politica.titulo_politica}
								</option>  
							))}
						</select>
              		</div>
					<div className="col-3">
						<div>	
							<label htmlFor="dias_disponibles">Dias Disponibles: </label>
						</div>
						<div className="col-12">
							<span className="form-control">
								{diasDisponibles ?
								diasDisponibles.dias_libres_disponibles : ''}
							</span>
						</div>
					</div>
            	</div>
				<div className='mt-2 form d-flex justify-content-between'>
					<div className="col-8">
						<label htmlFor="fecha_inicio">Fecha de Inicio: </label>
						<input className={`form-control`} type="date"/>
					</div>
					<div className="ms-4 col-3">
						<label htmlFor="dias_solicitados">Dias a Solicitar: </label>
						<div className="col-12">
							<input className="form-control" type="number"
							 onChange={manejarSolicitud1Dia}>
							</input>
						</div>
					</div>
				</div>
				<div className="mt-2">
					<label htmlFor="fecha_final">Fecha Final: </label>
					<input readOnly className={`form-control type="date"`}/>
				</div>
				{ solicitud1Dia &&
				<div className="mt-2">
					<section className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							checked={elegirHoras}
							onChange={mostrarEleccionHoras}
						/>
						<label className="form-check-label" htmlFor="inicia_desde_contrato">
							Quiero solicitar por horas
						</label>
					</section>
				</div>
				}
				{ solicitud1Dia && elegirHoras &&
				<div className='mt-2 form d-flex justify-content-between'>
					<div className="col-8">
						<label htmlFor="titulo">Hora de Inicio: </label>
						<select className="form-select">
							{listaHorasMostrar === 2 && 
								(solicitar2Horas.map((hora, index) => (
								<option key={index}>
									{hora}
								</option>)  
								))
							}
							{listaHorasMostrar === 4 && 
								(solicitar4Horas.map((hora, index) => (
								<option key={index}>
									{hora}
								</option>)  
								))
							}
						</select>
					</div>
					<div className="">
						<div>	
							<label htmlFor="dias_disponibles">Horas a Solicitar: </label>
						</div>
						<div className="">
							<select className="form-control" onChange={cambioLista}>
								<option>2</option>
								<option>4</option>
							</select>
						</div>
					</div>
				</div>
				}
				<div className="mt-2">
					<label htmlFor="comentarios">Comentarios: </label>
					<textarea className="form-control"></textarea>
				</div>
				<div className='d-flex justify-content-end mt-3'>
                  <section className="align-items-right text-align-right float-right">
                      <input className="btn-danger me-2" type="button" value="Cancelar" />
                      <input className="btn-primary" type="submit" value="Agregar"/>
                  </section>
                </div>
          </form>
        </div>
    )
}
