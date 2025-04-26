// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserFromToken } from '../utils/getUserFromToken';

export default function ProtectedRoute({ children, roles = [] }) {
  const user = getUserFromToken();

  if (!user) return <Navigate to="/login" />;

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" />; // or show "Not Authorized" page
  }

  return children;
}
