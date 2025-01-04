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

export const register = (data) => api.post('/register', data);
export const login = (data) => api.post('/login', data);
export const getUsers = (page = 1) => api.get(`/users?page=${page}`);
export const createUser = (data) => api.post('/users', data); // Ajouter un utilisateur
export const updateUser = (id, data) => api.patch(`/users/${id}`, data); // Modifier un utilisateur
export const deleteUser = (id) => api.delete(`/users/${id}`); // Supprimer un utilisateur

