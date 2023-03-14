import React from 'react';
import NavBar from '../components/NavBar';
import OrderDetailsTable from '../components/OrderDetails/OrderDetailsTable';
import OrderDetailsHeader from '../components/OrderDetails/OrderDetailsHeader';

function OrdersDetails() {
  return (
    <section>
      <NavBar />
      <section className="mt-4 d-flex flex-column align-items-center">
        <div>
          <h2 className="ms-2 align-self-start">Detalhe do pedido</h2>
          <div className="cards_products">
            <OrderDetailsHeader userRole="customer" />
            <OrderDetailsTable userRole="customer" />
          </div>
        </div>
      </section>
    </section>
  );
}

export default OrdersDetails;
