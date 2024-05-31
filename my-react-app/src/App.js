// App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import LogoutPage from './Components/Logout';
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
                <Route path="/HomeAdminPage" element={<ProtectedRoute adminOnly={true} element={HomeAdminPage} />} />
                <Route path="/HomeGenUserPage" element={<HomeGenUserPage />} />
                <Route path="/AddPage" element={<ProtectedRoute adminOnly={true} element={AddPage} />} />
                <Route path="/DeletePage" element={<ProtectedRoute adminOnly={true} element={DeletePage} />} />
                <Route path="/EditPage" element={<ProtectedRoute adminOnly={true} element={EditPage} />} />
                <Route path="/SearchPage" element={<ProtectedRoute adminOnly={true} element={SearchPage} />} />
                <Route path="/ContinueLogin" element={<ProtectedRoute element={ContinueLogin} />} />
                <Route path="/Logout" element={<LogoutPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

export default App;
