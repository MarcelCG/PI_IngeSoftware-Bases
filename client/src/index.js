import App from './vistas/App'
import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import Login from './componentes/Registro/Login';
import Registrarse from './componentes/Registro/Registrarse';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const root = document.getElementById('root');

function Index(){

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [cedula_usuario, setCedula_Usuario] = useState("");

  return(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/app/*" element={isLoggedIn ? <App cedula_usuario={cedula_usuario}/> : <Navigate to="/" />} />
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} setCedula_Usuario={setCedula_Usuario}/>} />
          <Route path="/registrarse" element={<Registrarse/>} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(root).render(<Index />);