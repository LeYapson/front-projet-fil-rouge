import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/mainbuttons.css';

const MainButtons = () => {
  const navigate = useNavigate();

  return (
    <main className="main-buttons-container">
      <button onClick={() => navigate('/quiz')} className="main-button">
        Jouer
      </button>
      <button onClick={() => navigate('/quiz-of-the-day')} className="main-button">
        Quiz du Jour
      </button>
      <button onClick={() => navigate('/library')} className="main-button">
        Bibliothèque de chansons
      </button>
      <button onClick={() => navigate('/leaderboard')} className="main-button">
        Classement
      </button>
    </main>
  );
};

export default MainButtons;
