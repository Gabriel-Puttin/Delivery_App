import React, { useContext, useState } from 'react';
import DeliveryAppContext from '../../context/DeliveryAppContext';
import { requestPost } from '../../services/requests';

export default function Form() {
  const { fetchUserList } = useContext(DeliveryAppContext);

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seller',
  });

  const [failedRegister, setFailedRegister] = useState(false);

  const handleChange = (event) => {
    const { target } = event;
    setUserForm({ ...userForm, [target.name]: target.value });
  };

  const isDisabled = () => {
    const { name, email, password } = userForm;
    const validateLenghtName = 11;
    const validateEmail = /\S+@\S+\.\S+/;
    const validatePassword = 6;
    return !(password.length >= validatePassword
      && validateEmail.test(email) && name.length > validateLenghtName);
  };

  const onRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      await requestPost('/users/admin/register', userForm);
      return fetchUserList();
    } catch (error) {
      setFailedRegister(true);
    }
  };

  return (
    <section>
      <form onSubmit={ onRegisterSubmit }>
        <label htmlFor="name">
          Nome
          <input
            id="name"
            value={ userForm.name }
            data-testid="admin_manage__input-name"
            name="name"
            type="text"
            onChange={ handleChange }
          />
        </label>
        Email
        <label htmlFor="email">
          <input
            id="email"
            value={ userForm.email }
            name="email"
            data-testid="admin_manage__input-email"
            type="email"
            onChange={ handleChange }
          />
        </label>
        Senha
        <label htmlFor="password">
          <input
            id="password"
            value={ userForm.password }
            name="password"
            data-testid="admin_manage__input-password"
            type="password"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="role-select">
          Tipo
          <select
            id="role-select"
            name="role"
            value={ userForm.role }
            onChange={ handleChange }
            data-testid="admin_manage__select-role"
          >
            <option value="customer">Cliente</option>
            <option value="seller">Vendedor</option>
          </select>
        </label>
        <button
          data-testid="admin_manage__button-register"
          type="submit"
          disabled={ isDisabled() }
        >
          CADASTRAR
        </button>
      </form>
      {
        failedRegister && (
          <span
            data-testid="admin_manage__element-invalid-register"
          >
            Mensagem de erro
          </span>
        )
      }
    </section>
  );
}
