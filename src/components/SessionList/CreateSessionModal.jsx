import React, { useState } from 'react';
import { createSession } from '../../services/api';
import './CreateSessionModal.css';

const CreateSessionModal = ({ onClose, onSuccess }) => {
  const [sessionName, setSessionName] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState('');
  const [maxSongs, setMaxSongs] = useState(10);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newSession = await createSession({
        session_name: sessionName,
        is_public: isPublic,
        password: isPublic ? null : password,
        max_songs: maxSongs,
      });

      alert('Session créée avec succès !');
      onSuccess(newSession.data); // Ajoute la nouvelle session
      onClose(); // Ferme le modal
    } catch (error) {
      console.error('Erreur lors de la création de la session :', error);
    }
  };

  return (
    <div className="create-session-modal">
      <form onSubmit={handleSubmit}>
        <h2>Créer une session</h2>
        <label>Nom de la session</label>
        <input
          type="text"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          required
        />
        <label>Type de session</label>
        <select
          value={isPublic}
          onChange={(e) => setIsPublic(e.target.value === 'true')}
        >
          <option value="true">Publique</option>
          <option value="false">Privée</option>
        </select>
        {!isPublic && (
          <>
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}
        <label>Nombre maximum de chansons</label>
        <input
          type="number"
          value={maxSongs}
          onChange={(e) => setMaxSongs(Number(e.target.value))}
          min="1"
          max="50"
        />
        <button type="submit">Créer</button>
        <button type="button" onClick={onClose}>Annuler</button>
      </form>
    </div>
  );
};

export default CreateSessionModal;
