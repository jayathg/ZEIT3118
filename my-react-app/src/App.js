import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import Login from './Components/Login';
import HomeAdminPage from './Components/HomeAdminPage';
import NotFoundPage from './Components/NotFoundPage';
import AddPage from './Components/AddPage';
import DeletePage from './Components/DeletePage';
imp
ort EditPage from './Components/EditPage';
import SearchPage from './Components/SearchPageEdit';

const App = () => {
  return (
    <Router> {/* Wrap everything in Router */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/HomeAdminPage" element={<HomeAdminPage />} />
        <Route path="/AddPage" element={<AddPage />} />
        <Route path="/DeletePage" element={<DeletePage />} />
        <Route path="/EditPage" element={<EditPage />} />
        <Route path="/SearchPage" element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'https://techsecuretaskforce.azurewebsites.net',
  clientID: '1nzOnOcVNNFCtzB7CxXV87MpTL6IGb97',
  issuerBaseURL: 'https://dev-we3vguqrc7tyu1mr.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

export default App;