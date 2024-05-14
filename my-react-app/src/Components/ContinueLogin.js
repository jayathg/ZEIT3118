import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const ContinueLogin = () => {
  const { handleRedirectCallback, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        await handleRedirectCallback();
        navigate('/HomeAdminPage'); // Redirect to the admin page
      } catch (error) {
        console.error("Error handling redirect callback:", error);
      }
    };

    handleAuth();
  }, [handleRedirectCallback, navigate]);

  return (
    <div>
      {isAuthenticated ? <p>Redirecting...</p> : <p>Authenticating...</p>}
    </div>
  );
};

export default ContinueLogin;
