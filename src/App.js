import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDescope, useSession } from '@descope/react-sdk';
import LandingPage from './components/landingPage';
import AuthenticatedComponent from './components/AuthenticatedComponent';

const App = () => {
    const { isAuthenticated, isSessionLoading } = useSession();
    const { logout } = useDescope();

    const handleLogout = () => {
        logout();
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/authenticated" element={<AuthenticatedComponent />} />
                {/* Render Descope flow or LandingPage if not authenticated */}
                <Route path="*">
                    {!isAuthenticated && !isSessionLoading ? (
                        <Descope
                            flowId="sign-up-or-in"
                            onSuccess={(e) => console.log(e.detail.user)}
                            onError={(e) => console.log('Could not log in!')}
                        />
                    ) : (
                        <Navigate to="/authenticated" />
                    )}
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
