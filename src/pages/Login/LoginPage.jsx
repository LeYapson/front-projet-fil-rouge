import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import './login.css';
import Header from '../../components/Header/Header';
import { useLoader } from '../../components/LoaderContext/LoaderContext'; // Utilise le contexte de chargement
import LoaderBar from '../../components/LoaderContext/LoaderBar'; // Barre de progression

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { startLoading } = useLoader(); // Accès à la fonction de chargement
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    startLoading(3000); // Démarre la barre de chargement (3 secondes)

    try {
      const response = await login({ email, password });
      const token = response.data.token;
      const user = response.data.user;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/home'); // Redirection après connexion
    } catch (err) {
      setError('Identifiants incorrects. Veuillez réessayer.');
    }
  };

  return (
    <div>
      <Header />
      <LoaderBar /> {/* Barre de progression */}
      <div className="login-container">
        <div className="login-content">
          <h2>Connexion</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="email"
              placeholder="Email"
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
            <button type="submit">
              Se connecter
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
