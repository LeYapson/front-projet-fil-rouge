import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewsSection from '../../components/NewsSection/NewsSection';
import Chibicapuche from '../../assets/chibicapuche.png';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './homepage.css';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/'); // Redirige vers la page de connexion si non connecté
    }
  }, [navigate]);

  return (
    <div className="homepage">
  <Header user={user} />
  <main className="main-content">
    <section className="left-section">
      <img src={Chibicapuche} alt="Mascot" className="mascot" />
      <h1>La révolution des blindtests c'est ici !</h1>
      <p>Rejoins des milliers de joueurs dans des quiz immersifs et amusants.</p>
      <NewsSection />
    </section>

    <section className="right-section">
      <button className="play-button">Jouer</button>
      <button className="sessions-button">Voir les sessions</button>
      <button className="leaderboard-button">Classements</button>
    </section>
  </main>

  <Footer />
</div>

  );
};

export default HomePage;
