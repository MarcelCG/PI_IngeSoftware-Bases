import React from 'react';
import { useForm, useStep } from "react-hooks-helper";
import 'bootstrap/dist/css/bootstrap.css';
import {FormEmpresa}   from './componentes/registrarse/FormEmpresa.jsx';
import {FormEmpleador} from './componentes/registrarse/FormEmpleador';
import {FormSubmit} from './componentes/registrarse/FormSubmit';

const defaultData = {
  empresaName:"",
  empresaCorreo:"",
  empresaCorreo2:"",
  empresaTel:"",
  empresaTel2:"",
  empresaCedu:"",
  empleadorName:"",
  empleadorApe1:"",
  empleadorApe2:"",
  empleadorCedu:"",
  empleadorCorreo:"",
  empleadorCorreo2:"",
  empleadorTel:"",
  empleadorTel2:"",
  empleadorPass:"",
};

const errData = {
  empresaName:false,
  empresaCorreo:false,
  empresaCorreo2:false,
  empresaTel:false,
  empresaTel2:false,
  empresaCedu:false,
  empleadorName:false,
  empleadorApe1:false,
  empleadorApe2:false,
  empleadorCedu:false,
  empleadorCorreo:false,
  empleadorCorreo2:false,
  empleadorTel:false,
  empleadorTel2:false,
  empleadorPass:false,
};

const steps = [
  {id: "formEmpresa"},
  {id: "formEmpleador"},
  {id: "forSubmit"},
];

export const RegistroForm = () => {
  const [formData, setForm] = useForm(defaultData);
  const [errForm, setErrForm] = useForm(errData);
  const {step, navigation} = useStep({steps, initialStep: 0});

  const props = {formData, setForm, errForm, setErrForm, navigation};

  switch (step.id) {
    case "formEmpresa":
      return <FormEmpresa {...props} />;
    case "formEmpleador":
      return <FormEmpleador {...props} />;
    case "forSubmit":
      return <FormSubmit {...props} />;
    default:
  }

  return (<div></div>);
};

export default RegistroForm;
