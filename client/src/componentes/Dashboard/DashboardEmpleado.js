import React, { useState, useEffect } from 'react';
import { useAutent } from '../../contexto/ContextoAutenticacion';
import { DashboardEmpleadoHTML } from './DashboardEmpleadoHTML';

function DashboardEmpleado() {
  const {usuarioAutenticado} = useAutent();
  const cedulaEmpleado = usuarioAutenticado.cedula;
  const cedulaEmpresa = usuarioAutenticado.cedula_empresa;

  return (
    <div className="container mt-2 card-body p-2">
      <DashboardEmpleadoHTML></DashboardEmpleadoHTML>
    </div>
  );
}

export default DashboardEmpleado;