import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, Route, Routes } from 'react-router-dom';
import AddPolicy from '../componentes/Politicas/AddPolicy';
import AddEmployee from '../componentes/Empleado/agregarEmpleado';
import {ViewPoliticas} from '../componentes/Politicas/viewPoliticas';
import ListOfEmployees from '../componentes/Empleado/visualizarEmpleados';
import VisualizarEmpresa from '../componentes/Empresa/VisualizarEmpresa';
import VisualizarEmpleadorPorCedula from '../componentes/Empleador/VisualizarEmpleador';

function App() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
      <div className="bg-fondo p-3" >
        <div className="App bg-fondo" >
          <button onClick={toggleMenu}>Mostrar/ocultar menú</button>
          <main>
            <div>
              <div className={`menu ${menuVisible ? 'visible' : ''}`}>
                <ul>
                  <li> <Link to="/app">Inicio</Link> </li>
                  <li> <Link to="/app/empleados">Empleados</Link> </li>
                  <li> <Link to="/app/politicas">Políticas</Link>                       </li>
                  <li> <Link to="/app/addPoliticas">Agregar Políticas</Link>            </li>
                  <li> <Link to="/app/addEmpleados/">Agregar Empleados</Link>            </li>
                  <li> <Link to="/app/perfil">Perfil</Link>       </li>
                  <li> <Link to="/app/empresa">Empresa</Link>                           </li>
                </ul>
              </div>
              <div className="content">
              </div>
            </div>
          </main>
        <div className="contenedor p-2" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
          <Routes>
            <Route path="/politicas" element={<ViewPoliticas/>} />
            <Route path="/empleados" element={<ListOfEmployees/>}/>
            <Route path="/addPoliticas" element={<AddPolicy/>}/>
            <Route path="/perfil" element={<VisualizarEmpleadorPorCedula/>}/>
            <Route path="/addEmpleados" element={<AddEmployee/>}/>
            <Route path="/empresa" element={<VisualizarEmpresa/>}/>
          </Routes>
        </div>
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
