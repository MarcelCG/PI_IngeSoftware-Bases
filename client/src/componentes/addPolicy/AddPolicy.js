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
    period: {
      pattern: {
        value: /^[1-9]\d*$/,
        message: "Este campo debe ser mayor a 0"
      },
    },
    amount: {
      pattern: {
        value: /^[1-9]\d*$/,
        message: "Este campo debe ser mayor a 0"
      },
    },
    incrementalAmount: {
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
        <label className="etiqueta" htmlFor="name">Titulo: </label>
        <input className={`campo ${errors.name ? "campoError" : ""}`}
          {...register("name", {
            required: errorMessages.required,
          })}
          name="name"
          type="text"
        />
        {errors.name && <span className="mensjError">{errors.name.message}</span>}

        {/* Campo de fecha de inicio */}
        <label className="etiqueta" htmlFor="startDate">Fecha de Inicio: </label>
        <input className={`campo ${errors.startDate ? "campoError" : ""}`}
          {...register("startDate", {
            required: !disableStartDate ? errorMessages.required : false,
          })}
          name="startDate"
          type="date"
          disabled={disableStartDate}
        />
        {errors.startDate && <span className="mensjError">{errorMessages.required}</span>}

        {/* Checkbox para "Rige a partir del contrato" */}
        <section className="checkbox">
          <input
            {...register("startFromContract")}
            type="checkbox" 
            checked={disableStartDate} 
            onChange={(e) => {setDisableStartDate(e.target.checked); clearErrors("startDate")}}
          />

          <label>Rige a partir del contrato</label>
        </section>

        {/* Campo de fecha de vencimiento */}
        <label className="etiqueta" htmlFor="dueDate">Fecha de Vencimiento: </label>
        <input className={`campo ${errors.dueDate ? "campoError" : ""}`}
          {...register("dueDate", {
            required: errorMessages.re,
          })}
          name="dueDate"
          type="date"
        />
        {errors.dueDate && <span className="mensjError">{errorMessages.required}</span>}

        {/* Campo de período*/}
        <label className="etiqueta" htmlFor="period">Periodo: </label>
        <section className="campoDrop">
          <input className={`campo ${errors.period ? "campoError" : ""}`}
            {...register("period", {
              required: errorMessages.required,
              ...validationPatterns.period,
            })}
            name="period"
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

          {errors.period && <span className="mensjError">{errors.period.message}</span>}
        </section>

        {/*Campo para la unidad*/}
        <label className="etiqueta" htmlFor="amount">Unidad: </label>
        <section className="campoDrop">
          <input className={`campo ${errors.amount ? "campoError" : ""}`}
            {...register("amount", {
              required: errorMessages.required,
              ...validationPatterns.amount,
            })}
            name="amount"
            type="number"
            min={0}
            defaultValue={0}
          />

          <select className="drop"
            {...register("amountUnit")}
          >
            <option value="horas">Horas</option>
            <option value="días">Días</option>
            <option value="semanas">Semanas</option>
            <option value="meses">Meses</option>
            <option value="años">Años</option>
          </select>
          {errors.amount && <span className="mensjError">{errors.amount.message}</span>}
        </section>

        {/* Campo de incrementativo*/}
        <label className="etiqueta" htmlFor="incrementalAmount">Incremento por Periodo: </label>
        <section className="campoDrop">
          <input className={`campo ${errors.incrementalAmount ? "campoError" : ""}`}
            {...register("incrementalAmount", {
              required: errorMessages.required,
              ...validationPatterns.incrementalAmount,
              required: !disableIncremental ? errorMessages.required : false
            })}
            name="incrementalAmount"
            type="number"
            disabled={disableIncremental}
            min={1}
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
          {errors.incrementalAmount && <span className="mensjError">{errors.incrementalAmount.message}</span>}
        </section>

        {/* Checkbox para "Incrementativo" */}
        <section className="checkbox">
          <input
            {...register("incremental")}
            type="checkbox" 
            checked={disableIncremental} 
            onChange={(e) => {setDisableIncremental(e.target.checked); clearErrors("incrementalAmount");}}
          />

          <label>No es incrementativo</label>
        </section>

        {/* Checkbox para "Acumulativo" */}
        <section className="cumulative">
          <label>Es acumulativo:</label>

          <input
            {...register("cumulative")}
            type="checkbox" 
          />
        </section>

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
