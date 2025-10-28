// src/components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('token') !== null;
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default AdminRoute;
