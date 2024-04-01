import React, { useState } from 'react';
import { AuthProvider, Descope } from '@descope/react-sdk';


const LandingPage = () => {
    const [showLoginFlow, setShowLoginFlow] = useState(false);

    const handleLoginClick = () => {
        setShowLoginFlow(true);
    };

    return (
        <div>
            <h1>Welcome to Our Application!</h1>
            <p>Please click the button below to login:</p>
            {!showLoginFlow && (
                <button onClick={handleLoginClick}>Login</button>
            )}
            {showLoginFlow && (
                <AuthProvider projectId="P2dhhp4gMs2Mj5dMPCiMTnsQ0sTG">
                    <Descope
                        flowId="sign-up-or-in"
                        theme="light"
                        onSuccess={(e) => {
                            console.log(e.detail.user.name);
                            console.log(e.detail.user.email);
                            // Handle successful login here, e.g., redirect to dashboard
                        }}
                        onError={(err) => {
                            console.log("Error!", err);
                            // Handle error, if needed
                        }}
                    />
                </AuthProvider>
            )}
        </div>
    );
};

export default LandingPage;
