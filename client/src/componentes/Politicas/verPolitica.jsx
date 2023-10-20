import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
  
//  ---------------------------------------------------------------
// │Richard, a usted le voy a dejar la parte del estilo a este .css│
// │la profe me dijo que tenia que ser igual al del formulario de  │
// │add-policy en cuanto a estilo entonces voy a dejarle esto      │
//  ---------------------------------------------------------------

  return (
  <div className="container">
    <div>
      <div>
        titulo:{titulo}<br/>
        activo: {activo? "Si":"No"}<br/>
        acumulativo: {acumulativo? "Si":"No"}<br/>
        dias_a_dar: {dias_a_dar}<br/>
        dias_a_incrementar: {dias_a_incrementar}<br/>
        fecha_final: {ajustarFecha(fecha_final)}<br/>
        fecha_inicio: {ajustarFecha(fecha_inicio)}<br/>
        incrementativo: {incrementativo? "Si":"No"}<br/>
        inicia_desde_contrato: {inicia_desde_contrato? "Si":"No"}<br/>
        periodo: {periodo}<br/>
        descripcion: {descripcion}<br/>
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