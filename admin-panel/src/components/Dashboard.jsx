import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';
import '../styles/index.css';
import userIcon from '../assets/chibiprofil.webp'; // Assurez-vous que le chemin est correct
import chibiIcon from '../assets/chibihappy.png'; // Assurez-vous que le chemin est correct
import Header from './Header';
import DataGrid from './DataGridPage';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableData, setTableData] = useState({ columns: [], data: [] });

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Gestion de la navigation
  const handleNavigation = (table) => {
    setSelectedTable(table);
    setTableData(getInitialData(table));
  };

  // Initialisation des données selon la table sélectionnée
  const getInitialData = (table) => {
    switch (table) {
      case 'utilisateurs':
        return {
          columns: ['ID', 'Name', 'Email', 'Password', 'Is_Admin'],
          data: [],
        };
      default:
        return { columns: [], data: [] };
    }
  };

  // Récupération des utilisateurs
  const fetchUsers = async () => {
    try {
      const response = await getUsers(); // Appel de l'API via Axios
      setTableData((prevData) => ({
        ...prevData,
        data: response.data, // Axios retourne directement les données dans response.data
      }));
      console.log('Données reçues et mises à jour :', response.data);
    } catch (error) {
      console.error('Échec de la récupération des utilisateurs :', error);
    }
  };

  // Appeler fetchUsers si la table "utilisateurs" est sélectionnée
  useEffect(() => {
    if (selectedTable === 'utilisateurs') {
      fetchUsers();
    }
  }, [selectedTable]);

  // Ajout d'un utilisateur
  const handleAdd = async (newRow) => {
    try {
      const response = await createUser(newRow);
      setTableData((prevData) => ({
        ...prevData,
        data: [...prevData.data, response.data],
      }));
    } catch (error) {
      console.error('Échec de l\'ajout d\'un utilisateur :', error);
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
    } catch (error) {
      console.error('Échec de la modification de l\'utilisateur :', error);
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
    } catch (error) {
      console.error('Échec de la suppression de l\'utilisateur :', error);
    }
  };

  const { columns, data } = tableData;

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
            className="management-button"
          >
            Gestion Utilisateurs
          </button>
          {/* Ajoutez d'autres boutons selon vos besoins */}
        </div>
        {selectedTable && (
          <DataGrid
            data={data}
            columns={columns}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        <img src={chibiIcon} alt="Chibi Icon" className="chibi-icon" />
      </div>
    </div>
  );
};

export default Dashboard;
