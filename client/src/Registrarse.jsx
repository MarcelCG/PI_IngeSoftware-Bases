import React, {useState} from 'react';
import { useForm, useStep } from "react-hooks-helper";
import 'bootstrap/dist/css/bootstrap.css';
import {FormEmpresa}   from './componentes/registrarse/FormEmpresa.jsx';
import {FormEmpleador} from './componentes/registrarse/FormEmpleador';

const defaultData = {
  empresaName:"",
  empresaCorreo:"",
  empresaCorreo2:"",
  empresaTel:"",
  empresaTel2:"",
  empresaCedu:"",
  empleadorName:"",
  empleadorCorreo:"",
  empleadorApe1:"",
  empleadorApe2:"",
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
  empleadorCorreo:false,
  empleadorCorreo2:false,
  empleadorTel:false,
  empleadorTel2:false,
  empleadorPass:false,
};

const steps = [
  {id: "formEmpresa"},
  {id: "formEmpleador"},
  {id: "submited"},
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
  }

  return (<div></div>);
};

export default RegistroForm;
