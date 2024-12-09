import React from 'react';
import '../styles/index.css';
import logo from '../assets/sugoiquizchan.png';

const Header = ({ logoutButton, userIcon }) => {
  return (
    <header className="site-header">
    {logoutButton && <button onClick={logoutButton.onClick} className="logout-button">{logoutButton.label}</button>}
    <img src={logo} alt="logo" className="logo" />
      {userIcon && <img src={userIcon.src} alt="User Icon" className="user-icon" />}
    </header>
  );
};

export default Header;
