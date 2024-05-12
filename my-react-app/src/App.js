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
import MagicLinkHandler from './Components/MagicLinkHandler.js';


const App = () => {
  return (
    <Router> {/* Wrap everything in Router */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<MagicLinkHandler/>} />
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


const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

export default App;
