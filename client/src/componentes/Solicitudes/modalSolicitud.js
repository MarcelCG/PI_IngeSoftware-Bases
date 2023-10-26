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
    horas_solicitadas,
    comentarios,
    esEmpleador
  } = solicitud;

  return (
  <div className="container">
    <div>
      <div>
        { esEmpleador && <>
          <strong>Empleado: </strong><span>{nombre_completo}</span><br/></>
        }
        <strong>Politica Solicitada: </strong><span>{politica}</span><br/>
        <strong>Fecha de Solicitud: </strong><span>{fecha_solicitud_nueva}</span><br/>
        <strong>Dias solicitados: </strong><span>{dias_libres_solicitados}</span><br/>
        {
          dias_libres_solicitados === 1 ? (
            <div>
              <strong>Fecha Solicitada: </strong><span>{fecha_inicio}</span><br/>
              <strong>Horas solicitadas: </strong><span>{horas_solicitadas}</span><br/>
              <strong>Hora de inicio: </strong><span>{hora_inicio_nueva}</span><br/>
              <strong>Hora final: </strong><span>{hora_final}</span><br/>
            </div>
          ) : (
            <div>
              <strong>Fecha de inicio: </strong><span>{fecha_inicio}</span><br/>
              <strong>Fecha final: </strong><span>{fecha_final}</span><br/>
            </div>
          )
        }
        { comentarios &&
          <><strong>Comentarios: </strong><span>{comentarios}</span></>
        }
        </div>
    </div>
  </div>
  );
};