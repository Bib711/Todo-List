import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <App todo={{ id: 1, text: 'Example', completed: false }} />
  </React.StrictMode>,
);

