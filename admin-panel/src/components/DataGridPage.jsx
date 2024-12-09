import React, { useState } from 'react';
import '../styles/index.css';

const DataGrid = ({ data, columns, onAdd, onEdit, onDelete }) => {
  const [newRow, setNewRow] = useState(Array(columns.length).fill(''));
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (index, value) => {
    const newRowCopy = [...newRow];
    newRowCopy[index] = value;
    setNewRow(newRowCopy);
  };

  const handleAdd = () => {
    onAdd(newRow);
    setNewRow(Array(columns.length).fill(''));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewRow(data[index]);
  };

  const handleSaveEdit = (index) => {
    onEdit(index, newRow);
    setEditIndex(null);
    setNewRow(Array(columns.length).fill(''));
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
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  {editIndex === rowIndex ? (
                    <input
                      type="text"
                      value={newRow[cellIndex]}
                      onChange={(e) => handleInputChange(cellIndex, e.target.value)}
                    />
                  ) : (
                    cell
                  )}
                </td>
              ))}
              <td>
                {editIndex === rowIndex ? (
                  <button onClick={() => handleSaveEdit(rowIndex)}>Enregistrer</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(rowIndex)}>Modifier</button>
                    <button onClick={() => handleDelete(rowIndex)}>Supprimer</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {editIndex === null && (
            <tr>
              {newRow.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleInputChange(cellIndex, e.target.value)}
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
