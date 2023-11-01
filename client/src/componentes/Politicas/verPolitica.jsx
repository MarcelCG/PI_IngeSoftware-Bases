import React from "react";

export const VerPolitica = (politica) => {
  const {
    activo,
    acumulativo,
    descripcion,
    dias_a_dar,
    dias_a_incrementar,
    fecha_final,
    fecha_inicio,
    incrementativo,
    inicia_desde_contrato,
    periodo,
    titulo
  } = politica;

  return (
  <div className="container">
    <div>
      <div>
        <strong>Titulo: </strong>{titulo}<br/>
        <strong>Activo: </strong>{activo? "Si":"No"}<br/>
        <strong>Acumulativo: </strong>{acumulativo? "Si":"No"}<br/>
        <strong>Dias a dar: </strong>{dias_a_dar}<br/>
        <strong>Dias a incrementar: </strong>{dias_a_incrementar}<br/>
        <strong>Fecha final: </strong>{ajustarFecha(fecha_final)}<br/>
        <strong>Fecha inicio: </strong>{ajustarFecha(fecha_inicio)}<br/>
        <strong>Incrementativo: </strong>{incrementativo? "Si":"No"}<br/>
        <strong>Inicia desde contrato: </strong>{inicia_desde_contrato? "Si":"No"}<br/>
        <strong>Periodo: </strong>{periodo}<br/>
        <strong>Descripcion: </strong>{descripcion}<br/>
        </div>
    </div>
  </div>
  );
};

export const ajustarFecha = (fecha) => {
  const nuevaFecha = new Date(fecha);
  const anho = nuevaFecha.getFullYear();
  const mes = (nuevaFecha.getMonth() + 1).toString().padStart(2, '0');
  const dia = nuevaFecha.getDate().toString().padStart(2, '0');
  return `${dia}/${mes}/${anho}`;
}