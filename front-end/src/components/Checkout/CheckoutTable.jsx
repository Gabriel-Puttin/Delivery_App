import React from 'react';

const itemNumberId = 'customer_checkout__element-order-table-item-number';
const nameId = 'customer_checkout__element-order-table-name';
const quantityId = 'customer_checkout__element-order-table-quantity';
const unitPriceId = 'customer_checkout__element-order-table-unit-price';
const subTotalId = 'customer_checkout__element-order-table-sub-total';
const removeBtnId = 'customer_checkout__element-order-table-remove';
const totalId = 'customer_checkout__element-order-total-price';

export default function CheckoutTable({ products, totalPrice, onRemoveItemBtnClick }) {
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
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr
              key={ index }
              className="border-bottom"
            >
              <td
                data-testid={ `${itemNumberId}-${index}` }
                className="td-secondary td-start fs-5"
              >
                {index + 1}
              </td>
              <td
                data-testid={ `${nameId}-${index}` }
                className="td-neutral fs-5"
              >
                {item.name}
              </td>
              <td
                data-testid={ `${quantityId}-${index}` }
                className="td-primary fs-5"
              >
                {item.quantity}
              </td>
              <td
                data-testid={ `${unitPriceId}-${index}` }
                className="td-tertiary fs-5"
              >
                {`${item.price.replace('.', ',')}`}
              </td>
              <td
                data-testid={ `${subTotalId}-${index}` }
                className="td-quaternary fs-5"
              >
                {(item.quantity * item.price).toFixed(2).toString().replace('.', ',')}
              </td>
              <td data-testid={ `${removeBtnId}-${index}` }>
                <button
                  style={ { width: '100%' } }
                  className="btn td-secondary-alt td-end fs-5"
                  type="button"
                  onClick={ () => onRemoveItemBtnClick(index) }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="fs-5 fw-bold mb-2">
        <span>Total: R$ </span>
        <span data-testid={ totalId }>
          { totalPrice.toFixed(2).toString().replace('.', ',') }
        </span>
      </div>
    </div>
  );
}

CheckoutTable.propTypes = {
}.isRequired;
