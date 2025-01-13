import React from 'react';
import { useLoader } from './LoaderContext';
import './LoaderBar.css'; // Ajouter du style spécifique ici

const LoaderBar = () => {
  const { loading, progress } = useLoader();

  if (!loading) return null;

  return (
    <div className="loader-bar-container">
      <div
        className="loader-bar"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default LoaderBar;
