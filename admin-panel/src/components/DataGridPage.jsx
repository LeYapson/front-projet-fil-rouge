import React, { useState } from 'react'; // Importez useState depuis React
import '../styles/index.css';

const DataGrid = ({ data, columns, onAdd, onEdit, onDelete }) => {
  const [newRow, setNewRow] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (key, value) => {
    setNewRow((prevRow) => ({
      ...prevRow,
      [key]: value,
    }));
  };

  const handleAdd = () => {
    onAdd(newRow);
    setNewRow({});
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewRow(data[index]);
  };

  const handleSaveEdit = (index) => {
    onEdit(index, newRow);
    setEditIndex(null);
    setNewRow({});
  };

  const handleDelete = (index) => {
    onDelete(index);
  };

  return (
    <div className="data-grid-container">
      <div className="data-grid-buttons">
        <button onClick={handleAdd}>Ajouter</button>
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>
                  {editIndex === rowIndex ? (
                    <input
                      type="text"
                      value={newRow[column] || ''}
                      onChange={(e) =>
                        handleInputChange(column, e.target.value)
                      }
                    />
                  ) : (
                    row[column.toLowerCase()] // Utilise les noms de colonnes comme clés d'objet
                  )}
                </td>
              ))}
              <td>
                {editIndex === rowIndex ? (
                  <button onClick={() => handleSaveEdit(rowIndex)}>
                    Enregistrer
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(rowIndex)}>
                      Modifier
                    </button>
                    <button onClick={() => handleDelete(rowIndex)}>
                      Supprimer
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {editIndex === null && (
            <tr>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>
                  <input
                    type="text"
                    value={newRow[column] || ''}
                    onChange={(e) =>
                      handleInputChange(column, e.target.value)
                    }
                  />
                </td>
              ))}
              <td>
                <button onClick={handleAdd}>Ajouter</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
