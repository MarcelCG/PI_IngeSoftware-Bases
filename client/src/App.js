import React, { useState } from 'react';
import './App.css';
import VisualizarEmpleado from './VisualizarEmpleado'; 
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

// import Inicio from './Inicio';
// import Empleados from './Empleados';
// import Politicas from './Politicas';

function App() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
      // <VisualizarEmpleado /> {}
    <Router>
      <div className="App">
        <header>
          <button onClick={toggleMenu}>Mostrar/ocultar menú</button>
        </header>
        <main>
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
            </ul>
          </div>
          <div className="content">
            {/* Rutas correspondientes a los componentes */}
            {/* <Route path="/" exact component={Inicio} /> */}
            {/* <Route path="/empleados" component={Empleados} /> */}
            {/* <Route path="/politicas" component={Politicas} /> */}
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
