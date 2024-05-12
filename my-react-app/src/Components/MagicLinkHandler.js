import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function MagicLinkHandler() {
    const location = useLocation();
    const navigate = useNavigate(); // Correctly import and use navigate

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (token) {
            // Verify token
            console.log("Verifying token");
            axios.post(`https://techsecuretaskforcefunction.azurewebsites.net/api/httpTrigger2?token=${token}`)
                .then(response => {
                    console.log("Login Successful:", response.data);
                    navigate('/HomeAdminPage'); // Correct usage of navigate
                })
                .catch(error => {
                    console.error("Login failed:", error.response ? error.response.data : error.message);
                });
        }
    }, [location, navigate]); // Add navigate to dependency array

    return <div>Verifying...</div>;
}

export default MagicLinkHandler;
