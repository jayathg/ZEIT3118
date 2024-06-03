import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminAuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Assume the user is authenticated as an admin
        const userRole = 'admin'; 
        Cookies.set('userRole', userRole, { expires: 1 }); // Set the user role cookie
        navigate('/HomeAdminPage');
        
    }, [navigate]);

    return <div>Loading...</div>;
};

export default AdminAuthCallback;
