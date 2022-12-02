import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ModalState } from './context/ModalContext';
import NotesProvider from './context/Notes/NotesContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <NotesProvider>
    <ModalState>
      <App />
    </ModalState>
  </NotesProvider>
);
