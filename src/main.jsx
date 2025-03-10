/*
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SchoolProvider } from './context/SchoolContext'; // Import the provider
import './styles/App.css'; // Importing global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SchoolProvider>
      <App />
    </SchoolProvider>
  </React.StrictMode>
);
