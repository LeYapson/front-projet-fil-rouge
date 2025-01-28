import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./faq.css";

const FAQPage = () => {
  const faqs = [
    {
      question: "Qu'est-ce que SugoiQuiz Chan ?",
      answer:
        "SugoiQuiz Chan est une plateforme gamifiée pour jouer à des blindtests musicaux basés sur vos animes préférés. Découvrez qui est le vrai expert otaku !",
    },
    {
      question: "Comment créer une session de jeu ?",
      answer:
        "Rendez-vous sur la page de sessions en ligne et cliquez sur 'Créer une session'. Configurez vos préférences (nombre de musiques, public ou privé, etc.) et partagez l'accès avec vos amis.",
    },
    {
      question: "Est-ce que je peux jouer gratuitement ?",
      answer:
        "Oui ! SugoiQuiz Chan est entièrement gratuit. Cependant, un abonnement premium est prévu à l'avenir pour débloquer des fonctionnalités spéciales.",
    },
    {
      question: "Comment signaler un problème avec une chanson ?",
      answer:
        "Vous pouvez signaler un problème directement depuis la page de la chanson en cliquant sur 'Signaler un problème'. Nous traiterons votre requête rapidement.",
    },
    {
      question: "Je suis administrateur, comment gérer le contenu ?",
      answer:
        "Les administrateurs ont accès au tableau de bord où ils peuvent gérer les utilisateurs, les animes, les musiques et les sessions en cours.",
    },
  ];

  return (
    <div>
      <Header />
      <div className="faq-container">
        <h1 className="faq-title">FAQ - Foire aux questions</h1>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={index} className="faq-item">
              <summary className="faq-question">{faq.question}</summary>
              <p className="faq-answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;
