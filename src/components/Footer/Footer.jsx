import React from 'react';
import { useNavigate } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-links">
        <button onClick={() => navigate('/about')}>À propos</button>
        <button onClick={() => navigate('/faq')}>FAQ</button>
        <button onClick={() => navigate('/donate')}>Donate</button>
        <button onClick={() => navigate('/support')}>Support</button>
      </div>
      <p>&copy; 2025 SugoiQuiz Chan. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
