import React, { Component } from 'react';
import FormInput from '../Registro/FormInput'; // Asegúrate de importar FormInput correctamente

class EditarPoliticaHTML extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formulario: { ...props.formulario },
      errores: { ...props.errores },
    };
  }

  r = () => {
    const nuevosErrores = this.props.actualizarPolitica(this.state.formulario);
    this.setState(
      (prevState) => ({
        formulario: { ...prevState.formulario },
        errores: { ...nuevosErrores },
      }),
      () => {
      }
    );
  };

  render() {
    const { campos } = this.props;
    const { formulario, errores } = this.state;
    return (
      <div>
        <div className="card-body">
          <form className="px-4 row py-3">
            {campos.map((campo, index) => (
              <div className={campo.style} key={index}>
                <FormInput
                  {...campo}
                  value={formulario[campo.name]}
                  boolError={errores[campo.name]}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    this.setState((prevState) => ({
                      formulario: { ...prevState.formulario, [name]: value },
                    }));
                  }}
                />
              </div>
            ))}
          </form>
          <button className="btn-primary me-2" onClick={this.r}>
            Guardar cambios
          </button>
        </div>
      </div>
    );
  }
}

export default EditarPoliticaHTML;
