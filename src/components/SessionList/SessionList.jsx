import React, { useState, useEffect } from 'react';
import { fetchSessions, createSession, joinSession } from '../../services/api';
import CreateSessionModal from './CreateSessionModal';

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadSessions = async () => {
      const response = await fetchSessions();
      setSessions(response.data);
    };

    loadSessions();
  }, []);

  return (
    <div>
      <h2>Sessions en ligne</h2>
      <button onClick={() => setShowModal(true)}>Créer une session</button>
      {showModal && <CreateSessionModal onClose={() => setShowModal(false)} />}
      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            {session.session_name} - {session.is_public ? 'Public' : 'Privé'}
            <button onClick={() => joinSession(session.id)}>Rejoindre</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionList;
