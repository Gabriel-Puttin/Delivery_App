import React, { useState, useEffect } from 'react';

export default function Register() {
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isDisabled, setIsDisabled] = useState(true);

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

  return (
    <section>
      <form>
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

      <span
        data-testid="common_register__element-invalid-register"
      >
        Mensagem de erro
      </span>

    </section>
  );
}
