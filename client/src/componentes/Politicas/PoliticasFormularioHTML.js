import React, { Component } from "react";

class PoliticasFormularioHTML extends Component {
    render () {
        const {
            onSubmit,
            handleCancel,
            setDisableStartDate,
            disableStartDate,
            disableIncremental,
            setDisableIncremental,
            clearErrors,
            errors,
            mensajesError,
            register,
            patronesValidacion,
            accion
        } = this.props;

        return (
            <div className="card-body">
              <form className='px-4 row py-3' onSubmit={onSubmit}>
    
                {/* Campo de entrada de texto para el título de la politica */}
                <div className='mt-2'>
                  <label htmlFor="titulo">Título: </label>
                  <input className={`form-control ${errors.titulo ? "is-invalid" : ""}`}
                    {...register("titulo", {
                      required: mensajesError.required,
                    })}
                    name="titulo"
                    type="text"
                    placeholder="Coloca el título de la política aquí"
                  />
                </div>
                {errors.titulo && <span className="text-danger">{errors.titulo.message}</span>}

                {/* Campo de fecha de inicio */}
                {!disableStartDate && 
                  <div>
                    <div className="mt-2">
                    <label htmlFor="fecha_inicio">Fecha de Inicio: </label>
                    <input className={`form-control ${errors.fecha_inicio ? "is-invalid" : ""}`}
                      {...register("fecha_inicio", {
                        required: !disableStartDate ? mensajesError.required : false,
                      })}
                      name="fecha_inicio"
                      type="date"
                      disabled={disableStartDate}
                    />
                    </div>
                    {errors.fecha_inicio && <span className="text-danger">{mensajesError.required}</span>}
                  </div>
                }

                {/* Checkbox para "Rige a partir del contrato" */}
                <div className="mt-1">
                  <section className="form-check">
                    <input
                      className="form-check-input"
                      {...register("inicia_desde_contrato")}
                      type="checkbox" 
                      checked={disableStartDate} 
                      onChange={(e) => {
                        setDisableStartDate(e.target.checked);
                        clearErrors("fecha_inicio");
                      }}
                    />

                    <label className="form-check-label" htmlFor="inicia_desde_contrato">
                      Rige a partir del contrato
                    </label>
                  </section>
                </div>

                {/* Campo de fecha de vencimiento */}
                <div className="mt-2">
                  <label htmlFor="fecha_final">Fecha de Vencimiento: </label>
                  <input className={`form-control ${errors.fecha_final ? "is-invalid" : ""}`}
                    {...register("fecha_final", {
                      required: mensajesError.required,
                    })}
                    name="fecha_final"
                    type="date"
                  />
                </div>
                {errors.fecha_final && <span className="text-danger">{mensajesError.required}</span>}

                {/* Campo de período*/}
                <div className="mt-2">
                  <label htmlFor="periodo">Periodo: </label>
                  <section className="form d-flex align-items-center">
                    <input className={`form-control ${errors.periodo ? "is-invalid" : ""}`}
                      {...register("periodo", {
                        required: mensajesError.required,
                        ...patronesValidacion.periodo,
                      })}
                      name="periodo"
                      type="number"
                      min={0}
                      defaultValue={0}
                    />

                    <select className="form-select"
                      {...register("unidad_periodo")}
                    >
                      <option value="1/8">Horas</option>
                      <option value="1">Días</option>
                      <option value="7">Semanas</option>
                      <option value="30">Meses</option>
                      <option value="365">Años</option>
                    </select>
                  </section>
                </div>
                {errors.periodo && <span className="text-danger">{errors.periodo.message}</span>}

                {/* Campo de incrementativo*/}
                {!disableIncremental &&
                  <div>
                    <div className="mt-2">
                      <label htmlFor="dias_a_incrementar">Incremento por Periodo: </label>
                      <section className="form d-flex align-items-center">
                        <input className={`form-control ${errors.dias_a_incrementar ? "is-invalid" : ""}`}
                          {...register("dias_a_incrementar", {
                            required: !disableIncremental ? mensajesError.required : false,
                            ...patronesValidacion.dias_a_incrementar
                          })}
                          name="dias_a_incrementar"
                          type="number"
                          disabled={disableIncremental}
                          min={0}
                          defaultValue={0}
                        />

                        <select className="form-select" disabled={disableIncremental}
                          {...register("unidad_incremento", {
                            required: !disableIncremental ? mensajesError.required : false
                          })}
                        >
                          <option value="1/8">Horas</option>
                          <option value="1">Días</option>
                          <option value="7">Semanas</option>
                          <option value="30">Meses</option>
                          <option value="365">Años</option>
                        </select>
                      </section>
                    </div>
                    {errors.dias_a_incrementar && <span className="text-danger">{errors.dias_a_incrementar.message}</span>}
                  </div>
                }

                {/* Checkbox para "Incrementativo" */}
                <div className="mt-1">
                <section className="form-check">
                  <input
                    className="form-check-input"
                    {...register("incrementativo")}
                    type="checkbox" 
                    checked={disableIncremental} 
                    onChange={(e) => {setDisableIncremental(e.target.checked); clearErrors("dias_a_incrementar");}}
                  />

                  <label className="form-check-label">No es incrementativo</label>
                </section>
                </div>

                {/*Campo para la unidad*/}
                <div className="mt-2">
                  <label htmlFor="dias_a_dar">Unidad: </label>
                  <section className="form d-flex align-items-center">
                    <input className={`form-control ${errors.dias_a_dar ? "is-invalid" : ""}`}
                      {...register("dias_a_dar", {
                        required: mensajesError.required,
                        ...patronesValidacion.dias_a_dar,
                      })}
                      name="dias_a_dar"
                      type="number"
                      min={0}
                      defaultValue={0}
                    />

                    <select className="form-select"
                      {...register("unidad_a_dar")}
                    >
                      <option value='1/8'>Horas</option>
                      <option value="1">Días</option>
                      <option value="7">Semanas</option>
                      <option value="30">Meses</option>
                      <option value="365">Años</option>
                    </select>
                  </section>
                </div>
                {errors.dias_a_dar && <span className="text-danger">{errors.dias_a_dar.message}</span>}

                {/* Checkbox para "Acumulativo" */}
                <div className="mt-2">
                  <section className="form-check">
                    <input
                      className="form-check-input"
                      {...register("acumulativo")}
                      type="checkbox" 
                    />

                    <label className="form-check-label">Es acumulativo</label>
                  </section>
                </div>

                {/*Campo para descripcion*/}
                <div className="mt-2">
                  <label>Descripción:</label>
                  <textarea className="form-control"
                    {...register("descripcion")}
                    rows={5}
                    placeholder="Puedes describir la política aquí"
                  />
                </div>

                {/* Botones de Cancelar y Agregar */}
                <div className='d-flex justify-content-end mt-3'>
                  <section className="align-items-right text-align-right float-right">
                      <input className="btn-danger me-2" type="button" value="Cancelar" onClick={handleCancel}/>
                      <input className="btn-primary" type="submit" value={accion}/>
                  </section>
                </div>
              </form>
            </div>
        )
    }
}

export default PoliticasFormularioHTML;