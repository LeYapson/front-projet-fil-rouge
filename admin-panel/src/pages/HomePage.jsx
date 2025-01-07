import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Charge les infos utilisateur
    } else {
      console.error('Aucun utilisateur connecté. Redirection vers la page de connexion.');
      navigate('/'); // Redirige vers la page de connexion si non connecté
    }
  }, [navigate]);

  return (
    <div className="homepage-container">
      <h1>Bienvenue sur SugoiQuiz Chan {user?.name} !</h1>
      <p>
        Explorez nos quizz et défiez vos amis dans des matchs épiques sur vos animes préférés !
      </p>
      {user?.is_admin === 1 && (
        <button onClick={() => navigate('/dashboard')} className="admin-button">
          Accéder au Dashboard Admin
        </button>
      )}
    </div>
  );
};

export default HomePage;
