import React, { useState, useEffect } from 'react';
import { requestData, requestDelete, requestPost } from '../../services/requests';

export default function Form() {
  const [userForm, setUserForm] = useState({
    item: '',
    name: '',
    email: '',
    password: '',
    excluir: '',
    isDisable: true,
  });

  const [users, setUsers] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [failedRegister, setFailedRegister] = useState(false);

  const [tipo, setTipo] = useState('seller');
  const handleChange = (event) => {
    const { target } = event;
    setUserForm({ ...userForm, [target.name]: target.value });
  };

  const fetchUsers = async () => {
    const userList = await requestData('/users');
    setUsers(userList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const { name, email, password } = userForm;
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
  }, [userForm, isDisabled]);

  const onRegisterSubmit = async (event) => {
    event.preventDefault();
    const { name, password, email } = userForm;
    const userInfo = { name, password, email, tipo };
    try {
      await requestPost('/admin/manage', userInfo);
      return fetchUsers();
    } catch (error) {
      setFailedRegister(true);
    }
  };

  const onRemoveBtnClick = async (userId) => {
    await requestDelete(`/users/${userId}`);
    return fetchUsers();
  };

  return (
    <section>

      <form onSubmit={ onRegisterSubmit }>
        <label htmlFor="name">
          name
          <input
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
            value={ userForm.password }
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
      {
        (failedRegister)
          ? (
            <span
              data-testid="admin_manage__element-invalid-register"
            >
              Mensagem de erro
            </span>
          )
          : null
      }
      <table>

        <tbody>
          {users.map((user, index) => (
            <tr key={ `user-${index}` }>
              <td data-testid={ `admin_manage__element-user-table-item-number-${index}` }>
                {index + 1}
              </td>
              <td data-testid={ `admin_manage__element-user-table-name-${index}` }>
                {user.name}
              </td>
              <td data-testid={ `admin_manage__element-user-table-email-${index}` }>
                {user.email}
              </td>
              <td data-testid={ `admin_manage__element-user-table-role-${index}` }>
                {user.role}
              </td>
              <td data-testid={ `admin_manage__element-user-table-remove-${index}` }>
                <button
                  type="button"
                  onClick={ async () => onRemoveBtnClick(user.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
