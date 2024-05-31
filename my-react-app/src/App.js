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
import AdminAuthCallback from './Components/AdminAuthCallback';
import AuthCallback from './Components/AuthCallback';
import ContinueLogin from './Components/ContinueLogin';
import HomeGenUserPage from './Components/HomeGenUserPage';
import ProtectedRoute from './Components/ProtectedRoutes';
import LogoutGenUserPage from './Components/LogoutGenUser';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/adminCallback" element={<AdminAuthCallback />} />
                <Route path="/callback" element={<AuthCallback/>}/>
                <Route path="/HomeAdminPage" element={<ProtectedRoute adminOnly={true} element={HomeAdminPage} />} />
                <Route path="/HomeGenUserPage" element={<ProtectedRoute userOnly={true} element={HomeGenUserPage} />} />
                <Route path="/AddPage" element={<ProtectedRoute adminOnly={true} element={AddPage} />} />
                <Route path="/DeletePage" element={<ProtectedRoute adminOnly={true} element={DeletePage} />} />
                <Route path="/EditPage" element={<ProtectedRoute adminOnly={true} element={EditPage} />} />
                <Route path="/SearchPage" element={<ProtectedRoute adminOnly={true} element={SearchPage} />} />
                <Route path="/ContinueLogin" element={<ProtectedRoute element={ContinueLogin} />} />
                <Route path="/Logout" element={<ProtectedRoute element={LogoutPage} />} />
                <Route path="/LogoutGenUser" element={<ProtectedRoute userOnly={true} element={LogoutGenUserPage} />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

export default App;
