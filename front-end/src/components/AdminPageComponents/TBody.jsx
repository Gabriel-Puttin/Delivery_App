import React from 'react';
import PropTypes from 'prop-types';

function TBody({ item, nome, email, tipo }) {
  return (
    <tbody>
      <tr>
        <td>
          {item}
        </td>
        <td>
          {nome}
        </td>
        <td>
          {email}
        </td>
        <td>
          {tipo}
        </td>
        <td>
          <button
            type="button"
          >
            Excluir
          </button>
        </td>
      </tr>
    </tbody>
  );
}

TBody.propTypes = {
  item: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
};

export default TBody;
