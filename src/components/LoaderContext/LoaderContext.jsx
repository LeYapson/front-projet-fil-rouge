import React, { createContext, useState, useContext } from 'react';

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const startLoading = (duration = 3000) => {
    setLoading(true);
    setProgress(0);

    const interval = 100; // Intervalle en ms
    const step = 100 / (duration / interval); // Progression par étape

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(progressInterval);
          setLoading(false); // Fin du chargement
          setProgress(0);
        }
        return next;
      });
    }, interval);
  };

  return (
    <LoaderContext.Provider value={{ loading, progress, startLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
