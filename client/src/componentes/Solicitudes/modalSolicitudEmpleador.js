import React from "react";

export const ModalSolicitud = (solicitud) => {
  const {
    cedula_empleado,
    dias_libres_solicitados,
    fecha_inicio,
    fecha_final,
    fecha_solicitud,
    titulo_politica,
    hora_de_inicio,
    fecha_solicitud_nueva
  } = solicitud;

  console.log(solicitud)

  return (
  <div className="container">
    <div>
      <div>
        <strong>Empleado: </strong>{cedula_empleado}<br/>
        <strong>Politica Solicitada: </strong>{titulo_politica}<br/>
        <strong>Fecha de Solicitud: </strong>{fecha_solicitud_nueva}<br/>
        <strong>Dias solicitados: </strong>{dias_libres_solicitados}<br/>
        <strong>Fecha de inicio: </strong>{fecha_inicio}<br/>
        <strong>Fecha final: </strong>{fecha_final}<br/>
        </div>
    </div>
  </div>
  );
};