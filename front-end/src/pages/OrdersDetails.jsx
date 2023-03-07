import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { requestUpdate } from '../services/requests';
import NavBar from '../components/NavBar';
import DeliveryAppContext from '../context/DeliveryAppContext';

const orderId = 'customer_order_details__element-order-details-label-order-id';
const sellerId = 'customer_order_details__element-order-details-label-seller-name';
const dateId = 'customer_order_details__element-order-details-label-order-date';
const statusId = 'customer_order_details__element-order-details-label-delivery-status';
const checkDeliveryId = 'customer_order_details__button-delivery-check';

const itemNumberId = 'customer_order_details__element-order-table-item-number';
const nameId = 'customer_order_details__element-order-table-name';
const quantityId = 'customer_order_details__element-order-table-quantity';
const unitPriceId = 'customer_order_details__element-order-table-unit-price';
const subTotalId = 'customer_order_details__element-order-table-sub-total';
const totalId = 'customer_order_details__element-order-total-price';

function OrdersDetails() {
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
      { orderInfo && (
        <div>
          <p
            data-testid={ orderId }
          >
            { orderInfo.id }
          </p>
          <p
            data-testid={ sellerId }
          >
            { orderInfo.seller.name }

          </p>
          <p
            data-testid={ dateId }
          >
            { moment(orderInfo.saleDate).format('DD/MM/YYYY') }
          </p>
          <p
            data-testid={ `${statusId}${orderInfo.id}` }
          >
            { orderInfo.status }
          </p>
          <button
            type="button"
            data-testid={ checkDeliveryId }
            disabled={ orderInfo.status !== 'Em Trânsito' }
            onClick={ async () => handleStatusUpdate('Entregue') }
          >
            Marcar como entregue
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
          { totalPrice.toFixed(2).toString().replace('.', ',') }
        </p>
      </div>
    </section>
  );
}

export default OrdersDetails;
