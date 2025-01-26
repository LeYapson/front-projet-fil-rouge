import React, { useState, useEffect, useCallback } from 'react';
import { getUsers, createUser, updateUser, deleteUser, getAnimes, createAnime, updateAnime, deleteAnime } from '../../services/api';
import './dashboard.css';
import Header from '../../components/Header/Header';
import DataGrid from '../../components/DataGrid/DataGridPage';

const Dashboard = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableData, setTableData] = useState({ columns: [], data: [] });
  const [message, setMessage] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    nextPageUrl: null,
    prevPageUrl: null,
  });

  // Gestion de la navigation
  const handleNavigation = (table) => {
    setSelectedTable(table);
    setTableData(getInitialData(table));
  };

  // Initialisation des données pour chaque table
  const getInitialData = (table) => {
    switch (table) {
      case 'utilisateurs':
        return {
          columns: ['id', 'name', 'email'],
          data: [],
        };
      case 'animes':
        return {
          columns: ['id', 'title', 'release_date' ],
          data: [],
        };
      default:
        return { columns: [], data: [] };
    }
  };



  const fetchTableData = useCallback(async (page = 1) => {
    if (!selectedTable) return;

    try {
      let response;
      if (selectedTable === 'utilisateurs') {
        response = await getUsers(page);
      } else if (selectedTable === 'animes') {
        response = await getAnimes(page);
      }

      console.log('Réponse reçue :', response.data); // Ajoutez cette ligne

      setTableData((prevData) => ({
        ...prevData,
        data: response.data.data,
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
  }, [selectedTable]); // Dépend de selectedTable

  useEffect(() => {
    if (selectedTable) {
      fetchTableData();
    }
  }, [selectedTable, fetchTableData]); // Inclure fetchTableData dans les dépendances



  // Ajouter une entrée
  const handleAdd = async (newRow) => {
    try {
      let response;
      if (selectedTable === 'utilisateurs') {
        response = await createUser(newRow);
      } else if (selectedTable === 'animes') {
        response = await createAnime(newRow);
      }

      setTableData((prevData) => ({
        ...prevData,
        data: [...prevData.data, response.data],
      }));

      setMessage('Donnée ajoutée avec succès.');
    } catch (error) {
      console.error('Erreur lors de l’ajout :', error);
      setMessage('Erreur lors de l’ajout.');
    }
  };

  // Modifier une entrée
  const handleEdit = async (index, newRow) => {
    try {
      const id = tableData.data[index].id;
      let response;

      if (selectedTable === 'utilisateurs') {
        response = await updateUser(id, newRow);
      } else if (selectedTable === 'animes') {
        response = await updateAnime(id, newRow);
      }

      setTableData((prevData) => ({
        ...prevData,
        data: prevData.data.map((row, rowIndex) =>
          rowIndex === index ? response.data : row
        ),
      }));

      setMessage('Donnée modifiée avec succès.');
    } catch (error) {
      console.error('Erreur lors de la modification :', error);
      setMessage('Erreur lors de la modification.');
    }
  };

  // Supprimer une entrée
  const handleDelete = async (index) => {
    try {
      const id = tableData.data[index].id;

      if (selectedTable === 'utilisateurs') {
        await deleteUser(id);
      } else if (selectedTable === 'animes') {
        await deleteAnime(id);
      }

      setTableData((prevData) => ({
        ...prevData,
        data: prevData.data.filter((_, rowIndex) => rowIndex !== index),
      }));

      setMessage('Donnée supprimée avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
      setMessage('Erreur lors de la suppression.');
    }
  };

  return (
    <div>
      <Header />
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
          <button
            onClick={() => handleNavigation('animes')}
            className={`management-button ${
              selectedTable === 'animes' ? 'active' : ''
            }`}
          >
            Gestion Animes
          </button>
        </div>
        {message && <p className="feedback-message">{message}</p>}
        {selectedTable && (
          <>
            <div className="pagination">
              <button
                onClick={() => fetchTableData(pagination.currentPage - 1)}
                disabled={!pagination.prevPageUrl}
              >
                &larr; Précédent
              </button>
              <span>
                Page {pagination.currentPage} sur {pagination.lastPage}
              </span>
              <button
                onClick={() => fetchTableData(pagination.currentPage + 1)}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
