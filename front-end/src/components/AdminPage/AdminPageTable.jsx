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
    <div
      style={ { width: '1200px' } }
      className="cards_products d-flex flex-column"
    >
      <table
        style={ { width: '1150px' } }
        className="text-center mb-2"
      >
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
            <tr
              key={ `user-${index}` }
              className="border-bottom"
            >
              <td
                data-testid={ `admin_manage__element-user-table-item-number-${index}` }
                className="td-secondary fs-5 td-start"
              >
                {index + 1}
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-name-${index}` }
                className="td-neutral fs-5"
              >
                {user.name}
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-email-${index}` }
                className="td-primary fs-5"
              >
                {user.email}
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-role-${index}` }
                className="td-tertiary fs-5"
              >
                {user.role}
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-remove-${index}` }
              >
                <button
                  style={ { width: '100%' } }
                  className="btn td-quaternary td-end fs-5"
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
    </div>
  );
}
