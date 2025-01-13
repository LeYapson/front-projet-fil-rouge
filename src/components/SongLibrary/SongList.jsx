import React from 'react';

const SongList = ({ songs }) => {
  return (
    <div className="song-list">
      {songs.length === 0 ? (
        <p>Aucune chanson trouvée.</p>
      ) : (
        songs.map((song) => (
          <div key={song.id} className="song-item">
            <h3>{song.title}</h3>
            <p>{song.season}</p>
            <p>Type : {song.type}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SongList;
