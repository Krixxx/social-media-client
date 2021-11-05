import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { AppProvider } from './context/appContext';
import { UserProvider } from './context/userContext';
import { DataProvider } from './context/dataContext';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
