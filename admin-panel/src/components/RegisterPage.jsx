import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/sugoichan.jpg'; // Assurez-vous que le chemin est correct
import Header from './Header';
import '../styles/index.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'inscription'
    navigate('/dashboard');
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <div className="login-content">
          <img src={loginImage} alt="Login" className="login-image" />
          <form onSubmit={handleSubmit} className="login-form">
            <h2>INSCRIPTION</h2>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="confirmer mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Inscription</button>
            <a href="/" className='a'>J'ai déjà un compte 0w0</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;