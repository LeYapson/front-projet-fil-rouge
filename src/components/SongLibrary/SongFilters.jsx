import React from 'react';

const SongFilters = ({ filters, setFilters }) => {
  const toggleFilter = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  return (
    <div className="song-filters">
      <button
        className={filters.watched ? 'active' : ''}
        onClick={() => toggleFilter('watched')}
      >
        Watched
      </button>
      <button
        className={filters.unwatched ? 'active' : ''}
        onClick={() => toggleFilter('unwatched')}
      >
        Unwatched
      </button>
      <button
        className={filters.openings ? 'active' : ''}
        onClick={() => toggleFilter('openings')}
      >
        Openings
      </button>
      <button
        className={filters.endings ? 'active' : ''}
        onClick={() => toggleFilter('endings')}
      >
        Endings
      </button>
      <button
        className={filters.inserts ? 'active' : ''}
        onClick={() => toggleFilter('inserts')}
      >
        Inserts
      </button>
    </div>
  );
};

export default SongFilters;
