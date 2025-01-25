import React from 'react';
import './newssection.css';

const NewsSection = () => {
  return (
    <aside className="news-section">
      <h3>News</h3>
      <p>
        Bientot de nouvel news vont arriver, soyez patients.
      </p>
      <a href="/news" className="news-link">
        En savoir plus
      </a>
    </aside>
  );
};

export default NewsSection;
