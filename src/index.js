import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from '@descope/react-sdk';
import App from './App';

// Set up the root of your React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component wrapped with AuthProvider
root.render(
    <React.StrictMode>
        <AuthProvider projectId='P2dhhp4gMs2Mj5dMPCiMTnsQ0sTG'>
            <App />
        </AuthProvider>
    </React.StrictMode>
);

// Initialize the DescopeClient
import DescopeClient from '@descope/node-sdk';

const descopeClient = DescopeClient({ projectId: 'P2dhhp4gMs2Mj5dMPCiMTnsQ0sTG' });

// Fetch session token from HTTP Authorization Header
const sessionToken = "xxxx";

// Validate the user session
(async () => {
    try {
        const authInfo = await descopeClient.validateSession(sessionToken);
        console.log("Successfully validated user session:");
        console.log(authInfo);
    } catch (error) {
        console.log("Could not validate user session: " + error);
    }
})();
