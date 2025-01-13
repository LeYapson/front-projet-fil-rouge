import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2025 SugoiQuiz Chan. Tous droits réservés.</p>
      <div className="footer-links">
        <a href="/faq" className="footer-link">FAQ</a>
        <a href="/donate" className="footer-link">Soutenir</a>
        <a href="/contact" className="footer-link">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
