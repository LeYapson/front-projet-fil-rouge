import React, { useState, useEffect } from 'react';
import SongSearch from './SongSearch';
import SongFilters from './SongFilters';
import SongList from './SongList';
import './songlibrary.css';
import Header from '../Header/Header';

const SongLibrary = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    watched: false,
    unwatched: false,
    openings: false,
    endings: false,
    inserts: false,
  });

  // Appel API pour récupérer les chansons
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('/api/songs'); // Remplace par ton endpoint API
        const data = await response.json();
        setSongs(data);
        setFilteredSongs(data);
      } catch (error) {
        console.error('Erreur lors du chargement des chansons :', error);
      }
    };

    fetchSongs();
  }, []);

  // Filtrer les chansons en fonction des filtres actifs
  useEffect(() => {
    let filtered = songs;

    if (filters.watched) filtered = filtered.filter((song) => song.watched);
    if (filters.unwatched) filtered = filtered.filter((song) => !song.watched);
    if (filters.openings) filtered = filtered.filter((song) => song.type === 'OP');
    if (filters.endings) filtered = filtered.filter((song) => song.type === 'ED');
    if (filters.inserts) filtered = filtered.filter((song) => song.type === 'IN');

    if (searchQuery) {
      filtered = filtered.filter((song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredSongs(filtered);
  }, [filters, searchQuery, songs]);

  return (
    <div className="song-library-container">
        <Header />
      <h2>Bibliothèque de chansons</h2>
      <SongSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SongFilters filters={filters} setFilters={setFilters} />
      <SongList songs={filteredSongs} />
    </div>
  );
};

export default SongLibrary;
