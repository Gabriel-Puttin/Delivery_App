import React, { useContext } from 'react';
import { string } from 'prop-types';
import DeliveryAppContext from '../../context/DeliveryAppContext';

const itemNumberId = 'order_details__element-order-table-item-number';
const nameId = 'order_details__element-order-table-name';
const quantityId = 'order_details__element-order-table-quantity';
const unitPriceId = 'order_details__element-order-table-unit-price';
const subTotalId = 'order_details__element-order-table-sub-total';
const totalId = 'order_details__element-order-total-price';

export default function OrderDetailsTable({ userRole }) {
  const { orderItems, totalPrice } = useContext(DeliveryAppContext);

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {
            orderItems.map((item, index) => (
              <tr key={ `item-${index}` }>
                <td data-testid={ `${userRole}_${itemNumberId}-${index}` }>
                  {index + 1}
                </td>
                <td data-testid={ `${userRole}_${nameId}-${index}` }>
                  {item.name}
                </td>
                <td data-testid={ `${userRole}_${quantityId}-${index}` }>
                  {item.quantity}
                </td>
                <td data-testid={ `${userRole}_${unitPriceId}-${index}` }>
                  {`${item.price.replace('.', ',')}`}
                </td>
                <td data-testid={ `${userRole}_${subTotalId}-${index}` }>
                  {
                    (item.quantity * item.price)
                      .toFixed(2)
                      .toString()
                      .replace('.', ',')
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <h3
        data-testid={ `${userRole}_${totalId}` }
      >
        {totalPrice.toFixed(2).toString().replace('.', ',')}
      </h3>
    </section>
  );
}

OrderDetailsTable.propTypes = {
  userRole: string,
}.isRequired;
