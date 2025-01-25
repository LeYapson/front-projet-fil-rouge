import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/sqc_logo(2).png';
import './header.css';

const Header = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Permet de vérifier la page actuelle

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  // Vérifie si on est sur une page publique (Login ou Register)
  const isPublicPage = location.pathname === '/' || location.pathname === '/register';

  return (
    <header className="site-header">
      {/* Logo cliquable pour revenir à la homepage */}
      <img
        src={logo}
        alt="SugoiQuiz Logo"
        className="logo"
        onClick={() => navigate('/home')}
      />

      {/* Menu utilisateur (masqué sur les pages publiques) */}
      {!isPublicPage && (
        <div className="user-menu">
          <button
            className="menu-button"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            Menu ▾
          </button>
          {menuOpen && (
            <div className="dropdown-menu">
              {user?.is_admin === 1 && (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="dropdown-item"
                >
                  Panel Admin
                </button>
              )}
              <button onClick={handleLogout} className="dropdown-item">
                Déconnexion
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
