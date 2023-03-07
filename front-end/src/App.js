import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import Orders from './pages/Orders';
import OrdersDetails from './pages/OrdersDetails';
import SellerOrders from './pages/SellerOrders';
import SellerOrdersDetails from './pages/SellerOrdersDetails';
import AdminPage from './pages/AdminPage';
import DeliveryAppProvider from './context/DeliveryAppProvider';

function App() {
  return (
    <DeliveryAppProvider>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/register" element={ <Register /> } />
        <Route exact path="/customer/products" element={ <Products /> } />
        <Route exact path="/customer/checkout" element={ <Checkout /> } />
        <Route exact path="/customer/orders" element={ <Orders /> } />
        <Route exact path="/customer/orders/:id" element={ <OrdersDetails /> } />
        <Route exact path="/seller/orders" element={ <SellerOrders /> } />
        <Route exact path="/seller/orders/:id" element={ <SellerOrdersDetails /> } />
        <Route exact path="/admin/manage" element={ <AdminPage /> } />
      </Routes>
    </DeliveryAppProvider>
  );
}

export default App;
