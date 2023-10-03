import React, { useState } from 'react';
import './App.css';
import VisualizarEmpleador from './VisualizarEmpleador'; 
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {ViewPoliticas} from './componentes/Politicas/viewPoliticas'

function App({cedula}) {
    const items = [
    {
      titulo: "Política 1",
      inicio: "01/01/2023",
      final: "31/12/2023",
      periodo: "Anual",
      acumulativo: "Sí",
      horas: "40",
      descripcion: "Esta es la descripción de la Política 1.",
    },
    {
      titulo: "Política 2",
      inicio: "15/02/2023",
      final: "14/02/2024",
      periodo: "Anual",
      acumulativo: "No",
      horas: "30",
      descripcion: "Esta es la descripción de la Política 2.",
    },
    {
      titulo: "Política 3",
      inicio: "01/03/2023",
      final: "28/02/2024",
      periodo: "Anual",
      acumulativo: "Sí",
      horas: "50",
      descripcion: "Esta es la descripción de la Política 3.",
    },
  ];

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    // <div className="App">
    // <VisualizarEmpleador /> {}
    // </div>
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
                  <Link to="/empleador">Empleados</Link>
                </li>
                <li>
                  <Link to="/politicas">Políticas</Link>
                </li>
              </ul>
            </div>
            <div className="content">
            </div>
          </div>
        </main>
        <div className="contenedor p-2" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
          <Routes>
               <Route path="/politicas" element={<ViewPoliticas items={items}/>} />
          </Routes>
        </div>
        <footer style={{ backgroundColor: '#20212a', color: '#ffffff'    }}  >
        <div className="container">
          <p className="text-center">&copy; Oraculo.com</p>
        </div>
      </footer>
      </div>
      </div>
    </Router>
  );
}

export default App;
