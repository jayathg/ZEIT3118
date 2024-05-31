import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ component: Component, adminOnly, ...rest }) => {
    const userRole = Cookies.get('userRole');

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!userRole) {
                    return <Redirect to="/" />;
                }
                if (adminOnly && userRole !== 'admin') {
                    return <Redirect to="/" />;
                }
                return <Component {...props} />;
            }}
        />
    );
};

export default ProtectedRoute;
