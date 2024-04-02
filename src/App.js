import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Descope, useDescope, useSession } from '@descope/react-sdk';
import LandingPage from './LandingPage';
import SecondPage from './SecondPage';

const App = () => {
  const { isAuthenticated, isSessionLoading } = useSession();
  const { logout } = useDescope();

  const handleLogout = () => {
    logout();
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {!isAuthenticated && (
                <Descope
                  flowId="sign-up-or-in"
                  onSuccess={(e) => console.log(e.detail.user)}
                  onError={(e) => console.log('Could not log in!')}
                />
              )}
              {isSessionLoading && <p>Loading...</p>}
              {isAuthenticated && (
                <>
                  <p>Hello</p>
                  <div>My Private Component</div>
                  <button onClick={handleLogout}>Logout</button>
                </>
              )}
            </>
          }
        />
        <Route
          path="/second-page"
          element={isAuthenticated ? <SecondPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;

