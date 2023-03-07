import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/Checkout/CheckoutForm';
import CheckoutTable from '../components/Checkout/CheckoutTable';
import NavBar from '../components/NavBar';
import { requestPost } from '../services/requests';

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('carrinho'));
    setProducts(cartItems.filter((product) => product.quantity > 0));
  }, []);

  useEffect(() => {
    const total = products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setTotalPrice(total);
  }, [products]);

  const onRemoveItemBtnClick = (indexToRemove) => {
    const updatedCart = products.filter((_product, index) => index !== indexToRemove);
    setProducts(updatedCart);
  };

  const finishOrder = async (form) => {
    const orderInfo = { ...form, totalPrice };
    const order = { orderInfo, products };
    const { id } = await requestPost('/sales', order);
    navigate(`/customer/orders/${id}`);
  };

  return (
    <section>
      <NavBar />
      <CheckoutTable
        products={ products }
        totalPrice={ totalPrice }
        onRemoveItemBtnClick={ onRemoveItemBtnClick }
      />
      <CheckoutForm finishOrder={ finishOrder } />
    </section>
  );
}
