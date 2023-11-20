import React from 'react';
import { useAutent } from '../../contexto/ContextoAutenticacion';
import DashboardEmpleado from './DashboardEmpleado';
import DashboardEmpleador from './DashboardEmpleador';

function Dashboard() {
  const {usuarioAutenticado} = useAutent();
  const esEmpleador = usuarioAutenticado?.esEmpleador ? true : false;

  return (
    <div className="container mt-2 card-body p-2">
      {esEmpleador ? 
        (
          <DashboardEmpleador/>
        ) : (
          <DashboardEmpleado/>
        )
      }
    </div>
  );
}

export default Dashboard;