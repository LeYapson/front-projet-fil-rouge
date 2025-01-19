import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api'; // Assurez-vous que cette méthode est bien définie
import Header from '../Header/Header';
import './register.css';
import { useLoader } from '../LoaderContext/LoaderContext'; // Utilisation du contexte pour le loader
import LoaderBar from '../LoaderContext/LoaderBar'; // Barre de progression

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { startLoading } = useLoader(); // Accès à la fonction de chargement
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Vérification des mots de passe
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Démarrer la barre de progression
    startLoading(3000); // Par exemple, 3 secondes

    try {
      // Appel de l'API pour enregistrer l'utilisateur
      const response = await registerUser({
        name: username,
        email: email,
        password: password,
        is_admin: 0, // Ajout d'un utilisateur normal
      });

      console.log('Utilisateur enregistré avec succès :', response.data);
      navigate('/'); // Redirection vers la homepage après inscription
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div>
      <Header />
      <LoaderBar /> {/* Barre de progression */}
      <div className="login-container">
        <div className="login-content">
          <form onSubmit={handleSubmit} className="login-form">
            <h2>INSCRIPTION</h2>
            {error && <p className="error-message">{error}</p>}
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">
              Inscription
            </button>
            <a href="/" className="a">J'ai déjà un compte 0w0</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
