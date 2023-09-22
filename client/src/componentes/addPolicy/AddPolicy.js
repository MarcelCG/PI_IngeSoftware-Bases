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
    email: {
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Debes introducir una dirección de correo válida",
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
        <label className="etiqueta" htmlFor="name">Nombre: </label>
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

        <label className="etiqueta" htmlFor="email">Correo Electrónico: </label>
        <input className={`campo ${errors.email ? "campoError" : ""}`}
          {...register("email", {
            required: errorMessages.required,
            ...validationPatterns.email,
          })}
          name="email"
          type="email"
        />
        {errors.email && <span className="mensjError">{errors.email.message}</span>}

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
