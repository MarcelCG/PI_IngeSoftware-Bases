import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';



function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changeUsername = (user) => {
    setUsername(user.target.value);
  }

  const changePassword = (password) => {
    setPassword(password.target.value);
  }

  const handleLogin = () => {
    // Aca iria el codigo para la logica del login 
    console.log('Iniciando sesión con:', username, password);
  }

  const handleRegister = () => {
    // Aca iria el codigo para la logica para pasar al registro
    console.log('Registrando usuario:', username);
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
