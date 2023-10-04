import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';


function Login({setLoggedIn, setCedula_Usuario}) {
  const navigate = useNavigate();
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
        const response = await fetch('http://localhost:4223/api/usuario/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.status === 200) {
            // Inicio de sesión exitoso, muestra un mensaje de éxito
            alert('Inicio de sesión exitoso');
            setLoggedIn(true);
            setCedula_Usuario(username);
            navigate("/app");
        } else if (response.status === 401) {
            // Credenciales incorrectas, muestra un mensaje de error
            alert('Credenciales incorrectas');
            // Borra los valores ingresados en el formulario
            setUsername('');
            setPassword('');
        } else {
            // Otra respuesta del servidor, maneja según corresponda
            alert('Hubo un problema al iniciar sesión');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
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
              <img src={require('./logo_oraculo.png')} alt="Logo" style={{ width: '100%', height: 'auto' }}/>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Usuario:</label>
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
    </div>
  );
}

export default Login;
