import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput, { handleSubmit } from '../Registro/FormInput';

export const FormPolitica = ({ formData, setForm, errForm, setErrForm, navigation }) => {
  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      type: 'text',
      name: 'titulo',
      label: 'Título de la política:',
      placeholder: 'Título de la política',
      required: true,
    },
    {
      id: 2,
      type: 'text',
      name: 'cedula_empresa',
      label: 'Cédula de la empresa:',
      placeholder: 'Cédula de la empresa',
      required: true,
    },
    {
      id: 3,
      type: 'text',
      name: 'periodo',
      label: 'Periodo:',
      placeholder: 'Periodo',
      required: true,
    },
    {
      id: 4,
      type: 'text',
      name: 'fecha_final',
      label: 'Fecha Final:',
      placeholder: 'Fecha Final',
      required: true,
    },
    {
      id: 5,
      type: 'text',
      name: 'inicia_desde_contrato',
      label: 'Inicia Desde Contrato:',
      placeholder: 'Inicia Desde Contrato',
      required: true,
    },
    {
      id: 6,
      type: 'text',
      name: 'dias_a_dar',
      label: 'Días a Dar:',
      placeholder: 'Días a Dar',
      required: true,
    },
    {
      id: 7,
      type: 'text',
      name: 'incrementativo',
      label: 'Incrementativo:',
      placeholder: 'Incrementativo',
      required: true,
    },
    {
      id: 8,
      type: 'text',
      name: 'dias_a_incrementar',
      label: 'Días a Incrementar:',
      placeholder: 'Días a Incrementar',
      required: true,
    },
    {
      id: 9,
      type: 'text',
      name: 'acumulativo',
      label: 'Acumulativo:',
      placeholder: 'Acumulativo',
      required: true,
    },
    {
      id: 10,
      type: 'text',
      name: 'activo',
      label: 'Activo:',
      placeholder: 'Activo',
      required: true,
    },
    {
      id: 11,
      type: 'text',
      name: 'descripcion',
      label: 'Descripción:',
      placeholder: 'Descripción',
      required: true,
    },
    // Agrega más campos según tu modelo
  ];

  const nextClick = (e) => {
    let inputsAreValid = handleSubmit(inputs, formData, setErrForm, errForm);
    if (!inputsAreValid) {
      navigation.next();
    }
  };

  return (
    <div className="container col-5 position-static">
      <div className="card border-dark shadow m-3">
        <div className="card-header titulo-ventana">
          <h1>Formulario | Política</h1>
        </div>
        <div className="card-body">
          <form className="px-4 row py-3">
            {inputs.map((input) => (
              <div className={input.style} key={input.id}>
                <FormInput
                  {...input}
                  value={formData[input.name]}
                  boolError={errForm[input.name]}
                  onChange={(e) => setForm({ ...formData, [input.name]: e.target.value })}
                />
              </div>
            ))}
          </form>
          <div className="d-flex justify-content-end mt-3">
            <div className="align-items-right text-align-right float-right">
              <button onClick={() => navigate('/')} className="btn btn-secondary me-2">
                Cancelar
              </button>
              <button onClick={nextClick} className="btn-primary">
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
