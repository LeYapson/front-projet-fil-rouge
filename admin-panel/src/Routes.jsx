import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import HomePage from './pages/HomePage'; // Page d'accueil pour tous
import NotFound from './pages/NotFound';
import RegisterPage from './components/RegisterPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Route publique */}
        <Route path="/" element={<LoginPage />} />

        {/* Page d'inscription */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Page d'accueil accessible à tous après connexion */}
        <Route path="/home" element={<HomePage />} />

        {/* Dashboard admin */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Page 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
