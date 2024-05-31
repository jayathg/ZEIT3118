import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { parseJwt } from './utils';

const ProtectedRoute = ({ component: Component, adminOnly, ...rest }) => {
    const token = Cookies.get('authToken');
    let user = null;

    if (token) {
        user = parseJwt(token);
    }

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!user) {
                    return <Redirect to="/" />;
                }
                if (adminOnly && (!user.permissions || !user.permissions.includes('admin'))) {
                    return <Redirect to="/" />;
                }
                return <Component {...props} />;
            }}
        />
    );
};

export default ProtectedRoute;
