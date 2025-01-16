import React, { useState } from 'react';
import '../styles/index.css';

const DataGrid = ({ data = [], columns, onAdd, onEdit, onDelete }) => {
  const [newRow, setNewRow] = useState({});

  const handleAdd = () => {
    onAdd(newRow);
    setNewRow({});
  };

  const handleDelete = (index) => {
    onDelete(index);
  };

  const handleEdit = (index) => {
    onEdit(index);
  };

  console.log('Data reçue dans DataGrid :', data);


  return (
    <div className="data-grid-container">
      <table>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {data && data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{row[col]}</td>
              ))}
              <td>
                <button onClick={() => handleEdit(rowIndex)}>Modifier</button>
                <button onClick={() => handleDelete(rowIndex)}>Supprimer</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + 1}>Aucune donnée disponible</td>
          </tr>
        )}
      </tbody>
      </table>
      <button onClick={handleAdd}>Ajouter</button>
    </div>
  );
};

export default DataGrid;
