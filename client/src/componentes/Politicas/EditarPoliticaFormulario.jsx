import React, { Component } from "react";

class EditarPoliticaFormulario extends Component {
  render() {
    const {
      onSubmit,
      cancelarFormulario,
      setDisableStartDate,
      disableStartDate,
      disableIncremental,
      setDisableIncremental,
      clearErrors,
      errors,
      register,
      validationPatterns,
      datosPolitica, // Los datos previos de la política
    } = this.props;
        // Se asegura de que datosPolitica esté definida
        if (!datosPolitica) {
          return <p>Cargando...</p>;
        }

    return (
      <form onSubmit={onSubmit}>
        {/* Campo de entrada de texto para el título de la política */}
        <label className="etiqueta" htmlFor="titulo">
          Título:
        </label>
        <input
          className={`campo ${errors.titulo ? "campoError" : ""}`}
          {...register("titulo", {
            required: "Este campo es obligatorio",
          })}
          name="titulo"
          type="text"
          placeholder="Coloca el título de la política aquí"
          defaultValue={datosPolitica.titulo} // Rellenar con el dato previo
        />
        {errors.titulo && (
          <span className="mensjError">{errors.titulo.message}</span>
        )}

        {/* Campo de fecha de inicio (no editable) */}
        <label className="etiqueta" htmlFor="fecha_inicio">
          Fecha de Inicio:
        </label>
        <input
          className={`campo ${errors.fecha_inicio ? "campoError" : ""}`}
          {...register("fecha_inicio")}
          name="fecha_inicio"
          type="date"
          disabled={true} // No editable
          defaultValue={datosPolitica.fecha_inicio} // Rellenar con el dato previo
        />

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
        <label className="etiqueta" htmlFor="fecha_final">
          Fecha de Vencimiento:
        </label>
        <input
          className={`campo ${errors.fecha_final ? "campoError" : ""}`}
          {...register("fecha_final", {
            required: "Este campo es obligatorio",
          })}
          name="fecha_final"
          type="date"
          defaultValue={datosPolitica.fecha_final} // Rellenar con el dato previo
        />
        {errors.fecha_final && (
          <span className="mensjError">{errors.fecha_final.message}</span>
        )}

        {/* Campo de período */}
        <label className="etiqueta" htmlFor="periodo">
          Periodo:
        </label>
        <section className="campoDrop">
          <input
            className={`campo ${errors.periodo ? "campoError" : ""}`}
            {...register("periodo", {
              required: "Este campo es obligatorio",
              ...validationPatterns.periodo,
            })}
            name="periodo"
            type="number"
            min={0}
            defaultValue={datosPolitica.periodo} // Rellenar con el dato previo
          />

          <select {...register("periodUnit")}>
            <option value="1/24">Horas</option>
            <option value="1">Días</option>
            <option value="7">Semanas</option>
            <option value="30">Meses</option>
            <option value="365">Años</option>
          </select>

          {errors.periodo && (
            <span className="mensjError">{errors.periodo.message}</span>
          )}
        </section>

        {/* Campo de incrementativo */}
        <label className="etiqueta" htmlFor="dias_a_incrementar">
          Incremento por Periodo:
        </label>
        <section className="campoDrop">
          <input
            className={`campo ${errors.dias_a_incrementar ? "campoError" : ""}`}
            {...register("dias_a_incrementar", {
              required: !disableIncremental
                ? "Este campo es obligatorio"
                : false,
              ...validationPatterns.dias_a_incrementar,
            })}
            name="dias_a_incrementar"
            type="number"
            disabled={disableIncremental}
            min={0}
            defaultValue={datosPolitica.dias_a_incrementar} // Rellenar con el dato previo
          />

          <select className="drop" disabled={disableIncremental}>
            <option value="1/24">Horas</option>
            <option value="1">Días</option>
            <option value="7">Semanas</option>
            <option value="30">Meses</option>
            <option value="365">Años</option>
          </select>
          {errors.dias_a_incrementar && (
            <span className="mensjError">
              {errors.dias_a_incrementar.message}
            </span>
          )}
        </section>

        {/* Checkbox para "Incrementativo" */}
        <section className="checkbox">
          <input
            {...register("incrementativo")}
            type="checkbox"
            checked={disableIncremental}
            onChange={(e) => {
              setDisableIncremental(e.target.checked);
              clearErrors("dias_a_incrementar");
            }}
          />

          <label>No es incrementativo</label>
        </section>

        {/* Campo para la unidad */}
        <label className="etiqueta" htmlFor="dias_a_dar">
          Unidad:
        </label>
        <section className="campoDrop">
          <input
            className={`campo ${errors.dias_a_dar ? "campoError" : ""}`}
            {...register("dias_a_dar", {
              required: "Este campo es obligatorio",
              ...validationPatterns.dias_a_dar,
            })}
            name="dias_a_dar"
            type="number"
            min={0}
            defaultValue={datosPolitica.dias_a_dar} // Rellenar con el dato previo
          />

          <select {...register("dias_a_darUnit")}>
            <option value="1/24">Horas</option>
            <option value="1">Días</option>
            <option value="7">Semanas</option>
            <option value="30">Meses</option>
            <option value="365">Años</option>
          </select>
          {errors.dias_a_dar && (
            <span className="mensjError">{errors.dias_a_dar.message}</span>
          )}
        </section>

        {/* Checkbox para "Acumulativo" */}
        <section className="cumulative">
          <input {...register("acumulativo")} type="checkbox" />

          <label>Es acumulativo</label>
        </section>

        {/* Campo para descripción */}
        <label className="etiqueta">Descripción:</label>
        <textarea
          className="campo"
          {...register("descripcion")}
          rows={5}
          placeholder="Puede describir la política aquí"
          defaultValue={datosPolitica.descripcion} // Rellenar con el dato previo
        />

        /* Botones de Cancelar y Guardar */
        <section className="botones">
          <input
            className="cancelar"
            type="button"
            value="Cancelar"
            onClick={cancelarFormulario}
          />
          <input className="guardar" type="submit" value="Guardar" />
        </section>
      </form>
    );
  }
}

export default EditarPoliticaFormulario;
