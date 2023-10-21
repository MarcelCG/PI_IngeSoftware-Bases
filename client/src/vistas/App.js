import '../estilos/estilos.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddPolicy from '../componentes/Politicas/AddPolicy';
import AddEmployee from '../componentes/Empleado/agregarEmpleado';
import {VerPoliticas} from '../componentes/Politicas/verPoliticas';
import ListOfEmployees from '../componentes/Empleado/visualizarEmpleados';
import VisualizarEmpresa from '../componentes/Empresa/VisualizarEmpresa';
import VisualizarEmpleadorPorCedula from '../componentes/Empleador/VisualizarEmpleador';
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

            <div className="container col-10 mt-5" style={{ maxHeight: '100vh' }}>
            <Routes>
              <Route path="/politicas" element={<VerPoliticas/>} />
              <Route path="/politicas/addPoliticas" element={<AddPolicy/>}/>
              <Route path="/empleados" element={<ListOfEmployees/>}/>
              <Route path="/empleados/addEmpleados" element={<AddEmployee/>}/>
              <Route path="/perfil" element={<VisualizarEmpleadorPorCedula/>}/>
              <Route path="/empresa" element={<VisualizarEmpresa/>}/>
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
