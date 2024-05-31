import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element: Component, adminOnly, ...rest }) => {
    const userRole = Cookies.get('userRole');

    if (!userRole) {
        return <Navigate to="/" />;
    }
    if (adminOnly && userRole !== 'admin') {
        return <Navigate to="/" />;
    }
    return <Component {...rest} />;
};

export default ProtectedRoute;
