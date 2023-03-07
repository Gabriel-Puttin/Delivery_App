import React from 'react';
import NavBar from '../components/NavBar';
import OrderDetailsTable from '../components/OrderDetails/OrderDetailsTable';
import OrderDetailsHeader from '../components/OrderDetails/OrderDetailsHeader';

function SellerOrdersDetails() {
  return (
    <section>
      <NavBar />
      <OrderDetailsHeader userRole="seller" />
      <OrderDetailsTable userRole="seller" />
    </section>
  );
}

export default SellerOrdersDetails;
