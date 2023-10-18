import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useAutent } from '../../contexto/ContextoAutenticacion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const enlaceApi = 'http://localhost:5000/api';

function Login() {
  const {
    autenticarUsuario,
    logear,
    obtenerDatosUsuario
  } = useAutent();


  const navigate = useNavigate();
  const loc = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changeUsername = (user) => {
    setUsername(user.target.value);
  }

  const changePassword = (password) => {
    setPassword(password.target.value);
  }

  const handleLogin = async () => {
    console.log('Botón de inicio de sesión presionado');
    try {
      const response = await axios.post(enlaceApi + '/usuario/login', {
        username,
        password
      });
  
      if (response.status === 200) {
        await obtenerDatosUsuario(username, autenticarUsuario);
        // Inicio de sesión exitoso, muestra un mensaje de éxito
        logear(true);
        // Redirigir al link indicado por el usuario
        const from = loc.state?.from || { pathname: '/app' };
        navigate(from);
      } else {
        // Otra respuesta del servidor, maneja según corresponda
        toast.error('Hubo un problema al iniciar sesión. Trate de nuevo más tarde')
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Credenciales incorrectas, muestra un mensaje de error
        toast.error('Credenciales Incorrectas. Trate de nuevo')
        // Borra los valores ingresados en el formulario
        setUsername('');
        setPassword('');
      } else {
        // Otro tipo de error
        console.error('Error al iniciar sesión:', error);
        toast.error('Hubo un problema al iniciar sesión. Trate de nuevo más tarde')
      } 
    }
  };
  const handleRegister = () => {
    navigate('/registrarse');
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card border-0 shadow m-3">
            <div className="card-header bg-transparent border-bottom-0">
               <img src="/logo_oraculo.png" alt="eye"  style={{ height: '150px', width: '400px' }} />
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Cédula:</label>
                <input type="text" className="form-control" value={username} onChange={changeUsername} />
              </div>
              <div className="form-group">
                <label>Contraseña:</label>
                <input type="password" className="form-control" value={password} onChange={changePassword} />
              </div>
            </div>
              <div className="card-footer bg-transparent border-top-0">
                <div className="d-flex justify-content-center"> 
                <button className="btn btn-secondary mx-5 btn-lg btn-xl" onClick={handleRegister}>Registro</button>
                <button className="btn btn-primary mx-5 btn-lg btn-xl" onClick={handleLogin}>Iniciar Sesión</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}


export default Login;
