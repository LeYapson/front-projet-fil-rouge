import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')); // Récupère les données utilisateur

  // Vérifie si l'utilisateur est connecté et a le rôle requis
  if (!token || (requiredRole !== undefined && user?.is_admin !== requiredRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
