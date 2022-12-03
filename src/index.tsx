import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NotesProvider from './context/Notes/NotesContext';
import { ModalsState } from './context/Modal/ModalContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <NotesProvider>
    <ModalsState>
      <App />
    </ModalsState>
  </NotesProvider>
);
