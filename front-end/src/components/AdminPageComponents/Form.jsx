import React, { useState, useEffect } from 'react';

export default function Form() {
  const [users, setUsers] = useState({
    item: '',
    nome: '',
    email: '',
    password: '',
    excluir: '',
    isDisable: true,
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const [tipo, setTipo] = useState(['Vendedor', 'Cliente']);
  const handleChange = (event) => {
    const { target } = event;
    setUsers({ ...users, [target.name]: target.value });
  };

  useEffect(() => {
    const { nome, email, password } = users;
    const validateLenghtName = 11;
    const validateEmail = /\S+@\S+\.\S+/;
    const validatePassword = 6;
    const disabled = true;
    if (password.length >= validatePassword
      && validateEmail.test(email) && nome.length > validateLenghtName) {
      setIsDisabled(!disabled);
      console.log('caiu no if');
    } else {
      setIsDisabled(disabled);
      console.log('caiu no else');
    }
  }, [users, isDisabled]);

  return (
    <form action="">
      <label htmlFor="name">
        nome
        <input
          value={ users.nome }
          data-testid="admin_manage__input-name"
          name="nome"
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
          value={ tipo }
          name="tipo"
          onChange={ (e) => {
            const options = [...e.target.selectedOptions];
            const values = options.map((option) => option.value);
            setTipo(values);
          } }
          data-testid="admin_manage__select-role"
          defaultValue="Vendedor"
        >
          <option value="Cliente">Cliente</option>
          <option value="Vendedor">Vendedor</option>
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
