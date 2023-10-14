import App from './vistas/App'
import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './componentes/Registro/Login';
import Registrarse from './componentes/Registro/Registrarse';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ProveedorAutenticacion, useAutent } from './contexto/ContextoAutenticacion';

const root = document.getElementById('root');
function Index(){

  return(
    <React.StrictMode>
      <ProveedorAutenticacion>
        <Router>
          <IniciarSesion/>
        </Router>
      </ProveedorAutenticacion>
    </React.StrictMode>
  );
}

export function IniciarSesion(){
  const { logeado } = useAutent();
  return (
    <Routes>
      <Route path="/app/*" element={logeado ? <App/> : <Navigate to="/" />} />
      <Route path="/" element={<Login/>} />
      <Route path="/registrarse" element={<Registrarse/>} />
    </Routes>
  )
}

ReactDOM.createRoot(root).render(<Index />);