import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/costumer/checkout" element={ <Checkout /> } />
    </Routes>
  );
}

export default App;
