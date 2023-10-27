import React from "react";

export const FooterModalSolicitudEmpleador = (props) =>{
  const {abrirModalConfirmar, solicitud } = props;

  const abrirModal = (accion, solicitud) => {
    abrirModalConfirmar(accion, solicitud);
  }

  return (
  <div>
    <button className="btn-danger me-2">Rechazar</button>
    <button className="btn-primary me-2" onClick={()=>abrirModal('Aprobar', solicitud)}>Aprobar</button>
  </div>
  );
};