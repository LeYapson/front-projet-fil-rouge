import React from 'react';
import '../styles/newssection.css';

const NewsSection = () => {
  return (
    <aside className="news-section">
      <h3>News</h3>
      <p>
        Nouveaux skins d'hiver disponibles ! Découvrez les dernières mises à jour et profitez
        de nouveaux quizz et fonctionnalités !
      </p>
      <a href="/news" className="news-link">
        En savoir plus
      </a>
    </aside>
  );
};

export default NewsSection;
