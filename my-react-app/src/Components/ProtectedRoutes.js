import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element: Component, adminOnly, ...rest }) => {
    const userRole = Cookies.get('userRole');

    if (!userRole) {
        return <Navigate to="/login" />;
    }
    if (adminOnly && userRole !== 'admin') {
        return <Navigate to="/unauthorized" />;
    }
    return <Route {...rest} element={Component} />;
};

export default ProtectedRoute;
