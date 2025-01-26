import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import HomePage from './pages/Homepage/HomePage'; // Page d'accueil pour tous
import NotFound from './pages/NotFound/NotFound';
import SongLibrary from './components/SongLibrary/SongLibrary';
import SessionList from './components/SessionList/SessionList';
import AuthPage from './pages/AuthPage/AuthPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Route publique */}
        <Route path="/" element={<AuthPage />} />

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
