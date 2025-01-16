import React from 'react';

const SongList = ({ songs }) => {
  if (!songs || songs.length === 0) {
    return <p>Aucun résultat trouvé.</p>;
  }

  return (
    <ul>
      {songs.map((song) => (
        <li key={song.id}>
          <h3>{song.title}</h3>
          <p>{song.description}</p>
          <img src={song.image} alt={song.title} />
        </li>
      ))}
    </ul>
  );
};

export default SongList;
