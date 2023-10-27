import React from "react";

export const FooterModalSolicitudEmpleador = (solicitud) => {
  const {
  } = solicitud;

  return (
  <div>
    <button className="btn-danger me-2">Rechazar</button>
    <button className="btn-primary me-2">Aprobar</button>
  </div>
  );
};