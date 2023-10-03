import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa Routes
import Login from './Login';
import Registrarse from './componentes/registrarse/Registrarse';

function AppRouter() {
  return (
    <Router>
      {/* Utiliza Routes en lugar de Switch */}
      <Routes>
        <Route path="/" element={<Login />} /> {/* Usa 'element' en lugar de 'component' */}
        <Route path="/registrarse" element={<Registrarse />} /> {/* Usa 'element' en lugar de 'component' */}
      </Routes>
    </Router>
  );
}

export default AppRouter;