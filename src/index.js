import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from '@descope/react-sdk';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider projectId='P2dhhp4gMs2Mj5dMPCiMTnsQ0sTG'>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
