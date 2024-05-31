import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthCallback = () => {
    const navigate = useNavigate(); // Hook for navigation


    useEffect(() => {
        // Simulate setting user role based on admin authentication
        const userRole = 'admin'; // Assume the user is an admin for this example
        Cookies.set('userRole', userRole, { expires: 1 }); // Set cookie with role
        navigate('/HomeAdminPage');
        
    }, [history]);

    return <div>Loading...</div>;
};

export default AuthCallback;
