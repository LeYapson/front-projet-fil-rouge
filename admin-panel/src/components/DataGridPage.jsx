import React, { useState } from 'react'; // Importez useState depuis React
import '../styles/index.css';

const DataGrid = ({ data, columns, onAdd, onEdit, onDelete }) => {
  const [newRow, setNewRow] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false); // Indique si on est en train d'ajouter une entrée

  const handleInputChange = (key, value) => {
    setNewRow((prevRow) => ({
      ...prevRow,
      [key]: value,
    }));
  };

  const handleAdd = () => {
    onAdd(newRow);
    setNewRow({});
    setIsAdding(false); // Ferme le formulaire après l'ajout
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

  const startAdding = () => {
    setIsAdding(true);
    setNewRow({}); // Réinitialise les champs du formulaire
  };

  const cancelAdding = () => {
    setIsAdding(false);
    setNewRow({});
  };

  return (
    <div className="data-grid-container">
      <div className="data-grid-buttons">
        {!isAdding && <button onClick={startAdding}>Ajouter</button>}
        {isAdding && (
          <div className="add-form">
            {columns.map((column, index) => (
              <div key={index} className="form-group">
                <label>{column}</label>
                <input
                  type="text"
                  value={newRow[column] || ''}
                  onChange={(e) => handleInputChange(column, e.target.value)}
                />
              </div>
            ))}
            <button onClick={handleAdd}>Enregistrer</button>
            <button onClick={cancelAdding}>Annuler</button>
          </div>
        )}
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
                    row[column]
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
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;

