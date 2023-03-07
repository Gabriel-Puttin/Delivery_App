import React from 'react';
import NavBar from '../components/NavBar';
import OrderDetailsTable from '../components/OrderDetails/OrderDetailsTable';
import OrderDetailsHeader from '../components/OrderDetails/OrderDetailsHeader';

function OrdersDetails() {
  return (
    <section>
      <NavBar />
      <OrderDetailsHeader userRole="customer" />
      <OrderDetailsTable userRole="customer" />
    </section>
  );
}

export default OrdersDetails;
