import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Route, Routes } from 'react-router-dom';
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

            <div className="contenedor col-10 mt-5 p-2" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
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
        <footer style={{ backgroundColor: '#20212a', color: '#ffffff' }}>
          <div className="container">
            <p className="text-center">&copy; Oraculo.com</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
