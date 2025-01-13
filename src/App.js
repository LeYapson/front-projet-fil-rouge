import React from 'react';
import AppRoutes from './Routes';
import { LoaderProvider } from './components/LoaderContext/LoaderContext';
import './styles/index.css';

const App = () => {
  return (
    <div className="App">
      <LoaderProvider>
        <AppRoutes />
      </LoaderProvider>
    </div>
  );
};

export default App;
