import React, { useState, useEffect } from "react";
import { editarPolitica } from "../../../../server/models/politicaModel/politicasModel";
import { useForm } from "react-hook-form";

const EditarPoliticaFormulario = ({ politica, onSave, onCancel }) => {
  const {
    titulo,
    activo,
    acumulativo,
    descripcion,
    periodo,
    fecha_inicio,
    fecha_final,
    inicia_desde_contrato,
    dias_a_dar,
    incrementativo,
    dias_a_incrementar,
  } = politica;

  // Inicializa el formulario con los datos de la política
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    // Configura los valores iniciales del formulario
    setValue("titulo", titulo);
    setValue("activo", activo);
    setValue("acumulativo", acumulativo);
    setValue("descripcion", descripcion);
    setValue("periodo", periodo);
    setValue("fecha_inicio", fecha_inicio);
    setValue("fecha_final", fecha_final);
    setValue("inicia_desde_contrato", inicia_desde_contrato);
    setValue("dias_a_dar", dias_a_dar);
    setValue("incrementativo", incrementativo);
    setValue("dias_a_incrementar", dias_a_incrementar);
  }, [
    titulo,
    activo,
    acumulativo,
    descripcion,
    periodo,
    fecha_inicio,
    fecha_final,
    inicia_desde_contrato,
    dias_a_dar,
    incrementativo,
    dias_a_incrementar,
  ]);

  const onSubmit = async (data) => {
    try {
      // Llama a la función del backend para actualizar la política
      const actualizacionExitosa = await editarPolitica(titulo, data);

      if (actualizacionExitosa) {
        // Si la actualización es exitosa, llama a la función onSave para actualizar la vista
        onSave(data);
      } else {
        // Si la actualización falla, puedes manejar el error o mostrar un mensaje de error
        console.error("Error al actualizar la política");
      }
    } catch (error) {
      console.error("Error al actualizar la política", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="titulo">Título:</label>
      <input type="text" {...register("titulo")} />

      <label htmlFor="activo">Activo:</label>
      <input type="checkbox" {...register("activo")} />

      <label htmlFor="acumulativo">Acumulativo:</label>
      <input type="checkbox" {...register("acumulativo")} />

      <label htmlFor="descripcion">Descripción:</label>
      <textarea {...register("descripcion")} rows="4" />

      <label htmlFor="periodo">Periodo (en días):</label>
      <input type="number" {...register("periodo")} />

      <label htmlFor="fecha_inicio">Fecha de Inicio:</label>
      <input type="date" {...register("fecha_inicio")} />

      <label htmlFor="fecha_final">Fecha de Vencimiento:</label>
      <input type="date" {...register("fecha_final")} />

      <label htmlFor="inicia_desde_contrato">Inicia desde contrato:</label>
      <input type="checkbox" {...register("inicia_desde_contrato")} />

      <label htmlFor="dias_a_dar">Días a Dar:</label>
      <input type="number" {...register("dias_a_dar")} />

      <label htmlFor="incrementativo">Incrementativo:</label>
      <input type="checkbox" {...register("incrementativo")} />

      <label htmlFor="dias_a_incrementar">Días a Incrementar:</label>
      <input type="number" {...register("dias_a_incrementar")} />

      {/* Botones de guardar y cancelar */}
      <button type="submit">Guardar Cambios</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}

export default EditarPoliticaFormulario;
