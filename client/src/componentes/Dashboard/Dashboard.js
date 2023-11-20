import React, { useState, useEffect } from 'react';
import { useAutent } from '../../contexto/ContextoAutenticacion';
import DashboardEmpleado from './DashboardEmpleado';

function Dashboard() {
  const {usuarioAutenticado} = useAutent();
  const esEmpleador = usuarioAutenticado?.esEmpleador ? true : false;

  return (
    <div className="container mt-2 card-body p-2">
      {esEmpleador ? 
        (
          <></>
        ) : (
          <DashboardEmpleado/>
        )
      }
    </div>
  );
}

export default Dashboard;