import React from 'react';
import NavBar from '../components/NavBar';
import OrderList from '../components/Orders/OrderList';

function Orders() {
  return (
    <section>
      <NavBar />
      <OrderList userRole="customer" />
    </section>
  );
}

export default Orders;
