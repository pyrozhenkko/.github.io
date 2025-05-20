import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();  

  if (loading) {
    return <div className="text-center mt-5">Завантаження...</div>;
  }
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return currentUser ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
