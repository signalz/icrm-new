import React, {useState} from 'react';

const useResetPasswordForm = (initialValues, callback) => {
  const [inputs, setInputs] = useState({initialValues});
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
  };
  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};

export default useResetPasswordForm;
