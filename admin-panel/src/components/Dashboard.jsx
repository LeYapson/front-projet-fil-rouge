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
  
    const handleLogout = () => {
      localStorage.removeItem('token'); 
      navigate('/');
    };
  
    const handleNavigation = (table) => {
      setSelectedTable(table);
      setTableData(getInitialData(table));
    };
  
    const getInitialData = (table) => {
      switch (table) {
        case 'utilisateurs':
          return {
            columns: ['ID', 'Nom', 'Email'],
            data: [],
          };
        // Ajoutez d'autres cas selon vos besoins
        default:
          return { columns: [], data: [] };
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setTableData((prevData) => ({
          ...prevData,
          data: response.data,
        }));
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
  
    useEffect(() => {
      if (selectedTable === 'utilisateurs') {
        fetchUsers();
      }
    }, [selectedTable]);
  
    const handleAdd = async (newRow) => {
      try {
        const response = await createUser(newRow);
        setTableData((prevData) => ({
          ...prevData,
          data: [...prevData.data, response.data],
        }));
      } catch (error) {
        console.error('Failed to add user:', error);
      }
    };
  
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
        console.error('Failed to update user:', error);
      }
    };
  
    const handleDelete = async (index) => {
      try {
        const id = tableData.data[index].id;
        await deleteUser(id);
        setTableData((prevData) => ({
          ...prevData,
          data: prevData.data.filter((row, rowIndex) => rowIndex !== index),
        }));
      } catch (error) {
        console.error('Failed to delete user:', error);
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
            <button onClick={() => handleNavigation('utilisateurs')} className="management-button">gestion utilisateurs</button>
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
  