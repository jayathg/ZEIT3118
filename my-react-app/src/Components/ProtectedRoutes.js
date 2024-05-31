import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element: Component, adminOnly, userOnly, ...rest }) => {
    const userRole = Cookies.get('userRole');

    if (!userRole) {
        return <Navigate to="/" />;
    }
    if (adminOnly && userRole == 'user') {
        return <Navigate to="/HomeGenUserPage" />;
    } else if (userOnly && userRole == 'admin') {
        return <Navigate to="/HomeAdminPage" />;
    }
    return <Component {...rest} />;
};

export default ProtectedRoute;
