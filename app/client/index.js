import React from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './components/App.jsx';
import remote from './remote.js';
import './index.scss';

ReactDOMClient.createRoot(document.getElementById('root')).render(React.createElement(App));

if (process.env['NODE_ENV'] === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').then((registration) => {
      console.log('Service Worker registered: ', registration);
    }).catch((registrationError) => {
      console.error('Service Worker registration failed: ', registrationError);
    });
  });
}
