import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/customer/products" element={ <Products /> } />
      <Route exact path="/customer/checkout" element={ <Checkout /> } />
      <Route exact path="/admin/manage" element={ <AdminPage /> } />
    </Routes>
  );
}

export default App;
