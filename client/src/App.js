import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import {ViewPoliticas} from './componentes/viewPoliticas'
import AddPolicy from './componentes/addPolicy/AddPolicy'

// import Inicio from './Inicio';
// import Empleados from './Empleados';
// import Politicas from './Politicas';

function App({cedula}) {

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <Router>
      <div className="bg-fondo p-3" >
       <div className="App bg-fondo" >
        <button onClick={toggleMenu}>Mostrar/ocultar menú</button>
        <main>
          <div>
            <div className={`menu ${menuVisible ? 'visible' : ''}`}>
              <ul>
                <li>
                  <Link to="/">Inicio</Link>
                </li>
                <li>
                  <Link to="/empleados">Empleados</Link>
                </li>
                <li>
                  <Link to="/politicas">Políticas</Link>
                </li>
                <li>
                  <Link to="/AddPoliticas">Anhadir Politica</Link>
                </li>
              </ul>
            </div>
            <div className="content">
            </div>
          </div>
        </main>
        <div className="contenedor p-2" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
          <Routes>
               {/*<Route path="/politicas" element={<ViewPoliticas items={items}/>} />*/}
               {/*<Route path="/AddPoliticas" element={<AddPolicy />} />*/}
          </Routes>
        </div>
        <footer style={{ backgroundColor: '#20212a', color: '#ffffff'    }}  >
        <div className="container">
          <p class="text-center">&copy; Oraculo.com</p>
        </div>
      </footer>
      </div>
      </div>
    </Router>
  );
}

export default App;
