import React, {useState} from "react";
import { useForm } from "react-hook-form";
import "./AddPolicy.css"

function AddPolicy() {

  // Configuración del formulario usando react-hook-form
  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm();

  // Función que se ejecuta al enviar el formulario
  const onSubmit = (data) => {
    console.log(data);
  };

  // Estado del checkbox de "Rige a partir del contrato"
  const [disableStartDate, setDisableStartDate] = useState(false);

  // Estado del checkbox de "Incrementativo"
  const [disableIncremental, setDisableIncremental] = useState(false);

  const handleCancel = () => {
    console.log("Formulario cancelado");
  };

  const errorMessages = {
    required: "Este campo es obligatorio",
  };

  const validationPatterns = {
    periodo: {
      pattern: {
        value: /^[1-9]\d*$/,
        message: "Este campo debe ser mayor a 0"
      },
    },
    horas_a_dar: {
      pattern: {
        value: /^[1-9]\d*$/,
        message: "Este campo debe ser mayor a 0"
      },
    },
    monto_a_incrementar: {
      pattern: {
        value: /^[1-9]\d*$/,
        message: "Este campo debe ser mayor a 0"
      },
    },
  };
  

  return (
    <div className="formulario">
        <h1 className="titulo">Agregar Política</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

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
            onChange={(e) => {setDisableStartDate(e.target.checked); clearErrors("fecha_inicio")}}
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
            <option value="horas">Horas</option>
            <option value="días">Días</option>
            <option value="semanas">Semanas</option>
            <option value="meses">Meses</option>
            <option value="años">Años</option>
          </select>

          {errors.periodo && <span className="mensjError">{errors.periodo.message}</span>}
        </section>

        {/* Campo de incrementativo*/}
        <label className="etiqueta" htmlFor="monto_a_incrementar">Incremento por Periodo: </label>
        <section className="campoDrop">
          <input className={`campo ${errors.monto_a_incrementar ? "campoError" : ""}`}
            {...register("monto_a_incrementar", {
              required: !disableIncremental ? errorMessages.required : false,
              ...validationPatterns.monto_a_incrementar
            })}
            name="monto_a_incrementar"
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
            <option value="horas">Horas</option>
            <option value="días">Días</option>
            <option value="semanas">Semanas</option>
            <option value="meses">Meses</option>
            <option value="años">Años</option>
          </select>
          {errors.monto_a_incrementar && <span className="mensjError">{errors.monto_a_incrementar.message}</span>}
        </section>

        {/* Checkbox para "Incrementativo" */}
        <section className="checkbox">
          <input
            {...register("incrementativo")}
            type="checkbox" 
            checked={disableIncremental} 
            onChange={(e) => {setDisableIncremental(e.target.checked); clearErrors("monto_a_incrementar");}}
          />

          <label>No es incrementativo</label>
        </section>

        {/*Campo para la unidad*/}
        <label className="etiqueta" htmlFor="horas_a_dar">Unidad: </label>
        <section className="campoDrop">
          <input className={`campo ${errors.horas_a_dar ? "campoError" : ""}`}
            {...register("horas_a_dar", {
              required: errorMessages.required,
              ...validationPatterns.horas_a_dar,
            })}
            name="horas_a_dar"
            type="number"
            min={0}
            defaultValue={0}
          />

          <select className="drop"
            {...register("horas_a_darUnit")}
          >
            <option value="horas">Horas</option>
            <option value="días">Días</option>
            <option value="semanas">Semanas</option>
            <option value="meses">Meses</option>
            <option value="años">Años</option>
          </select>
          {errors.horas_a_dar && <span className="mensjError">{errors.horas_a_dar.message}</span>}
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
    </div>
  );
}

export default AddPolicy;
