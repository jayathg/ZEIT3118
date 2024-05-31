import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import HomeAdminPage from './Components/HomeAdminPage';
import NotFoundPage from './Components/NotFoundPage';
import AddPage from './Components/AddPage';
import DeletePage from './Components/DeletePage';
import EditPage from './Components/EditPage';
import SearchPage from './Components/SearchPageEdit';
import AuthCallback from './Components/AuthCallback';
import ContinueLogin from './Components/ContinueLogin';
import HomeGenUserPage from './Components/HomeGenUserPage';
import ProtectedRoute from './Components/ProtectedRoutes';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/callback" element={<AuthCallback />} />
                <ProtectedRoute path="/HomeAdminPage" element={<HomeAdminPage />} adminOnly />
                <Route path="/HomeGenUserPage" element={<HomeGenUserPage />} />
                <ProtectedRoute path="/AddPage" element={<AddPage />} adminOnly />
                <ProtectedRoute path="/DeletePage" element={<DeletePage />} adminOnly />
                <ProtectedRoute path="/EditPage" element={<EditPage />} adminOnly />
                <ProtectedRoute path="/SearchPage" element={<SearchPage />} adminOnly />
                <ProtectedRoute path="/ContinueLogin" element={<ContinueLogin />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

export default App;
