import React from 'react';
import NavBar from '../components/NavBar';
import OrderList from '../components/Orders/OrderList';

function SellerOrders() {
  return (
    <section>
      <NavBar />
      <OrderList userRole="seller" />
    </section>
  );
}

export default SellerOrders;
