import React, { Component } from "react";

class AddPolicyForm extends Component {
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
            errorMessages,
            register,
            validationPatterns 
        } = this.props;

        return (
            <form onSubmit={onSubmit}>
    
            {/* Campo de entrada de texto para el título de la politica */}
            <label className="etiqueta" htmlFor="titulo">Título: </label>
            <input className={`campo ${errors.name ? "campoError" : ""}`}
              {...register("titulo", {
                required: errorMessages.required,
              })}
              name="titulo"
              type="text"
              placeholder="Coloca el título de la política aquí"
            />
            {errors.titulo && <span className="mensjError">{errors.titulo.message}</span>}
    
            {/* Campo de fecha de inicio */}
            <label className="etiqueta" htmlFor="fecha_inicio">Fecha de Inicio: </label>
            <input className={`campo ${errors.fecha_inicio ? "campoError" : ""}`}
              {...register("fecha_inicio", {
                required: !disableStartDate ? errorMessages.required : false,
              })}
              name="fecha_inicio"
              type="date"
              disabled={disableStartDate}
            />
            {errors.fecha_inicio && <span className="mensjError">{errorMessages.required}</span>}
    
            {/* Checkbox para "Rige a partir del contrato" */}
            <section className="checkbox">
              <input
                {...register("inicia_desde_contrato")}
                type="checkbox" 
                checked={disableStartDate} 
                onChange={(e) => {
                  setDisableStartDate(e.target.checked);
                  clearErrors("fecha_inicio");
                }}
              />
    
              <label>Rige a partir del contrato</label>
            </section>
    
            {/* Campo de fecha de vencimiento */}
            <label className="etiqueta" htmlFor="fecha_final">Fecha de Vencimiento: </label>
            <input className={`campo ${errors.fecha_final ? "campoError" : ""}`}
              {...register("fecha_final", {
                required: errorMessages.required,
              })}
              name="fecha_final"
              type="date"
            />
            {errors.fecha_final && <span className="mensjError">{errorMessages.required}</span>}
    
            {/* Campo de período*/}
            <label className="etiqueta" htmlFor="periodo">Periodo: </label>
            <section className="campoDrop">
              <input className={`campo ${errors.periodo ? "campoError" : ""}`}
                {...register("periodo", {
                  required: errorMessages.required,
                  ...validationPatterns.periodo,
                })}
                name="periodo"
                type="number"
                min={0}
                defaultValue={0}
              />
    
              <select className="drop"
                {...register("periodUnit")}
              >
                <option value="1/24" selected>Horas</option>
                <option value="1">Días</option>
                <option value="7">Semanas</option>
                <option value="30">Meses</option>
                <option value="365">Años</option>
              </select>
    
              {errors.periodo && <span className="mensjError">{errors.periodo.message}</span>}
            </section>
    
            {/* Campo de incrementativo*/}
            <label className="etiqueta" htmlFor="dias_a_incrementar">Incremento por Periodo: </label>
            <section className="campoDrop">
              <input className={`campo ${errors.dias_a_incrementar ? "campoError" : ""}`}
                {...register("dias_a_incrementar", {
                  required: !disableIncremental ? errorMessages.required : false,
                  ...validationPatterns.dias_a_incrementar
                })}
                name="dias_a_incrementar"
                type="number"
                disabled={disableIncremental}
                min={0}
                defaultValue={0}
              />
    
              <select className="drop" disabled={disableIncremental}
                {...register("incrementalUnit", {
                  required: !disableIncremental ? errorMessages.required : false
                })}
              >
                <option value="1/24" selected>Horas</option>
                <option value="1">Días</option>
                <option value="7">Semanas</option>
                <option value="30">Meses</option>
                <option value="365">Años</option>
              </select>
              {errors.dias_a_incrementar && <span className="mensjError">{errors.dias_a_incrementar.message}</span>}
            </section>
    
            {/* Checkbox para "Incrementativo" */}
            <section className="checkbox">
              <input
                {...register("incrementativo")}
                type="checkbox" 
                checked={disableIncremental} 
                onChange={(e) => {setDisableIncremental(e.target.checked); clearErrors("dias_a_incrementar");}}
              />
    
              <label>No es incrementativo</label>
            </section>
    
            {/*Campo para la unidad*/}
            <label className="etiqueta" htmlFor="dias_a_dar">Unidad: </label>
            <section className="campoDrop">
              <input className={`campo ${errors.dias_a_dar ? "campoError" : ""}`}
                {...register("dias_a_dar", {
                  required: errorMessages.required,
                  ...validationPatterns.dias_a_dar,
                })}
                name="dias_a_dar"
                type="number"
                min={0}
                defaultValue={0}
              />
    
              <select className="drop"
                {...register("dias_a_darUnit")}
              >
                <option value='1/24' selected>Horas</option>
                <option value="1">Días</option>
                <option value="7">Semanas</option>
                <option value="30">Meses</option>
                <option value="365">Años</option>
              </select>
              {errors.dias_a_dar && <span className="mensjError">{errors.dias_a_dar.message}</span>}
            </section>
    
            {/* Checkbox para "Acumulativo" */}
            <section className="cumulative">
              <input
                {...register("acumulativo")}
                type="checkbox" 
              />
    
              <label>Es acumulativo</label>
            </section>
    
            {/*Campo para descripcion*/}
            <label className="etiqueta">Descripción:</label>
            <textarea className="campo"
              {...register("descripcion")}
              rows={5}
              placeholder="Puedes describir la política aquí"
            />
    
            {/* Botones de Cancelar y Agregar */}
            <section className="botones">
                <input className="cancelar" type="button" value="Cancelar" onClick={handleCancel}/>
                <input className="agregar" type="submit" value="Agregar"/>
            </section>
          </form>
        )
    }
}

export default AddPolicyForm;