import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/sugoichan.jpg'; // Assurez-vous que le chemin est correct
import { login } from '../services/api'; // Importe la fonction login de votre api.js
import '../styles/index.css';
import Header from './Header';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      const response = await login({ email, password }); // Appel à l'API
      const token = response.data.token;
      const user = response.data.user;
  
      // Stocker le token et les données utilisateur
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
  
      // Rediriger en fonction du rôle
      if (user.is_admin === 1) {
        navigate('/dashboard');
      } else {
        navigate('/home'); // Page d'accueil pour les utilisateurs non admin
      }
    } catch (err) {
      setError('Identifiants incorrects. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
    <Header />
    <div className="login-container">
      <div className="login-content">
      <img src={loginImage} alt="Login" className="login-image" />
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Connexion</h2>
        {error && <p className="error-message">{error}</p>} {/* Affichage des erreurs */}
        <input
          type="email"
          placeholder="Adresse email"
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
        <button type="submit" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
        <div className="separator">OU</div>
        <a href="/registerPage">Créer un compte</a>
      </form>
      </div>
    </div>
  </div>
  );
};

export default LoginPage;
