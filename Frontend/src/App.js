import React, { useCallback } from 'react';
import { AuthProvider, Descope, useDescope, useSession, useUser, getSessionToken } from '@descope/react-sdk';
import { Route, Switch, useHistory } from 'react-router-dom'; // Import useHistory hook
import LoggedInPage from './LoggedInPage'; // Import the LoggedInPage component
import IndexHTML from './components/IndexHTML'; // Import the IndexHTML component

const App = () => {
    const { isAuthenticated, isSessionLoading } = useSession();
    const { user, isUserLoading } = useUser();
    const { logout } = useDescope();
    const history = useHistory(); // Initialize useHistory hook

    const exampleFetchCall = async () => {
        const sessionToken = getSessionToken();

        fetch('http://localhost:3000/data', {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + sessionToken,
            }
        });
    };

    const handleLogout = useCallback(() => {
        logout();
    }, [logout]);

    const handleSignUpSuccess = useCallback((e) => {
        console.log('User signed up:', e.detail.user);
        // Redirect to logged-in page upon successful sign-up
        history.push('/loggedIn.html');
    }, [history]);

    return (
        <div>
            <h1>Sign Up Page</h1>
            <AuthProvider projectId="P2dhhp4gMs2Mj5dMPCiMTnsQ0sTG">
                <Switch>
                    <Route path="/" exact component={IndexHTML} /> {/* Render IndexHTML component */}
                    <Route path="/loggedIn.html" component={LoggedInPage} /> {/* Route for LoggedInPage component */}
                </Switch>
                {!isAuthenticated && (
                    <Descope
                        flowId="sign-up"
                        theme="light"
                        onSuccess={handleSignUpSuccess}
                        onError={(err) => {
                            console.error('Error signing up:', err);
                            // Optionally, handle error cases
                        }}
                    />
                )}
            </AuthProvider>
        </div>
    );
};

export default App;

