import { string } from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import DeliveryAppContext from '../../context/DeliveryAppContext';
import { requestUpdate } from '../../services/requests';

const orderId = 'order_details__element-order-details-label-order-id';
const dateId = 'order_details__element-order-details-label-order-date';
const statusId = 'order_details__element-order-details-label-delivery-status';

const sellerId = 'customer_order_details__element-order-details-label-seller-name';
const checkDeliveryId = 'customer_order_details__button-delivery-check';
const preparingCheckId = 'seller_order_details__button-preparing-check';
const dispatchCheckId = 'seller_order_details__button-dispatch-check';

export default function OrderDetailsHeader({ userRole }) {
  const {
    user,
    orderInfo,
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
      <h2>Detalhe do pedido</h2>
      {orderInfo && (
        <div>
          <p
            data-testid={ `${userRole}_${orderId}` }
          >
            {orderInfo.id}
          </p>
          { userRole === 'customer' && (
            <p
              data-testid={ sellerId }
            >
              { orderInfo.seller.name }
            </p>
          )}
          <p
            data-testid={ `${userRole}_${dateId}` }
          >
            {moment(orderInfo.saleDate).format('DD/MM/YYYY')}
          </p>
          <p
            data-testid={ `${userRole}_${statusId}${orderInfo.id}` }
          >
            {orderInfo.status}
          </p>
          {userRole === 'customer' && (
            <button
              type="button"
              data-testid={ checkDeliveryId }
              disabled={ orderInfo.status !== 'Em Trânsito' }
              onClick={ async () => handleStatusUpdate('Entregue') }
            >
              Marcar como entregue
            </button>
          )}
          {userRole === 'seller' && (
            <div>
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
        </div>
      )}
    </section>
  );
}

OrderDetailsHeader.propTypes = {
  userRole: string,
}.isRequired;
