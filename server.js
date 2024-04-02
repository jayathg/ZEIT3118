const express = require('express');
const path = require('path');
const app = express();
const DescopeClient = require('@descope/node-sdk');

// Define a route to handle API requests
app.get('/api/data', async (req, res) => {
    // Get the session token from the request headers
    const sessionToken = req.headers.authorization;
  
    try {
      // Validate the user session
      const { authorized, userToken, err } = await descopeClient.Auth.ValidateSessionWithToken(sessionToken);
      
      // If session is valid, continue with the request
      if (authorized) {
        // Your logic to handle authenticated requests
        const data = {
          message: 'Hello from the backend!',
          userToken: userToken // Include user token if needed
        };
        res.json(data);
      } else {
        // If session validation fails, send an error response
        console.error('Error validating session:', err);
        res.status(401).json({ error: 'Unauthorized' });
      }
    } catch (error) {
      // If an unexpected error occurs, send a generic error response
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
