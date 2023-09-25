import React from 'react';
import { useForm} from "react-hooks-helper";
import 'bootstrap/dist/css/bootstrap.css';

const defaultData = {
  usuario:"",
  contrasena:"",
};


const FormInput = (props) => {
  const {errorMessage, onChange, id, boolError, ...inputProps } = props;

 return (
    <div className="mb-3 row">
      <input
        className={`form-control form-control-lg${boolError ? ' is-invalid' : ''}`}
        {...inputProps}
        onChange={onChange}
      />
      {boolError && <div className="invalid-feedback">{errorMessage}</div>}
    </div>
  );
};


export const Login = () => {
  const [formData, setForm] = useForm(defaultData);

  const inputs = [
    {
      id:1,
      name:"usuario",
      type:"text",
      placeholder:"Usuario",
    },

    {
      id:2,
      name:"contrasena",
      type:"text",
      placeholder:"Contraseña",
    },

  ]

  return (
    <div className="container col-5 align-middle position-static">
      <div className="card shadow m-3">
        <div className="card-body text-center">
        <img src={require('./logo_oraculo.png')} className="App-logo" alt="logo" style={{ width: '500px', height: 'auto' }} />
            <form className="px-4 py-3">
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={formData[input.name]}
                  onChange={setForm}
                />
              ))}
            </form>
            <div className="d-flex justify-content-center">
              <button className="btn btn-secondary mx-5 btn-lg btn-xl">Registrarse</button>
              <button className="btn btn-primary mx-5 btn-lg btn-xl">Ingresar</button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Login;