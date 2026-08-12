import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1b1512',
            color: '#fbf7f0',
            fontSize: '14px',
            borderRadius: '4px',
            border: '1px solid rgba(212,181,121,0.3)',
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
);
