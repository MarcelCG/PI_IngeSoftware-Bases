import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
        const response = await fetch('http://localhost:5000/api/usuario/login', {
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
  // const props = { modalID: "comadreja" };
  // <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#${props.modalID}`}>TILING</button>
  // <Modal {...props}/>
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
// <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#comadreja">


export default Login;
