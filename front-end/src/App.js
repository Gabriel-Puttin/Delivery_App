import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
    </Routes>
  );
}

export default App;
