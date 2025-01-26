import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';
import Logo from '../../assets/sqc_logo2.png';

const Header = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    
  }

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="logo-section">
      <img src={Logo} alt="Logo" className="logo" />
      </div>
      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <button onClick={() => handleNavigate('/home')}>Accueil</button>
        <button onClick={() => handleNavigate('/library')}>Bibliothèque</button>
        <button onClick={() => handleNavigate('/leaderboard')}>Classements</button>
        {user?.is_admin && (
          <button onClick={() => handleNavigate('/dashboard')}>Admin</button>
        )}
        <button onClick={() => handleNavigate('/profile')}>Profil</button>
        <button onClick={handleLogout}>Déconnexion</button>
      </nav>
      <button
        className="burger-menu"
        onClick={toggleMenu}
      >
        ☰
      </button>
    </header>
  );
};

export default Header;
