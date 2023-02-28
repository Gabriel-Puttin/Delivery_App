import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPost, setToken } from '../services/requests';

export default function Register() {
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [failedRegister, setFailedRegister] = useState(false);

  useEffect(() => {
    const { name, email, password } = registerForm;
    const validateEmail = /\S+@\S+\.\S+/;
    const minNameLength = 12;
    const minPasswordLength = 6;
    if (name.length >= minNameLength
       && password.length >= minPasswordLength
       && validateEmail.test(email)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [registerForm, isDisabled]);

  const handleChange = (event) => {
    const { target } = event;
    setRegisterForm({ ...registerForm, [target.name]: target.value });
  };

  const onRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await requestPost('/register', registerForm);
      setToken(user.token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/customer/products');
    } catch (error) {
      setFailedRegister(true);
    }
  };

  return (
    <section>
      <form onSubmit={ onRegisterSubmit }>
        <input
          data-testid="common_register__input-name"
          type="text"
          placeholder="Nome"
          name="name"
          onChange={ handleChange }
          value={ registerForm.name }
        />
        <input
          data-testid="common_register__input-email"
          type="email"
          placeholder="Email"
          name="email"
          onChange={ handleChange }
          value={ registerForm.email }
        />
        <input
          data-testid="common_register__input-password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={ handleChange }
          value={ registerForm.password }
        />
        <button
          data-testid="common_register__button-register"
          type="submit"
          disabled={ isDisabled }
        >
          CADASTRAR
        </button>
      </form>
      {
        (failedRegister)
          ? (
            <span
              data-testid="common_register__element-invalid_register"
            >
              Mensagem de erro
            </span>
          )
          : null
      }

    </section>
  );
}
