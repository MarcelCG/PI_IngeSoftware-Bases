import React from "react";
import { useForm } from "react-hook-form";
import "./AddPolicy.css"

function AddPolicy() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleCancel = () => {
    console.log("Formulario cancelado");
  };

  const errorMessages = {
    required: "Este campo es obligatorio",
  };

  const validationPatterns = {
    period: {
      pattern: {
        value:  /^[1-9]\d*$/,
        message: "El periodo debe ser un valor númerico mayor a 0"
      },
    },
    phone: {
      pattern: {
        value: /^[0-9]{8}$/i,
        message: "Debes introducir un número de teléfono válido",
      },
    },
  };

  return (
    <div className="formulario">
        <h1 className="titulo">Agregar Política</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="etiqueta" htmlFor="name">Titulo: </label>
        <input className={`campo ${errors.name ? "campoError" : ""}`}
          {...register("name", {
            required: errorMessages.required,
          })}
          name="name"
          type="text"
        />
        {errors.name && <span className="mensjError">{errors.name.message}</span>}

        <label className="etiqueta" htmlFor="startDate">Fecha de Inicio: </label>
        <input className={`campo ${errors.startDate ? "campoError" : ""}`}
          {...register("startDate", {
            required: errorMessages.required,
          })}
          name="startDate"
          type="date"
        />
        {errors.startDate && <span className="mensjError">{errors.startDate.message}</span>}


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
          />
          {errors.period && <span className="mensjError">{errors.period.message}</span>}

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

        <label className="etiqueta" htmlFor="phone">Número de Teléfono: </label>
        <input className={`campo ${errors.phone ? "campoError" : ""}`}
          {...register("phone", {
            required: errorMessages.required,
            ...validationPatterns.phone,
          })}
          name="phone"
          type="tel"
        />
        {errors.phone && <span className="mensjError">{errors.phone.message}</span>}

        <section className="botones">
            <input className="cancelar" type="button" value="Cancelar" onClick={handleCancel}/>
            <input className="agregar" type="submit" value="Agregar"/>
        </section>
      </form>
    </div>
  );
}

export default AddPolicy;
