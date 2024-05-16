import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function AuthCallback() {
    const location = useLocation();

    useEffect(() => {
        const { hash } = location;
        const token = new URLSearchParams(hash.replace('#', '')).get('access_token');

        if (token) {
            verifyToken(token);
        }
    }, [location]);

    const verifyToken = (token) => {
        // Call your Azure Function to verify the token
        fetch(`https://techsecuretaskforcefunction.azurewebsites.net/api/verifyToken?token=${encodeURIComponent(token)}`)
            .then(response => response.json())
            .then(data => {
                console.log('Token verification successful', data);
                // Handle successful verification, e.g., navigate to dashboard
            })
            .catch(error => {
                console.error('Token verification failed', error);
            });
    };

    return <div>Verifying...</div>;
}

export default AuthCallback;

