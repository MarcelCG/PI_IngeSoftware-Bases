import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

function RegistrarEmpresa() {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center rounded">
      <div className="card shadow text-center w-70 h-50 p-3">
        <form>
          <div className="card-title">
            <h2 className="display-4">Registrar Empresa</h2>
          </div>
          <div className="card-body">
            <div>
              <input className="form-control form-control-lg mb-3" type="text" id="empresaNombre" placeholder="Nombre de la empresa" required/>
            </div>
            <div className="row">
              <div className="col">
                <div className="col">
                  <input className="form-control mb-3" type="email" id="empresaEmail1" placeholder="correo 1"required/>
                </div>
                <div className="col">
                  <input className="form-control mb-3" type="email" id="empresaEmail2" placeholder="correo 2"/>
                </div>
              </div>
              <div className="col">
                <div className="col">
                  <input className="form-control mb-3" type="tel" id="empresaTelefono1" placeholder="telefono 1"required/>
                </div>
                <div className="col">
                  <input className="form-control mb-3" type="tel" id="empresaTelefono2" placeholder="telefono 2"/>
                </div>
              </div>
              <div>
                <input className="form-control mb-3" type="text" id="empresaCedula" placeholder="Cedula Juridica"required/>
              </div>
              <button type="submit" className="btn btn-primary btn-lg">Siguiente</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrarEmpresa;
