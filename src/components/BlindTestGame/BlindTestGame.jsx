import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSong, submitAnswer, fetchScores } from '../../services/api';
import './BlindTestGame.css';

const BlindTestGame = () => {
  const [song, setSong] = useState(null);
  const [answer, setAnswer] = useState('');
  const [scores, setScores] = useState([]);
  const [message, setMessage] = useState('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const { lobbyId } = useParams(); // Récupère l'ID du lobby

  useEffect(() => {
    const loadSong = async () => {
      try {
        const response = await fetchSong(lobbyId);
        setSong(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement de la chanson :', error);
        setMessage('Impossible de charger la chanson.');
      }
    };

    loadSong();
  }, [lobbyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitAnswer(lobbyId, { answer });
      setIsAnswerSubmitted(true);
      setMessage('Réponse envoyée.');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la réponse :', error);
      setMessage('Impossible d\'envoyer la réponse.');
    }
  };

  useEffect(() => {
    const loadScores = async () => {
      try {
        const response = await fetchScores(lobbyId);
        setScores(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des scores :', error);
      }
    };

    if (isAnswerSubmitted) {
      const interval = setInterval(loadScores, 5000); // Met à jour les scores toutes les 5 secondes
      return () => clearInterval(interval);
    }
  }, [lobbyId, isAnswerSubmitted]);

  if (!song) return <p>Chargement de la chanson...</p>;

  return (
    <div className="blindtest-game-container">
      <h2>BlindTest</h2>
      <audio controls autoPlay>
        <source src={song.audio_url} type="audio/mp3" />
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Votre réponse"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={isAnswerSubmitted}
          required
        />
        <button type="submit" disabled={isAnswerSubmitted}>
          Envoyer
        </button>
      </form>
      {message && <p>{message}</p>}
      <h3>Scores</h3>
      <ul>
        {scores.map((player) => (
          <li key={player.id}>
            {player.name}: {player.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlindTestGame;
