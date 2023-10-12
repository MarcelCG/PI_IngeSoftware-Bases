import React, {useState} from 'react';
import { useStep } from "react-hooks-helper";
import 'bootstrap/dist/css/bootstrap.css';
import {FormEmpresa}   from '../Empresa/FormEmpresa';
import {FormEmpleador} from '../Empleador/FormEmpleador';
import {FormSubmit} from './FormSubmit';

const defaultData = {
  empresaName:"",
  empresaCorreo1:"",
  empresaCorreo2:"",
  empresaTel1:"",
  empresaTel2:"",
  empresaCedu:"",
  empleadorName:"",
  empleadorApe1:"",
  empleadorApe2:"",
  empleadorCedu:"",
  empleadorCorreo1:"",
  empleadorCorreo2:"",
  empleadorTel1:"",
  empleadorTel2:"",
  empleadorPass:"",
};

const errData = {
  empresaName:false,
  empresaCorreo1:false,
  empresaCorreo2:false,
  empresaTel1:false,
  empresaTel2:false,
  empresaCedu:false,
  empleadorName:false,
  empleadorApe1:false,
  empleadorApe2:false,
  empleadorCedu:false,
  empleadorCorreo1:false,
  empleadorCorreo2:false,
  empleadorTel1:false,
  empleadorTel2:false,
  empleadorPass:false,
};

const steps = [
  {id: "formEmpresa"},
  {id: "formEmpleador"},
  {id: "forSubmit"},
];

export const RegistroForm = () => {
  const [formData, setForm] = useState(defaultData);
  const [errForm, setErrForm] = useState(errData);
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
