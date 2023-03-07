import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { requestUpdate } from '../services/requests';
import NavBar from '../components/NavBar';
import DeliveryAppContext from '../context/DeliveryAppContext';

const orderId = 'seller_order_details__element-order-details-label-order-id';
const dateId = 'seller_order_details__element-order-details-label-order-date';
const statusId = 'seller_order_details__element-order-details-label-delivery-status';
const preparingCheckId = 'seller_order_details__button-preparing-check';
const dispatchCheckId = 'seller_order_details__button-dispatch-check';

const itemNumberId = 'seller_order_details__element-order-table-item-number';
const nameId = 'seller_order_details__element-order-table-name';
const quantityId = 'seller_order_details__element-order-table-quantity';
const unitPriceId = 'seller_order_details__element-order-table-unit-price';
const subTotalId = 'seller_order_details__element-order-table-sub-total';
const totalId = 'seller_order_details__element-order-total-price';

function SellerOrdersDetails() {
  const {
    user,
    orderInfo,
    orderItems,
    totalPrice,
    fetchOrderDetails } = useContext(DeliveryAppContext);

  const { id } = useParams();

  useEffect(() => {
    if (!user) return;
    fetchOrderDetails(id);
  }, [user, fetchOrderDetails, id]);

  const handleStatusUpdate = async (status) => {
    await requestUpdate(`/sales/${id}`, { status });
    await fetchOrderDetails(id);
  };

  return (
    <section>
      <NavBar />
      {orderInfo && (
        <div>
          <p
            data-testid={ orderId }
          >
            {orderInfo.id}
          </p>
          <p
            data-testid={ dateId }
          >
            {moment(orderInfo.saleDate).format('DD/MM/YYYY')}
          </p>
          <p
            data-testid={ `${statusId}${orderInfo.id}` }
          >
            {orderInfo.status}
          </p>
          <button
            type="button"
            data-testid={ preparingCheckId }
            disabled={ orderInfo.status !== 'Pendente' }
            onClick={ async () => handleStatusUpdate('Preparando') }
          >
            PREPARAR PEDIDO
          </button>
          <button
            type="button"
            data-testid={ dispatchCheckId }
            disabled={ orderInfo.status !== 'Preparando' }
            onClick={ async () => handleStatusUpdate('Em Trânsito') }
          >
            SAIU PARA ENTREGA
          </button>
        </div>
      )}
      <hr />
      <div>
        {
          orderItems.map((item, index) => (
            <div key={ index }>
              <p
                data-testid={ `${itemNumberId}-${index}` }
              >
                {index + 1}
              </p>
              <p
                data-testid={ `${nameId}-${index}` }
              >
                {item.name}
              </p>
              <p
                data-testid={ `${quantityId}-${index}` }
              >
                {item.quantity}
              </p>
              <p
                data-testid={ `${unitPriceId}-${index}` }
              >
                {`${item.price.replace('.', ',')}`}
              </p>
              <p
                data-testid={ `${subTotalId}-${index}` }
              >
                {
                  (item.quantity * item.price)
                    .toFixed(2)
                    .toString()
                    .replace('.', ',')
                }
              </p>
            </div>
          ))
        }
        <p
          data-testid={ totalId }
        >
          {totalPrice.toFixed(2).toString().replace('.', ',')}
        </p>
      </div>
    </section>
  );
}

export default SellerOrdersDetails;
