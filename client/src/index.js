import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Importa Routes
import Login from './Login';
import Registrarse from './componentes/registrarse/Registrarse';
import App from './App'
import './index.css';


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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
