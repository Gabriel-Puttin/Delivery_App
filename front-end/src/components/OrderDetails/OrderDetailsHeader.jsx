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

const STATUS_PENDING = 'Pendente';
const STATUS_PREP = 'Preparando';
const STATUS_TRANSIT = 'Em Trânsito';
const STATUS_DONE = 'Entregue';

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

  const getStatusColor = (status) => {
    if (status === STATUS_PENDING) return 'bg-pending';
    if (status === STATUS_PREP) return 'bg-in-transit';
    if (status === STATUS_TRANSIT) return 'bg-in-transit';
    if (status === STATUS_DONE) return 'bg-done';
  };

  return (
    <section
      style={ { width: '1200px' } }
      className="align-items-center"
    >
      {orderInfo && (
        <div
          className="d-flex fs-5 p-2
          align-items-center justify-content-between td-neutral"
        >
          <div className="fw-bold">
            <span>Pedido </span>
            <span
              data-testid={ `${userRole}_${orderId}` }
            >
              {orderInfo.id}
            </span>
          </div>
          { userRole === 'customer' && (
            <div>
              <span>P. Vend: </span>
              <span
                data-testid={ sellerId }
              >
                { orderInfo.seller.name }
              </span>
            </div>
          )}
          <span
            className="fw-bold"
            data-testid={ `${userRole}_${dateId}` }
          >
            {moment(orderInfo.saleDate).format('DD/MM/YYYY')}
          </span>
          <span
            className={ `rounded px-2 fw-bold ${getStatusColor(orderInfo.status)}` }
            data-testid={ `${userRole}_${statusId}${orderInfo.id}` }
          >
            {orderInfo.status}
          </span>
          {userRole === 'customer' && (
            <button
              className="btn fw-bold td-primary"
              type="button"
              data-testid={ checkDeliveryId }
              disabled={ orderInfo.status !== STATUS_TRANSIT }
              onClick={ async () => handleStatusUpdate(STATUS_DONE) }
            >
              Marcar como entregue
            </button>
          )}
          {userRole === 'seller' && (
            <div>
              <button
                className="btn fw-bold td-secondary-alt me-2"
                type="button"
                data-testid={ preparingCheckId }
                disabled={ orderInfo.status !== STATUS_PENDING }
                onClick={ async () => handleStatusUpdate(STATUS_PREP) }
              >
                PREPARAR PEDIDO
              </button>
              <button
                className="btn fw-bold td-primary"
                type="button"
                data-testid={ dispatchCheckId }
                disabled={ orderInfo.status !== STATUS_PREP }
                onClick={ async () => handleStatusUpdate(STATUS_TRANSIT) }
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
