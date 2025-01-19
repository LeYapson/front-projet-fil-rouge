import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import Dashboard from './components/Dashboard';
import HomePage from './pages/HomePage'; // Page d'accueil pour tous
import NotFound from './pages/NotFound';
import RegisterPage from './components/Register/RegisterPage';
import SongLibrary from './components/SongLibrary/SongLibrary';
import SessionList from './components/SessionList/SessionList';

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

        {/* Page de la bibliothèque de chansons */}
        <Route path="/library" element={<SongLibrary />} />

        {/* Page des sessions */}
        <Route path="/quiz" element={<SessionList />} />

        {/* Page du lobby */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
