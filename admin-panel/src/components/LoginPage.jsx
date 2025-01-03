import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';  
import loginImage from '../assets/sugoichan.jpg'; // Assurez-vous que le chemin est correct
import Header from './Header';
import '../styles/index.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    setError(''); // Réinitialise le message d'erreur

    try {
      const response = await login({ email, password });
      localStorage.setItem('token', response.data.token);
      setEmail('');
      setPassword('');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
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
            <h2>CONNEXION</h2>

            {/* Affichage des erreurs */}
            {error && <p className="error-message">{error}</p>}

            <input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Adresse email"
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Mot de passe"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Connexion...' : 'Connexion'}
            </button>

            <div className="separator">OU</div>
            <a href="/register" className="a">Créer un compte</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
