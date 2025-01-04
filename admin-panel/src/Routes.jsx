import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import HomePage from './pages/HomePage'; // Page d'accueil pour les non-admins
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Route publique */}
        <Route path="/" element={<LoginPage />} />

        {/* Route protégée pour les admins */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute requiredRole={1}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Route protégée pour les utilisateurs non admin */}
        <Route
          path="/home"
          element={
            <PrivateRoute requiredRole={0}>
              <HomePage />
            </PrivateRoute>
          }
        />

        {/* Page 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
