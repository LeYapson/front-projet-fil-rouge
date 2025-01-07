import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MainButtons from '../components/MainButtons';
import NewsSection from '../components/NewsSection';
import Footer from '../components/Footer';
import '../styles/homepage.css';

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
      {/* Header */}
      <Header user={user} />

      {/* Section principale */}
      <MainButtons user={user} />

      {/* Section des news */}
      <NewsSection />

      {/* Pied de page */}
      <Footer />
    </div>
  );
};

export default HomePage;
