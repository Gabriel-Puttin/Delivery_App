import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestData } from '../services/requests';
import NavBar from '../components/NavBar';

function OrdersDetails() {
  const [orders, setOrders] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      const order = await requestData(`/sales/${id}`);
      setOrders(order);
    };
    fetchOrders();
  }, [id]);

  console.log(orders);

  return (
    <section>
      <NavBar />
    </section>
  );
}

export default OrdersDetails;
