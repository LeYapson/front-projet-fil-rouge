import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchLobby, startSession, leaveLobby } from '../../services/api';
import './Lobby.css';

const Lobby = () => {
  const [lobby, setLobby] = useState(null);
  const [timer, setTimer] = useState(180); // 3 minutes
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { lobbyId } = useParams(); // Récupère l'ID du lobby dans l'URL

  useEffect(() => {
    const loadLobby = async () => {
      try {
        const response = await fetchLobby(lobbyId);
        setLobby(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement du lobby :', error);
        setMessage('Impossible de charger le lobby.');
      }
    };

    loadLobby();
  }, [lobbyId]);

  // Timer pour détruire automatiquement le lobby après 3 minutes
  useEffect(() => {
    if (timer <= 0) {
      alert('Le lobby a expiré.');
      navigate('/sessions'); // Retourne à la liste des sessions
      return;
    }

    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, navigate]);

  const handleStart = async () => {
    try {
      await startSession(lobbyId);
      navigate(`/blindtest/${lobbyId}`); // Redirige vers la page du jeu
    } catch (error) {
      console.error('Erreur lors du démarrage de la session :', error);
      setMessage('Impossible de démarrer la session.');
    }
  };

  const handleLeave = async () => {
    try {
      await leaveLobby(lobbyId);
      navigate('/sessions');
    } catch (error) {
      console.error('Erreur lors de la sortie du lobby :', error);
    }
  };

  if (!lobby) return <p>Chargement du lobby...</p>;

  return (
    <div className="lobby-container">
      <h2>Lobby: {lobby.session_name}</h2>
      <p>Hôte: {lobby.host_name}</p>
      <p>Temps restant : {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}</p>
      <ul>
        {lobby.players.map((player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
      {message && <p>{message}</p>}
      <div className="lobby-actions">
        {lobby.is_host && <button onClick={handleStart}>Commencer</button>}
        <button onClick={handleLeave}>Quitter</button>
      </div>
    </div>
  );
};

export default Lobby;
