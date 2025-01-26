import React, { useState } from 'react';
import Login from '../../components/Login/LoginPage';
import Register from '../../components/Register/RegisterPage';
import './AuthPage.css'; // CSS pour styliser la page
import Logo from '../../assets/sqc_logo2.png';


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // État pour basculer entre Login et Register

  return (
    <div className="auth-page">
      {/* Zone de gauche avec le texte gamifié */}
      <div className="auth-left">
        <img src={Logo} alt="Logo" className="logo" />
        <h1>La révolution des blindtests,<br></br> c'est ici.</h1>
        <p>
          Découvrez une nouvelle manière de jouer avec vos amis !<br></br> Créez des sessions,
          rejoignez des lobbies, et devenez le roi du blindtest !
        </p>
      </div>

      {/* Zone de droite avec le formulaire */}
      <div className="auth-right">
        <div className="auth-toggle">
          <button
            className={isLogin ? 'active' : ''}
            onClick={() => setIsLogin(true)}
          >
            Connexion
          </button>
          <button
            className={!isLogin ? 'active' : ''}
            onClick={() => setIsLogin(false)}
          >
            Inscription
          </button>
        </div>
        <div className="auth-container">
          {isLogin ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
