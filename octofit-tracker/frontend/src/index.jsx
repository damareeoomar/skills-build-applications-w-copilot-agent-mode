import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

const apiBase = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/`
  : undefined;

console.log('REACT app starting. API base URL:', apiBase);

root.render(
  <BrowserRouter>
    <App apiBase={apiBase} />
  </BrowserRouter>
);
