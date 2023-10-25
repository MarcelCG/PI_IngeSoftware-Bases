import React from "react";

export const ModalSolicitud = (solicitud) => {
  const {
    nombre_completo,
    dias_libres_solicitados,
    fecha_inicio,
    fecha_final,
    politica,
    hora_inicio_nueva,
    fecha_solicitud_nueva,
    hora_final,
    horas_solicitadas
  } = solicitud;

  console.log(solicitud)

  return (
  <div className="container">
    <div>
      <div>
        <strong>Empleado: </strong>{nombre_completo}<br/>
        <strong>Politica Solicitada: </strong>{politica}<br/>
        <strong>Fecha de Solicitud: </strong>{fecha_solicitud_nueva}<br/>
        <strong>Dias solicitados: </strong>{dias_libres_solicitados}<br/>
        {
          dias_libres_solicitados === 1 ? (
            <div>
              <strong>Horas solicitadas: </strong>{horas_solicitadas}<br/>
              <strong>Hora de inicio: </strong>{hora_inicio_nueva}<br/>
              <strong>Hora final: </strong>{hora_final}<br/>
            </div>
          ) : (
            <div>
              <strong>Fecha de inicio: </strong>{fecha_inicio}<br/>
              <strong>Fecha final: </strong>{fecha_final}<br/>
            </div>
          )
        }
        </div>
    </div>
  </div>
  );
};