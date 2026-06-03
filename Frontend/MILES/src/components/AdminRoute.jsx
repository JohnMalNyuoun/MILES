import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const token = localStorage.getItem('adminToken');
  const persistedUser = localStorage.getItem('adminUser');
  const user = persistedUser ? JSON.parse(persistedUser) : null;

  if (!token || user?.role !== 'admin') {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

export default AdminRoute;
