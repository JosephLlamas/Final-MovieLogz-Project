import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider 
  domain={dev-b7gbnlo0ae4ymnns.us.auth0.com}
  clientId={fxYaY2TLJJuCUaJV69Pre9s4FQtF8dA0}
  redirectUri={window.location.origin}
>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Auth0Provider>
);


