import React, { useState, useEffect } from 'react';
import { requestPost } from '../../services/requests';

export default function Form() {
  const [users, setUsers] = useState({
    item: '',
    name: '',
    email: '',
    password: '',
    excluir: '',
    isDisable: true,
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const [tipo, setTipo] = useState('seller');
  const handleChange = (event) => {
    const { target } = event;
    setUsers({ ...users, [target.name]: target.value });
  };

  useEffect(() => {
    const { name, email, password } = users;
    const validateLenghtName = 11;
    const validateEmail = /\S+@\S+\.\S+/;
    const validatePassword = 6;
    const disabled = true;
    if (password.length >= validatePassword
      && validateEmail.test(email) && name.length > validateLenghtName) {
      setIsDisabled(!disabled);
    } else {
      setIsDisabled(disabled);
    }
  }, [users, isDisabled]);

  const onRegisterSubmit = async (event) => {
    event.preventDefault();
    const { name, password, email } = users;
    const userInfo = { name, password, email, tipo };
    console.log(userInfo);
    try {
      const user = await requestPost('/admin/manage', userInfo);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={ onRegisterSubmit }>
      <label htmlFor="name">
        name
        <input
          value={ users.name }
          data-testid="admin_manage__input-name"
          name="name"
          type="text"
          onChange={ handleChange }
        />
      </label>
      Email
      <label htmlFor="email">
        <input
          value={ users.email }
          name="email"
          data-testid="admin_manage__input-email"
          type="email"
          onChange={ handleChange }
        />
      </label>
      Senha
      <label htmlFor="password">
        <input
          value={ users.password }
          name="password"
          data-testid="admin_manage__input-password"
          type="password"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="select">
        Tipo
        <select
          name="tipo"
          value={ tipo }
          onChange={ (e) => {
            setTipo(e.target.value);
          } }
          data-testid="admin_manage__select-role"
        >
          <option value="customer">Cliente</option>
          <option value="seller">Vendedor</option>
        </select>
      </label>
      <button
        data-testid="admin_manage__button-register"
        type="submit"
        disabled={ isDisabled }
      >
        CADASTRAR

      </button>
    </form>
  );
}
