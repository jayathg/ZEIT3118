import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

const AuthCallback = () => {
    const history = useHistory();

    useEffect(() => {
        // Generate JWT
        const user = { permissions: ['admin'] }; // Assume admin permissions
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set a cookie with the token
        Cookies.set('authToken', token, { expires: 1 });

        // Redirect to admin page
        history.push('/home-admin');
    }, [history]);

    return <div>Loading...</div>;
};

export default AuthCallback;
