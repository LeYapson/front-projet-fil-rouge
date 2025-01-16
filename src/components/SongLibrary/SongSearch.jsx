import React from 'react';

const SongSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="song-search">
      <input
        type="text"
        placeholder="Rechercher un anime..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SongSearch;
