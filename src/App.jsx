import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public pages
import Login from './pages/admin/login/Login';
import Register from './pages/admin/register/Register';
import NotFound from './components/NotFound';


// Admin pages
import DashBoard from './pages/admin/dashboard/DashBoard';
import UserManager from './pages/admin/manager_users/UserManager';
import ProductsManager from './pages/admin/manager_products/ProductsManager';

// Auth
import AdminRoute from './components/AdminRoute';

const App = () => {
  return (
    <Routes>
      {/* Redirect mặc định */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <DashBoard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <UserManager />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <ProductsManager />
          </AdminRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
