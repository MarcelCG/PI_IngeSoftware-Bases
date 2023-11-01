import React, {useState, useEffect} from "react";

export const FormularioSolicitud = (props) => {
	const {
		libresPorPolitica,
		handleCancel,
		register,
		onSubmit,
		errors
	} = props;

	const solicitar2Horas = ["08:00", "08:30", "09:00", "09:30",
							"10:00", "10:30", "11:00", "11:30",
							"12:00", "12:30", "13:00", "13:30",
							"14:00", "14:30", "15:00",];
	const solicitar4Horas = ["08:00", "08:30", "09:00", "09:30",
							"10:00", "10:30", "11:00", "11:30",
							"12:00", "12:30", "13:00"]

	const [diasDisponibles, setDiasDisponibles] =
	useState(0);

	const cambiarDiasDisponibles = (e) => {
		let politicaSeleccionada = e.target.value;
		let politicaEncontrada = libresPorPolitica.find(
			(politica) => politica.titulo_politica === politicaSeleccionada
		)
		setDiasDisponibles(politicaEncontrada)
	}

	useEffect(() => {
		setDiasDisponibles();
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
			<form className='px-4 row py-3' onSubmit={onSubmit}>
            	<div className='mt-2 form d-flex justify-content-between'>
              		<div className="col-8">
						<label htmlFor="politica">Seleccione la Politica: </label>
						<select className={`form-select ${errors.politica ? ' is-invalid' : ''}`}
							 {...register("politica", {
								validate: (value) => {
									return (value !== "Seleccione" ||
									"Seleccione una politica")
								}
							 })}
							 onChange={cambiarDiasDisponibles}
							 >
							<option selected disabled>Seleccione</option>
							{
							libresPorPolitica.map((politica, index) => (
								<option key={index}
								 value={politica.titulo_politica}>
									{politica.titulo_politica}
								</option>  
							))}
						</select>
						{ errors.politica && <span className="text-danger">
							{errors.politica.message}</span>}
              		</div>
					<div className="col-4 d-flex justify-content-end">
						<div className="col-11">
							<div className="col-12">	
								<label htmlFor="dias_libres_disponibles">
									Dias Disponibles: </label>
							</div>
							<div className="col-12">
								<span className="form-control"
									{...register("dias_libres_disponibles")}>
									{diasDisponibles ?
									diasDisponibles.dias_libres_disponibles : 0}
								</span>
							</div>
						</div>
					</div>
            	</div>
				<div className='mt-2 form d-flex justify-content-between'>
					<div className="col-8">
						<label htmlFor="fecha_inicio">Fecha de Inicio: </label>
						<input className={`form-control ${errors.fecha_inicio ?
							' is-invalid' : ''}`} {...register("fecha_inicio", {
								required: true,
								message: "La fecha de inicio es requerida"
							})}
						 type="date"/>
						 { errors.fecha_inicio && <span className="text-danger">
							Fecha de Inicio requerida</span>}
					</div>
					<div className="col-4 d-flex justify-content-end">
						<div className="col-11">
							<label htmlFor="dias_solicitados">Dias a Solicitar: </label>
							<div className="col-12">
								<input type="text"
								 className={`form-control ${errors.dias_solicitados ? ' is-invalid' : ''}`}
								{...register("dias_solicitados", {
									pattern: {
										value: /^[1-9]\d*$/,
										message: "Numero Invalido"
									},
									validate: (value) => {
										return (value <= (diasDisponibles ?
											diasDisponibles.dias_libres_disponibles : 0) ||
										"Vacaciones no disponibles")
									}
								})}
								onChange={manejarSolicitud1Dia}
								defaultValue={0}
								/>
								{ errors.dias_solicitados && <span className="text-danger">
									{errors.dias_solicitados.message}</span>}
							</div>
						</div>
					</div>
				</div>
				{ solicitud1Dia &&
				<div className="mt-2">
					<section className="form-check">
						<input type="checkbox"
							className="form-check-input"
							{...register("ajustarHoras")}
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
						<label htmlFor="hora_inicio">Hora de Inicio: </label>
						<select className="form-select"
							{...register("hora_inicio")}>
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
					<div className="col-4 d-flex justify-content-end">	
						<div className="col-11">
							<label htmlFor="horas_solicitadas">
								Horas a Solicitar: </label>
							<div className="col-12">
								<select className="form-select"
								{...register("horas_solicitadas")}
								onChange={cambioLista}>
									<option>2</option>
									<option>4</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				}
				<div className="mt-2">
					<label htmlFor="comentarios">Comentarios: </label>
					<textarea className="form-control"
						{...register("comentarios")}></textarea>
				</div>
				<div className='d-flex justify-content-end mt-3'>
                  <section className="align-items-right text-align-right float-right">
                      <input className="btn-danger me-2" type="button" value="Cancelar" onClick={handleCancel}/>
                      <input className="btn-primary" type="submit" value="Agregar"/>
                  </section>
                </div>
          </form>
        </div>
    )
}

export default FormularioSolicitud;