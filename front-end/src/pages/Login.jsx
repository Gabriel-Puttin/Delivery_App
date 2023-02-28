import React, { useState, useEffect } from 'react';
import { requestLogin } from '../services/requests';

export default function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [failedLogin, setFailedLogin] = useState(false);

  useEffect(() => {
    const { email, password } = login;
    const validateEmail = /\S+@\S+\.\S+/;
    const validatePassword = 6;
    const disabled = true;
    if (password.length >= validatePassword && validateEmail.test(email)) {
      setIsDisabled(!disabled);
    } else {
      setIsDisabled(disabled);
    }
  }, [login, isDisabled]);

  const handleChange = (event) => {
    const { target } = event;
    setLogin({ ...login, [target.name]: target.value });
  };

  const onLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = await requestLogin('/login', login);
      console.log(token);
    } catch (error) {
      setFailedLogin(true);
    }
  };

  return (
    <section>
      <form onSubmit={ onLoginSubmit }>
        <input
          data-testid="common_login__input-email"
          type="email"
          placeholder="Email"
          name="email"
          onChange={ handleChange }
          value={ login.email }
        />
        <input
          data-testid="common_login__input-password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={ handleChange }
          value={ login.password }
        />
        <button
          data-testid="common_login__button-login"
          type="submit"
          disabled={ isDisabled }
        >
          LOGIN
        </button>
        <button
          data-testid="common_login__button-register"
          type="button"
        >
          Ainda não tenho conta
        </button>
      </form>
      {
        (failedLogin)
          ? (
            <span
              data-testid="common_login__element-invalid-email"
            >
              Mensagem de erro
            </span>
          )
          : null
      }
    </section>
  );
}
