import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./support.css";

const SupportPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simule l'envoi du message
    console.log("Message envoyé :", form);
    setSubmitted(true);
    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div>
      <Header />
      <div className="support-container">
        <h1 className="support-title">Besoin d'aide ? Contactez-nous 📩</h1>
        <p className="support-description">
          Vous avez une question, une suggestion ou un problème ? Remplissez le
          formulaire ci-dessous et notre équipe vous répondra rapidement.
        </p>

        {submitted ? (
          <div className="support-thankyou">
            Merci pour votre message ! Nous vous répondrons dans les plus brefs
            délais. 😊
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="support-form">
            <div className="form-group">
              <label htmlFor="name">Nom :</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message :</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="support-button">
              Envoyer
            </button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SupportPage;
