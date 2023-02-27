import React, { useState, useEffect } from 'react';

export default function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [isDisabled, setIsDisabled] = useState(true);

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

  return (
    <section>
      <form>
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
      <span data-testid="common_login__element-invalid-email">Mensagem de error</span>
    </section>
  );
}
