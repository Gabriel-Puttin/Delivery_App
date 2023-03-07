import React, { useEffect, useContext } from 'react';
import DeliveryAppContext from '../../context/DeliveryAppContext';
import { requestDelete } from '../../services/requests';

export default function AdminPageTable() {
  const { userList, fetchUserList } = useContext(DeliveryAppContext);

  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  const onRemoveBtnClick = async (userId) => {
    await requestDelete(`/users/${userId}`);
    return fetchUserList();
  };

  return (
    <section>
      <h2>Lista de usuários</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
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
