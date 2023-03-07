import { string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
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

  return (
    <section>
      {sales.map((sale, index) => (
        <Link to={ `/${userRole}/orders/${sale.id}` } key={ index }>
          <p
            data-testid={ `${userRole}_${orderId}-${sale.id}` }
          >
            { index + 1 }
          </p>
          <h3
            data-testid={ `${userRole}_${orderStatusId}-${sale.id}` }
          >
            { sale.status }
          </h3>
          <p
            data-testid={ `${userRole}_${orderDateId}-${sale.id}` }
          >
            { moment(sale.saleDate).format('DD/MM/YYYY') }
          </p>
          <p
            data-testid={ `${userRole}_${orderTotalId}-${sale.id}` }
          >
            {sale.totalPrice.replace('.', ',')}
          </p>
          { userRole === 'seller' && (
            <p
              data-testid={ `${orderAddressId}-${sale.id}` }
            >
              {`${sale.deliveryAddress}, ${sale.deliveryNumber}`}
            </p>
          )}
        </Link>
      ))}
    </section>
  );
}

OrderList.propTypes = {
  userRole: string,
}.isRequired;
