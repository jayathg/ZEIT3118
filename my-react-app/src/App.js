import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import HomeAdminPage from './Components/HomeAdminPage';
import Login from './Components/Login';
import NotFoundPage from './Components/NotFoundPage';
import AddPage from './Components/AddPage';
import DeletePage from './Components/DeletePage';
import EditPage from './Components/EditPage';
import SearchPage from './Components/SearchPageEdit';

const App = () => {
  return (
    <Router> {/* Wrap everything in Router */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/AddPage" element={<AddPage />} />
        <Route path="/HomeAdminPage" element={<HomeAdminPage />} />
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
