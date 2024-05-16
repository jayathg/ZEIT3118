import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const ContinueLogin = () => {
  const { handleRedirectCallback, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const state = urlParams.get('state');
        const storedState = Cookies.get('authState');

        if (state !== storedState) {
          throw new Error("Invalid state parameter");
        }

        await handleRedirectCallback();
        Cookies.remove('authState');
        navigate('/HomeAdminPage'); // Redirect to the admin page
      } catch (error) {
        console.error("Error handling redirect callback:", error);
      }
    };

    handleAuth();
  }, [handleRedirectCallback, location.search, navigate]);

  return (
    <div>
      {isAuthenticated ? <p>Redirecting...</p> : <p>Authenticating...</p>}
    </div>
  );
};

export default ContinueLogin;
