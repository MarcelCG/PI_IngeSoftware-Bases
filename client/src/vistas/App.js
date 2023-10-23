import '../estilos/estilos.css';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AddPolicy from '../componentes/Politicas/AddPolicy';
import AddEmployee from '../componentes/Empleado/agregarEmpleado';
import {VerPoliticas} from '../componentes/Politicas/verPoliticas';
import ListOfEmployees from '../componentes/Empleado/visualizarEmpleados';
import VisualizarEmpresa from '../componentes/Empresa/VisualizarEmpresa';
import VisualizarEmpleadorPorCedula from '../componentes/Empleador/VisualizarEmpleador';
import SolicitudesEmpleador from '../componentes/Solicitudes/VerSolicitudesEmpleador'
import { MenuEmpleador, MenuEmpleado } from './menu';
import { useAutent } from '../contexto/ContextoAutenticacion';

function App() {
  const {usuarioAutenticado} = useAutent();
  const empresa = usuarioAutenticado?.cedula_empresa; 
  const esEmpleador = empresa ? true : false;

  let titulo;

  // Define el título según la ruta actual
  switch (useLocation().pathname) {
    case '/app':
      titulo = 'Inicio';
      break;
    case '/app/politicas':
      titulo = 'Lista de Politicas';
      break;
    case '/app/empleados':
      titulo = 'Lista de Empleados';
      break;
      case '/app/empresa':
        titulo = 'Información de la Empresa';
      break;
      case '/app/perfil':
        titulo = 'Información del Usuario';
      break;
    default:
      titulo = '';
      break;
  }

  return (
      <div className="bg-fondo" >
        <div className="App bg-fondo" >
          <main>
            <div className='menu'>
              {esEmpleador ? (
                <MenuEmpleador/>
                ) : (
                  <MenuEmpleado/>
                )
              }
            </div>

            {titulo && <h3 className='titulo-pagina text-center'>{titulo}</h3>}
            <div className="container col-10">
            <Routes>
              <Route path="/politicas" element={<VerPoliticas/>} />
              <Route path="/politicas/addPoliticas" element={<AddPolicy/>}/>
              <Route path="/empleados" element={<ListOfEmployees/>}/>
              <Route path="/empleados/addEmpleados" element={<AddEmployee/>}/>
              <Route path="/perfil" element={<VisualizarEmpleadorPorCedula/>}/>
              <Route path="/empresa" element={<VisualizarEmpresa/>}/>
              <Route path="/solicitudes" element={<SolicitudesEmpleador/>}/>
            </Routes>
        </div>
          </main>
        <footer>
          <div className="container">
            <p className="text-center m-x">&copy; Oraculo.com</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
