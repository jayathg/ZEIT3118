import React, { useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDescope, useSession, useUser, getSessionToken } from '@descope/react-sdk';
import LandingPage from './landingPage';
import AuthenticatedComponent from './AuthenticatedComponent';

const App = () => {
    const { isAuthenticated, isSessionLoading } = useSession();
    const { user, isUserLoading } = useUser();
    const { logout } = useDescope();

    const handleLogout = useCallback(() => {
        logout();
    }, [logout]);

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {/* Render LandingPage if not authenticated */}
                    {!isAuthenticated && !isSessionLoading && (
                        <Descope
                            flowId="sign-up-or-in"
                            onSuccess={(e) => console.log(e.detail.user)}
                            onError={(e) => console.log('Could not log in!')}
                        />
                    )}
                    {/* Redirect to AuthenticatedComponent if authenticated */}
                    {isAuthenticated && <Redirect to="/authenticated" />}
                </Route>
                {/* Render AuthenticatedComponent if authenticated */}
                {isAuthenticated && (
                    <Route path="/authenticated">
                        <>
                            <p>Hello {user.name}</p>
                            <div>My Private Component</div>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    </Route>
                )}
            </Switch>
        </Router>
    );
};

export default App;
