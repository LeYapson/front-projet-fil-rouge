import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './about.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Découvrez SugoiQuiz Chan</h1>
          <p className="hero-subtitle">
            La révolution des blindtests pour les fans d'anime et de musique.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="introduction-section">
        <div className="content">
          <h2>Qui sommes-nous ?</h2>
          <p>
            SugoiQuiz Chan est né de la passion pour les animés et la musique. Notre
            objectif ? Créer une expérience immersive et amusante pour réunir les
            fans à travers des blindtests uniques et compétitifs.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="content">
          <h2>Ce que nous offrons</h2>
          <ul>
            <li>Blindtests publics et privés.</li>
            <li>Classements et scores pour pimenter vos parties.</li>
            <li>Modes de jeu variés : solo ou multijoueur.</li>
            <li>Personnalisation : avatars, playlists et plus encore.</li>
          </ul>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <div className="content">
          <h2>Notre vision</h2>
          <p>
            Nous croyons en une communauté inclusive où chacun peut s’amuser et
            partager sa passion. SugoiQuiz Chan, c’est une plateforme en constante
            évolution, pensée pour vous offrir la meilleure expérience possible.
          </p>
        </div>
      </section>

      {/* Future Section */}
      <section className="future-section">
        <div className="content">
          <h2>Nos perspectives</h2>
          <p>
            Nous travaillons sur de nombreuses fonctionnalités à venir :
          </p>
          <ul>
            <li>Application mobile pour jouer partout, tout le temps.</li>
            <li>Grades premium avec des avantages spéciaux.</li>
            <li>Modes de jeu encore plus diversifiés.</li>
          </ul>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="content">
          <h2>Rejoignez la communauté SugoiQuiz Chan</h2>
          <p>Inscrivez-vous dès maintenant et commencez votre aventure !</p>
          <button className="cta-button" onClick={() => window.location.href = '/register'}>
            S'inscrire
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
