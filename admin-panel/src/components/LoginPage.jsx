import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api'; // Appel API pour la connexion
import loginImage from '../assets/sugoichan.jpg'; 
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
      const response = await login({ email, password });
      const token = response.data.token;
      const user = response.data.user;

      // Stocker le token et les données utilisateur
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirige vers la homepage pour tout le monde
      navigate('/home');
    } catch (err) {
      console.error('Erreur lors de la connexion :', err);
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
            {error && <p className="error-message">{error}</p>} {/* Affiche les erreurs */}
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
            <a href="/register">Créer un compte</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
