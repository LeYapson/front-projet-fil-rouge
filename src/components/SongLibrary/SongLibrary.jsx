import React, { useState, useEffect } from 'react';
import SongSearch from './SongSearch';
import SongFilters from './SongFilters';
import SongList from './SongList';
import './songlibrary.css';
import Header from '../Header/Header';
import { searchAnimes } from '../../services/api'; // Assure-toi que cette fonction existe

const SongLibrary = () => {
  const [animes, setAnimes] = useState([]);
  const [filteredAnimes, setFilteredAnimes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    watched: false,
    unwatched: false,
    openings: false,
    endings: false,
    inserts: false,
  });

  // Appel API pour récupérer les animes
  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await searchAnimes(searchQuery); // Appel à l'API
        const animeList = response.data.data; // Accéder aux données de l'API
        setAnimes(animeList || []); // Assurez-vous que l'état est toujours un tableau
        setFilteredAnimes(animeList || []);
      } catch (error) {
        console.error('Erreur lors du chargement des animes :', error);
      }
    };
  
    fetchAnimes();
  }, [searchQuery]);
  

  // Filtrer les animes en fonction des filtres actifs
  useEffect(() => {
    let filtered = animes;

    if (filters.watched) filtered = filtered.filter((anime) => anime.watched); // Exemple : Adapter selon ta logique
    if (filters.unwatched) filtered = filtered.filter((anime) => !anime.watched);
    if (filters.openings) filtered = filtered.filter((anime) => anime.openings && anime.openings.length > 0);
    if (filters.endings) filtered = filtered.filter((anime) => anime.endings && anime.endings.length > 0);
    if (filters.inserts) filtered = filtered.filter((anime) => anime.inserts && anime.inserts.length > 0);

    if (searchQuery) {
      filtered = filtered.filter((anime) =>
        anime.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredAnimes(filtered);
  }, [filters, searchQuery, animes]);

  return (
    <div className="song-library-container">
      <Header />
      <h2>Bibliothèque des animes</h2>
      <SongSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SongFilters filters={filters} setFilters={setFilters} />
      <SongList songs={filteredAnimes} />
    </div>
  );
};

export default SongLibrary;
