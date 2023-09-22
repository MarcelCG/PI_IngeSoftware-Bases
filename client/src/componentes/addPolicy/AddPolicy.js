import React from "react";
import { useForm } from "react-hook-form";

function AddPolicy() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Nombre completo</label>
        <input
          {...register("name", {
            required: "Este campo es obligatorio",
          })}
          name="name"
          type="text"
        />
        {errors.name && <span>{errors.name.message}</span>}

        <label htmlFor="startDate">Fecha de Inicio</label>
        <input
          {...register("startDate", {
            required: "Este campo es obligatorio",
          })}
          name="startDate"
          type="date"
        />
        {errors.startDate && <span>{errors.startDate.message}</span>}

        <label htmlFor="email">Correo electrónico</label>
        <input
          {...register("email", {
            required: "Este campo es obligatorio",
          })}
          name="email"
          type="email"
        />
        {errors.email && <span>{errors.email.message}</span>}

        <input type="submit" />
      </form>
    </div>
  );
}

export default AddPolicy;
