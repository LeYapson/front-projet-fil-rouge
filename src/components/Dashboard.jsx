import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';
import '../styles/index.css';
import userIcon from '../assets/chibiprofil.webp';
import chibiIcon from '../assets/chibihappy.png';
import Header from './Header/Header';
import DataGrid from './DataGridPage';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableData, setTableData] = useState({ columns: [], data: [] });
  const [message, setMessage] = useState(''); // Pour les messages de feedback
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    nextPageUrl: null,
    prevPageUrl: null,
  });
  

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Gestion de la navigation
  const handleNavigation = (table) => {
    setSelectedTable(table);
    setTableData(getInitialData(table));
    fetchUsers(); // Charge les utilisateurs dès la sélection de la table
  };

  // Initialisation des données selon la table sélectionnée
  const getInitialData = (table) => {
    switch (table) {
      case 'utilisateurs':
        return {
          columns: ['id', 'name', 'email', 'is_admin'], // Colonnes pour les utilisateurs
          data: [],
        };
      default:
        return { columns: [], data: [] };
    }
  };

  // Récupération des utilisateurs
  const fetchUsers = async (page = 1) => {
    if (!selectedTable) return; // Ne pas exécuter si aucune table sélectionnée
    try {
      const response = await getUsers(page); // Appel API avec la page
      setTableData((prevData) => ({
        ...prevData,
        data: response.data.data, // Données paginées
      }));
      setPagination({
        currentPage: response.data.current_page,
        lastPage: response.data.last_page,
        nextPageUrl: response.data.next_page_url,
        prevPageUrl: response.data.prev_page_url,
      });
      setMessage('Données chargées avec succès.');
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
      setMessage('Erreur lors du chargement des données.');
    }
  };

  // Ajout d'un utilisateur
  const handleAdd = async (newRow) => {
    try {
      const response = await createUser(newRow);
      setTableData((prevData) => ({
        ...prevData,
        data: [...prevData.data, response.data],
      }));
      setMessage('Utilisateur ajouté avec succès.');
    } catch (error) {
      console.error('Erreur lors de l’ajout :', error);
      setMessage('Erreur lors de l’ajout de l’utilisateur.');
    }
  };

  // Modification d'un utilisateur
  const handleEdit = async (index, newRow) => {
    try {
      const id = tableData.data[index].id;
      const response = await updateUser(id, newRow);
      setTableData((prevData) => ({
        ...prevData,
        data: prevData.data.map((row, rowIndex) =>
          rowIndex === index ? response.data : row
        ),
      }));
      setMessage('Utilisateur modifié avec succès.');
    } catch (error) {
      console.error('Erreur lors de la modification :', error);
      setMessage('Erreur lors de la modification de l’utilisateur.');
    }
  };

  // Suppression d'un utilisateur
  const handleDelete = async (index) => {
    try {
      const id = tableData.data[index].id;
      await deleteUser(id);
      setTableData((prevData) => ({
        ...prevData,
        data: prevData.data.filter((_, rowIndex) => rowIndex !== index),
      }));
      setMessage('Utilisateur supprimé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
      setMessage('Erreur lors de la suppression de l’utilisateur.');
    }
  };

  return (
    <div>
      <Header
        logoutButton={{ label: 'Déconnexion', onClick: handleLogout }}
        userIcon={{ src: userIcon }}
      />
      <div className="dashboard-container">
        <div className="management-buttons">
          <button
            onClick={() => handleNavigation('utilisateurs')}
            className={`management-button ${
              selectedTable === 'utilisateurs' ? 'active' : ''
            }`}
          >
            Gestion Utilisateurs
          </button>
          {/* Ajoutez d'autres boutons pour d'autres tables ici */}
        </div>
        {message && <p className="feedback-message">{message}</p>}
        {selectedTable && (
          <>
            <div className="pagination">
              <button
                onClick={() => fetchUsers(pagination.currentPage - 1)}
                disabled={!pagination.prevPageUrl}
              >
                &larr; Précédent
              </button>
              <span>
                Page {pagination.currentPage} sur {pagination.lastPage}
              </span>
              <button
                onClick={() => fetchUsers(pagination.currentPage + 1)}
                disabled={!pagination.nextPageUrl}
              >
                Suivant &rarr;
              </button>
            </div>
            <DataGrid
              data={tableData.data}
              columns={tableData.columns}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <div className="pagination">
              <button
                onClick={() => fetchUsers(pagination.currentPage - 1)}
                disabled={!pagination.prevPageUrl}
              >
                &larr; Précédent
              </button>
              <span>
                Page {pagination.currentPage} sur {pagination.lastPage}
              </span>
              <button
                onClick={() => fetchUsers(pagination.currentPage + 1)}
                disabled={!pagination.nextPageUrl}
              >
                Suivant &rarr;
              </button>
            </div>
          </>
        )}
        <img src={chibiIcon} alt="Chibi Icon" className="chibi-icon" />
      </div>
    </div>
  );
};

export default Dashboard;
