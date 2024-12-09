import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';  
import loginImage from '../assets/sugoichan.jpg'; // Assurez-vous que le chemin est correct
import Header from './Header';
import '../styles/index.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
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
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Connexion</button>
            <div className="separator">OU</div>

            <a href="/register" className='a'>Créer un compte</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;