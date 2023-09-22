import React from "react";
import { useForm } from "react-hook-form";

function AddPolicy() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
        value: /^[0-9]{10}$/i,
        message: "Debes introducir un número de teléfono válido",
      },
    },
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Nombre: </label>
        <input
          {...register("name", {
            required: errorMessages.required,
          })}
          name="name"
          type="text"
        />
        {errors.name && <span>{errors.name.message}</span>}

        <label htmlFor="startDate">Fecha de Inicio: </label>
        <input
          {...register("startDate", {
            required: errorMessages.required,
          })}
          name="startDate"
          type="date"
        />
        {errors.startDate && <span>{errors.startDate.message}</span>}

        <label htmlFor="email">Correo Electrónico: </label>
        <input
          {...register("email", {
            required: errorMessages.required,
            ...validationPatterns.email,
          })}
          name="email"
          type="email"
        />
        {errors.email && <span>{errors.email.message}</span>}

        <label htmlFor="phone">Número de Teléfono: </label>
        <input
          {...register("phone", {
            required: errorMessages.required,
            ...validationPatterns.phone,
          })}
          name="phone"
          type="tel"
        />
        {errors.phone && <span>{errors.phone.message}</span>}

        <input type="submit" />
      </form>
    </div>
  );
}

export default AddPolicy;
