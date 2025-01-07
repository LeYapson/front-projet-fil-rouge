import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api'; // Assurez-vous que cette méthode est bien définie
import Header from './Header';
import '../styles/register.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Vérification des mots de passe
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      // Appel de l'API pour enregistrer l'utilisateur
      const response = await registerUser({
        name: username,
        email: email,
        password: password,
        is_admin: false, // Ajout d'un utilisateur normal
      });

      console.log('Utilisateur enregistré avec succès :', response.data);
      navigate('/'); // Redirection vers la homepage
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <div className="login-content">
          <form onSubmit={handleSubmit} className="login-form">
            <h2>INSCRIPTION</h2>
            {error && <p className="error-message">{error}</p>}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <button type="submit" disabled={loading}>
              {loading ? 'Inscription...' : 'Inscription'}
            </button>
            <a href="/" className="a">J'ai déjà un compte 0w0</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
