import React, {useState} from "react";
import { useForm } from "react-hook-form";
import "./AddPolicy.css"

function AddPolicy() {

  // Configuración del formulario usando react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Función que se ejecuta al enviar el formulario
  const onSubmit = (data) => {
    console.log(data);
  };

  // Estado del checkbox
  const [disableStartDate, setDisableStartDate] = useState(false); // Estado del checkbox

  const handleCancel = () => {
    console.log("Formulario cancelado");
  };

  const errorMessages = {
    required: "Este campo es obligatorio",
  };

  const validationPatterns = {
    number: {
      pattern: {
        value:  /^[1-9]\d*$/,
        message: "Este campo debe ser un valor númerico mayor a 0"
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

        {/* Campo de fecha de vencimiento */}
        <label className="etiqueta" htmlFor="dueDate">Fecha de Vencimiento: </label>
        <input className={`campo ${errors.startDate ? "campoError" : ""}`}
          {...register("dueDate", {
            required: errorMessages.re,
          })}
          name="dueDate"
          type="date"
        />
        {errors.startDate && <span className="mensjError">{errorMessages.required}</span>}

        {/* Checkbox para "Rige a partir del contrato" */}
        <section className="checkbox">
          <input
            {...register("startFromContract")}
            type="checkbox" 
            checked={disableStartDate} 
            onChange={(e) => setDisableStartDate(e.target.checked)}
          />

          <label>Rige a partir del contrato</label>
        </section>

        {/* Campo de período*/}
        <label className="etiqueta" htmlFor="period">Periodo: </label>
        <section className="campoDrop">
          <input className={`campo ${errors.number ? "campoError" : ""}`}
            {...register("period", {
              required: errorMessages.required,
              ...validationPatterns.number,
            })}
            name="period"
            type="number"
            min={1}
          />
          {errors.number && <span className="mensjError">{errors.number.message}</span>}

          <select className="drop"
            {...register("periodUnit")}
          >
            <option value="horas">Horas</option>
            <option value="días">Días</option>
            <option value="semanas">Semanas</option>
            <option value="meses">Meses</option>
            <option value="años">Años</option>
          </select>
        </section>

        {/*Campo para la unidad*/}
        <label className="etiqueta" htmlFor="amount">Unidad: </label>
        <section className="campoDrop">
          <input className={`campo ${errors.number ? "campoError" : ""}`}
            {...register("amount", {
              required: errorMessages.required,
              ...validationPatterns.number,
            })}
            name="amount"
            type="number"
            min={1}
          />
          {errors.number && <span className="mensjError">{errors.number.message}</span>}

          <select className="drop"
            {...register("amountUnit")}
          >
            <option value="horas">Horas</option>
            <option value="días">Días</option>
            <option value="semanas">Semanas</option>
            <option value="meses">Meses</option>
            <option value="años">Años</option>
          </select>
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
