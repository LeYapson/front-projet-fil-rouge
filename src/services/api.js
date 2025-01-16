// src/services/api.js
import axios from 'axios';

const API_URL = 'http://sugoiquiz-chan.test/api'; // Remplacez par l'URL de votre back-end

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => api.post('/users/create', data);
export const login = (data) => api.post('/login', data);


export const getUsers = (page = 1) => api.get(`/users?page=${page}`);
export const createUser = (data) => api.post('/users', data); // Ajouter un utilisateur
export const updateUser = (id, data) => api.patch(`/users/${id}`, data); // Modifier un utilisateur
export const deleteUser = (id) => api.delete(`/users/${id}`); // Supprimer un utilisateur
export const getCurrentUser = () => api.get('/user');


export const getAnimes = (page = 1) => api.get(`/animes?page=${page}`);
export const createAnime = (data) => api.post('/animes', data);
export const updateAnime = (id, data) => api.patch(`/animes/${id}`, data);
export const deleteAnime = (id) => api.delete(`/animes/${id}`);
export const searchAnimes = (query) => api.get(`/animes/search`, { params: { query } });



