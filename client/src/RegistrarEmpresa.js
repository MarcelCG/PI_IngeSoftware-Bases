import React, {useState} from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import validarInput from './componentes/validar'

function RegistrarEmpresa() {
  {/*variables para verificar*/}
  const [empresaNombre, setEmpresaNombre] = useState("");
  const [empresaNombreErr, setEmpresaNombreErr] = useState(false);

  const [empresaEmail, setEmpresaEmail] = useState("");
  const [empresaEmailErr, setEmpresaEmailErr] = useState(false);

  const [empresaEmail2, setEmpresaEmail2] = useState("");
  const [empresaEmailErr2, setEmpresaEmailErr2] = useState(false);

  const [empresaTel, setEmpresaTel] = useState("");
  const [empresaTelErr, setEmpresaTelErr] = useState(false);

  const [empresaTel2, setEmpresaTel2] = useState("");
  const [empresaTelErr2, setEmpresaTelErr2] = useState(false);

  const [empresaCedu, setEmpresaCedu] = useState("");
  const [empresaCeduErr, setEmpresaCeduErr] = useState(false);

  {/*funcion para verificar datos*/}
  const datosValidos = () => {

    {/*nombre*/}
    const nombreRegex = /^([a-zA-Z0-9\&\-\_\.]{3,}[a-zA-Z0-9\ \&\-\_\.]*)$/
    const isNameValid = validarInput(nombreRegex, empresaNombre);
    setEmpresaNombreErr(isNameValid? false : true);

    {/*email */}
    const emailRegex = /^([a-zA-Z0-9\@\_\-\.\%]+@[a-zA-Z0-9\_\-\.]+\.[a-zA-Z]{2,})$/
    const isEmailValid = validarInput(emailRegex, empresaEmail);
    setEmpresaEmailErr(isEmailValid ? false : true);

    {/*email optional*/}
    empresaEmail2.trim() !== ""
      ? setEmpresaEmailErr2(validarInput(emailRegex, empresaEmail2) ? false : true)
      : setEmpresaEmailErr2(false);

    {/*telefono*/}
    const telRegex = /^([876][0-9]{3}\-[0-9]{4})$/
    const isTelValid = validarInput(telRegex, empresaTel);
    setEmpresaTelErr(isTelValid? false : true);

    {/*tel optional*/}
    empresaTel2.trim() !== ""
      ? setEmpresaTelErr2(validarInput(telRegex, empresaTel2) ? false : true)
      : setEmpresaTelErr2(false);

    const ceduRegex = /^([0-9]{10})$/
    const isCeduValid = validarInput(ceduRegex, empresaCedu);
    setEmpresaCeduErr(isCeduValid? false : true);
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center rounded">
      <div className="card shadow text-center p-3 ">
        <form>
          <div className="card-title">
            <h2 className="display-4">Registrar Empresa</h2>
          </div>
          <div className="card-body mb-3">
            <div className="mb-3">
              <input value={empresaNombre} onChange={(e) => setEmpresaNombre(e.target.value)}
              className="form-control form-control-lg" type="text" id="empresaNombre" placeholder="Nombre de la empresa"/>
              {empresaNombreErr && <a style={{ color: 'red' }}>min. 3 letras, solo se permiten '&','-','_','.' y espacios</a>}
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <input value={empresaEmail} onChange={(e) => setEmpresaEmail(e.target.value)} 
                className="form-control b-3" type="text" id="empresaEmail1" placeholder="correo 1"/>
                {empresaEmailErr && <a style={{ color: 'red' }}>ejemplo@dominio.com</a>}
              </div>
              <div className="col-md-6">
                <input value={empresaEmail2} onChange={(e) => setEmpresaEmail2(e.target.value)} 
                className="form-control b-3" type="email" id="empresaEmail2" placeholder="correo 2"/>
                {empresaEmailErr2 && <a style={{ color: 'red' }}>ejemplo@dominio.com</a>}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <input value={empresaTel} onChange={(e) => setEmpresaTel(e.target.value)}
                className="form-control b-3" type="tel" id="empresaTelefono1" placeholder="telefono 1"/>
                {empresaTelErr && <a style={{color: 'red'}}>1234-5678</a>}
              </div>
              <div className="col-md-6">
                <input value={empresaTel2} onChange={(e) => setEmpresaTel2(e.target.value)}
                className="form-control b-3" type="tel" id="empresaTelefono2" placeholder="telefono 2"/>
                {empresaTelErr2 && <a style={{color: 'red'}}>1234-5678</a>}
              </div>
            </div>
            <div className="mb-3">
              <input value={empresaCedu} onChange={(e) => setEmpresaCedu(e.target.value)}
              className="form-control" type="text" id="empresaCedula" placeholder="Cedula Juridica"/>
              {empresaCeduErr && <a style={{color: 'red'}}>Solo numeros, 10 digitos.</a>}
            </div>
            <div className="row">
              <button type="button" className="btn btn-primary btn-lg" onClick={datosValidos}>Siguiente</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrarEmpresa;
