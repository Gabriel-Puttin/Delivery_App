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
    <section
      style={ { width: '1200px' } }
      className="align-items-center d-flex flex-column mt-3"
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
          </tr>
        </thead>
        <tbody>
          {
            orderItems.map((item, index) => (
              <tr
                key={ `item-${index}` }
                className="border-bottom fs-5"
              >
                <td
                  data-testid={ `${userRole}_${itemNumberId}-${index}` }
                  className="td-secondary td-start"
                >
                  {index + 1}
                </td>
                <td
                  data-testid={ `${userRole}_${nameId}-${index}` }
                  className="td-neutral"
                >
                  {item.name}
                </td>
                <td
                  data-testid={ `${userRole}_${quantityId}-${index}` }
                  className="td-primary"
                >
                  {item.quantity}
                </td>
                <td className="td-tertiary">
                  <span>R$ </span>
                  <span
                    data-testid={ `${userRole}_${unitPriceId}-${index}` }
                  >
                    {`${item.price.replace('.', ',')}`}
                  </span>

                </td>
                <td className="td-quaternary td-end">
                  <span>R$ </span>
                  <span data-testid={ `${userRole}_${subTotalId}-${index}` }>
                    {
                      (item.quantity * item.price)
                        .toFixed(2)
                        .toString()
                        .replace('.', ',')
                    }
                  </span>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="fs-5 fw-bold mb-2">
        <span>Total: R$ </span>
        <span
          data-testid={ `${userRole}_${totalId}` }
        >
          {totalPrice.toFixed(2).toString().replace('.', ',')}
        </span>
      </div>
    </section>
  );
}

OrderDetailsTable.propTypes = {
  userRole: string,
}.isRequired;
