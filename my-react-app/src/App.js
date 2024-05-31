import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import Login from './Components/Login';
import HomeAdminPage from './Components/HomeAdminPage';
import NotFoundPage from './Components/NotFoundPage';
import AddPage from './Components/AddPage';
import DeletePage from './Components/DeletePage';
import EditPage from './Components/EditPage';
import SearchPage from './Components/SearchPageEdit';
import AuthCallback from './Components/AuthCallback.js';
import ContinueLogin from './Components/ContinueLogin.js';
import HomeGenUserPage from './Components/HomeGenUserPage.js';
import ProtectedRoute from './Components/ProtectedRoutes.js';


const App = () => {
  return (
    <Router> {/* Wrap everything in Router */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<AuthCallback/>} />
        <ProtectedRoute path="/HomeAdminPage" element={<HomeAdminPage />} />
        <Route path="/HomeGenUserPage" element={<HomeGenUserPage />} />
        <ProtectedRoute path="/AddPage" element={<AddPage />} />
        <ProtectedRoute path="/DeletePage" element={<DeletePage />} />
        <ProtectedRoute path="/EditPage" element={<EditPage />} />
        <ProtectedRoute path="/SearchPage" element={<SearchPage />} />
        <ProtectedRoute path="/ContinueLogin" element={<ContinueLogin />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};


const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

export default App;
