import React from 'react';
import notFoundImage from '../assets/chibi404.png'; // Assurez-vous que le chemin est correct
import Header from '../components/Header/Header';
import '../styles/index.css';

const NotFound = () => {
  return (
    <div>
      <Header />
      <div className="not-found-container">
        <h1 className="not-found-title">404 - Page Not Found</h1>
        <p className="not-found-text">Oops! La page que vous cherchez n'existe pas.</p>
        <img src={notFoundImage} alt="Not Found" className="not-found-image" />
      </div>
    </div>
  );
};

export default NotFound;
