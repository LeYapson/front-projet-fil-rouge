import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./donate.css";

const DonatePage = () => {
  return (
    <div>
      <Header />
      <div className="donate-container">
        <h1 className="donate-title">Soutenez SugoiQuiz Chan 🎵</h1>
        <p className="donate-description">
          SugoiQuiz Chan est une plateforme entièrement gratuite créée par des passionnés pour des passionnés d'anime. 
          Vos dons nous permettent de maintenir le site, d'ajouter de nouvelles fonctionnalités et d'améliorer votre expérience.
        </p>

        <div className="donate-options">
          <h2 className="donate-subtitle">Comment soutenir ?</h2>
          <ul>
            <li>
              <strong>Don unique : </strong>
              Soutenez-nous avec le montant de votre choix.
            </li>
            <li>
              <strong>Abonnement mensuel : </strong>
              Rejoignez notre programme de donateurs réguliers et bénéficiez de bonus exclusifs.
            </li>
            <li>
              <strong>Partage : </strong>
              Si vous ne pouvez pas donner, partagez notre projet avec vos amis !
            </li>
          </ul>
        </div>

        <div className="donate-buttons">
          <button className="donate-button">Faire un don unique</button>
          <button className="donate-button">Devenir donateur mensuel</button>
        </div>

        <p className="donate-thankyou">
          Merci pour votre soutien, vous faites partie de l'aventure ! 💖
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default DonatePage;
