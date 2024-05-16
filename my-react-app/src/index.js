import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <Auth0Provider
    domain="dev-we3vguqrc7tyu1mr.us.auth0.com"
    clientId="1nzOnOcVNNFCtzB7CxXV87MpTL6IGb97"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
