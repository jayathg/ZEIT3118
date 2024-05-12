import { response } from 'express';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function MagicLinkHandler() {
    const location = useLocation();

    useEffect(async () => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (token) {
            //Verify token
            try {
                console.log("Verifying token")
                axios.get(`https://techsecuretaskforcefunction.azurewebsites.net/api/httpTrigger2?token=${token}`)
                .then(response => {
                    console.log("Login Successfull:", response.data);
                    navigate('/HomeAdminPage');})
                .catch(error => {
                    console.error("Login failed:", error.response ? error.response.data.error : error.message);
                });
                console.log("Login response:", response.data);
                
                //navigate('/HomeAdminPage'); // Adjust route as necessary
              } catch (error) {
                console.error("Login failed:", error.response ? error.response.data.error : error.message);
              }
        }
    }, [location]);

    return <div>Verifying...</div>;
}

export default MagicLinkHandler;