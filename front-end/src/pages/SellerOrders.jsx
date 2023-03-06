import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { requestData } from '../services/requests';

function SellerOrders() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const userSales = await requestData('/sales');
      setSales(userSales);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <NavBar />
      {sales.map((sale, index) => (
        <Link to={ `/seller/orders/${sale.id}` } key={ index }>
          <p
            data-testid={ `seller_orders__element-order-id-${sale.id}` }
          >
            { index + 1 }
          </p>
          <h3
            data-testid={ `seller_orders__element-delivery-status-${sale.id}` }
          >
            { sale.status }
          </h3>
          <p
            data-testid={ `seller_orders__element-order-date-${sale.id}` }
          >
            { moment(sale.saleDate).format('DD/MM/YYYY') }
          </p>
          <p
            data-testid={ `seller_orders__element-card-price-${sale.id}` }
          >
            {sale.totalPrice.replace('.', ',')}
          </p>
          <p
            data-testid={ `seller_orders__element-card-address-${sale.id}` }
          >
            {`${sale.deliveryAddress}, ${sale.deliveryNumber}`}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default SellerOrders;
