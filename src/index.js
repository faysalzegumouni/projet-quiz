import React from 'react';
import App from './App';

// Import createRoot from "react-dom/client"
import { createRoot } from 'react-dom/client';

// Use createRoot to render the app in React 18
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
