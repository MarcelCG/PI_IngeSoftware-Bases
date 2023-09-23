import { useState } from "react";

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

const handleSubmit = (inputs, formData, setErrForm, errForm) => {
  const updatedErrForm = {};

  inputs.map((input) => {
    if (input.required && CheckRegex(formData[input.name], input.patron)) {
      updatedErrForm[input.name] = false;
      errForm[input.name] = false;
    } else if (!input.required && (formData[input.name] === '' || CheckRegex(formData[input.name], input.patron))) {
      updatedErrForm[input.name] = false;
      errForm[input.name] = false;
    } else {
      updatedErrForm[input.name] = true;
      errForm[input.name] = true;
    }
  });
  
  const hasError = Object.values(updatedErrForm).some((value) => value === true);
  return hasError;
};

const CheckRegex = (value, pattern) => {
  return pattern.test(value);
}

export default FormInput;
export { CheckRegex };
export { handleSubmit };