import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
// import VisualizarEmpleador from './VisualizarEmpleador'; 
import { BrowserRouter as Link, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {ViewPoliticas} from './componentes/Politicas/viewPoliticas';
import AddPolicy from './componentes/addPolicy/AddPolicy';
import ListOfEmployees from './componentes/visualizarEmpleado/visualizarEmpleados';
import VisualizarEmpleadorPorCedula from './VisualizarEmpleador';
import VisualizarEmpresa from './VisualizarEmpresa';
import AddEmployee from './componentes/agregarEmpleado/agregarEmpleado';

const getEmpresa = async (cedula_usuario) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/empresa/byCedulaEmpleador/${cedula_usuario}`);
    console.log('Empresa Encontrada');
    return response.data.cedula_juridica;
  } catch (error) {
    console.log('No se encontro empresa');
    return '';
  }
};

function App(cedula_usuario) {

  const [empresa, setEmpresa] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const empresaEncontrada = await getEmpresa(cedula_usuario.cedula_usuario);
      setEmpresa(empresaEncontrada);
    };

    fetchData();
  }, [cedula_usuario]);
  console.log(cedula_usuario.cedula_usuario);
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
              <li>
                <Link to="/app">Inicio</Link>
              </li>
              <li>
                <Link to={`/app/empleados/${cedula_usuario.cedula_usuario}`}>Empleados</Link>
              </li>
              <li>
                <Link to={`/app/politicas/${empresa}`}>Políticas</Link>
              </li>
              <li>
                <Link to={`/app/addPoliticas/${empresa}`}>Agregar Políticas</Link>
              </li>
              <li>
                <Link to={`/app/addEmpleados/${empresa}`}>Agregar Empleados</Link>
              </li>
              <li>
                <Link to={`/app/perfil/${cedula_usuario.cedula_usuario}`}>Perfil</Link>
              </li>
               <li>
                <Link to={`/app/empresa/${empresa}`}>Empresa</Link>
              </li>
            </ul>
          </div>
          <div className="content">
          </div>
        </div>
      </main>
      <div className="contenedor p-2" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
        <Routes>
              <Route path="/politicas/:empresa" element={<ViewPoliticas/>} />
              <Route path="/empleados/:cedulaEmpleador" element={<ListOfEmployees/>}/>
              <Route path="/addPoliticas/:empresa" element={<AddPolicy/>}/>
              <Route path="/perfil/:cedulaEmpleador" element={<VisualizarEmpleadorPorCedula/>}/>
              <Route path="/addEmpleados/:empresa" element={<AddEmployee/>}/>
              <Route path="/empresa/:empresa" element={<VisualizarEmpresa/>}/>
        </Routes>
      </div>
      <footer style={{ backgroundColor: '#20212a', color: '#ffffff'    }}  >
      <div className="container">
        <p className="text-center">&copy; Oraculo.com</p>
      </div>
    </footer>
    </div>
    </div>
  );
}

export default App;
