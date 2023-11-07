import React, {useState} from 'react';

const FormInput = (props) => {
  const {errorMessage, onChange, id, boolError, isPassword, toggle, style, ...inputProps } = props;

  const togglePasswordVisibility = () => {
      toggle(); 
  };
  
  return (
      <div className="mb-3 p-1 row">
        <label>{props.label}</label>
        <input
          className={`form-control  col form-control-lg${boolError ? ' is-invalid': ''} ${style}`}
          {...inputProps}
          onChange={onChange}
        />
        {(props.isPassword && <div onClick={togglePasswordVisibility} className="btn col-2 m-1 btn-outline-dark">
          <img src="/password.png" alt="eye"  style={{ height: '40px', width: '40px' }} />
        </div>)}
        {boolError && <div className="invalid-feedback">{errorMessage}</div>}
      </div>
    );
};

const FormReview = (props) => {
 const {id, style, ...inputProps } = props;
  return (
    <div className="mb-2 row">
      <div   
        {...inputProps}
      >
        <div className="text-secondary"><strong>{inputProps.label}</strong></div>
        {inputProps.value}
      </div>
    </div>
  );
};

const handleSubmit = (inputs, formData, setErrForm, errForm) => {
  const updatedErrForm = {};
  inputs.forEach((input) => {
    if (input.required && CheckRegex(formData[input.name], input.patron)) {
      updatedErrForm[input.name] = false;
    } else if (!input.required && (formData[input.name] === '' || CheckRegex(formData[input.name], input.patron))) {
      updatedErrForm[input.name] = false;
    } else {
      updatedErrForm[input.name] = true;
    }

  });
  setErrForm(updatedErrForm);
  const hasError = Object.values(updatedErrForm).some((value) => value === true);
  if(errForm === undefined){
    return updatedErrForm;
  }
  return hasError;
};  

const CheckRegex = (value, pattern) => {
  return pattern.test(value);
};

const TogglePassword = () => {
  const [visibility, setVisibility] = useState(false);

  const toggle = () => {
    setVisibility((prevVisibility) => !prevVisibility);
  };
  const type = visibility ? 'text' : 'password';
 
  return [type, toggle];
};

export default FormInput;
export { CheckRegex };
export { handleSubmit };
export { TogglePassword };
export { FormReview };