import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes.jsx';
import './styles/globals.css';
import './styles/gradients.css';
import './styles/shadows.css';
import './styles/transitions.css';
import './styles/components.css';

export default function App() {
  return (
    <BrowserRouter basename="/nexus">
      <AppRoutes />
    </BrowserRouter>
  );
}
