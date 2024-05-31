import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const ProtectedRoute = ({ component: Component, adminOnly, ...rest }) => {
    const token = Cookies.get('authToken');
    let user = null;

    if (token) {
        try {
            user = jwtDecode(token);
        } catch (error) {
            console.error('Invalid token', error);
        }
    }

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!user) {
                    return <Redirect to="/Login" />;
                }
                if (adminOnly && (!user.permissions || !user.permissions.includes('admin'))) {
                    return <Redirect to="/Login" />;
                }
                return <Component {...props} />;
            }}
        />
    );
};

export default ProtectedRoute;
