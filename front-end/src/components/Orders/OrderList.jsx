import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { requestData } from '../../services/requests';
import DeliveryAppContext from '../../context/DeliveryAppContext';

const orderId = 'orders__element-order-id';
const orderStatusId = 'orders__element-delivery-status';
const orderDateId = 'orders__element-order-date';
const orderTotalId = 'orders__element-card-price';

const orderAddressId = 'seller_orders__element-card-address';

export default function OrderList({ userRole }) {
  const { user } = useContext(DeliveryAppContext);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      const userSales = await requestData('/sales');
      setSales(userSales);
    };
    fetchOrders();
  }, [user]);

  const getStatusColor = (status) => {
    if (status === 'Pendente') return 'bg-pending';
    if (status === 'Preparando') return 'bg-in-transit';
    if (status === 'Em Trânsito') return 'bg-in-transit';
    if (status === 'Entregue') return 'bg-done';
  };

  return (
    <section
      className="d-flex justify-content-center flex-wrap"
    >
      {sales.map((sale, index) => (
        <Link
          key={ index }
          to={ `/${userRole}/orders/${sale.id}` }
          className="text-decoration-none card d-flex flex-row m-3"
        >
          <div
            className="border-end
                d-flex px-4 flex-column justify-content-center align-items-stretch"
          >
            <div className="text-dark">
              Pedido
            </div>
            <div
              className="fw-bold text-dark text-center h3"
              data-testid={ `${userRole}_${orderId}-${sale.id}` }
            >
              { index + 1 }
            </div>
          </div>
          <div
            className="bg-order-card d-flex
          flex-wrap p-1 justify-content-center align-items-center"
            style={ { width: '385px' } }
          >
            <div
              data-testid={ `${userRole}_${orderStatusId}-${sale.id}` }
              className={ `text-center 
            rounded fw-bold p-4 m-1 h4 text-dark ${getStatusColor(sale.status)}` }
              style={ { width: '200px' } }
            >
              { sale.status }
            </div>
            <div
              className="text-center fw-bold h5 text-dark m-1"
              style={ { width: '160px' } }
            >
              <p
                className="rounded bg-order-sub p-1 mb-1"
                data-testid={ `${userRole}_${orderDateId}-${sale.id}` }
              >
                { moment(sale.saleDate).format('DD/MM/YYYY') }
              </p>
              <div
                className="rounded bg-order-sub p-1"
              >
                <p
                  className="d-inline me-1"
                >
                  R$
                </p>
                <p
                  className="d-inline"
                  data-testid={ `${userRole}_${orderTotalId}-${sale.id}` }
                >
                  {sale.totalPrice.replace('.', ',')}
                </p>
              </div>
            </div>
            { userRole === 'seller' && (
              <p
                data-testid={ `${orderAddressId}-${sale.id}` }
                className="m-1 text-dark"
              >
                {`${sale.deliveryAddress}, ${sale.deliveryNumber}`}
              </p>
            )}
          </div>
        </Link>
      ))}
    </section>
  );
}

OrderList.propTypes = {
}.isRequired;
