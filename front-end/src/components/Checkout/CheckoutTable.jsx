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
    <section>
      <h2>Finalizar Pedido</h2>
      <table>
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
            <tr key={ index }>
              <td data-testid={ `${itemNumberId}-${index}` }>
                {index + 1}
              </td>
              <td data-testid={ `${nameId}-${index}` }>
                {item.name}
              </td>
              <td
                data-testid={ `${quantityId}-${index}` }
              >
                {item.quantity}
              </td>
              <td data-testid={ `${unitPriceId}-${index}` }>
                {`${item.price.replace('.', ',')}`}
              </td>
              <td data-testid={ `${subTotalId}-${index}` }>
                {(item.quantity * item.price).toFixed(2).toString().replace('.', ',')}
              </td>
              <td data-testid={ `${removeBtnId}-${index}` }>
                <button
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
      <h3 data-testid={ totalId }>
        { totalPrice.toFixed(2).toString().replace('.', ',') }
      </h3>
    </section>
  );
}

CheckoutTable.propTypes = {
}.isRequired;
