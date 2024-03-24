const express = require('express');
const DescopeClient = require('@descope/node-sdk');

const app = express();
const port = 3000;

try {
  const descopeClient = DescopeClient({ projectId: 'P2dhhp4gMs2Mj5dMPCiMTnsQ0sTG' });
} catch (error) {
  console.log("failed to initialise: " + error)
}

// Middleware for session validation
app.use(async (req, res, next) => {
    // Extract session token from the authorization header
    const session_token = req.headers.authorization.split(" ")[1];

    try {
        // Validate the session token
        const authInfo = await descopeClient.validateSession(session_token);
        console.log("Successfully validated user session:");
        console.log(authInfo);
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.log("Could not validate user session " + error);
        // Send 401 Unauthorized response if session token is invalid
        res.status(401).json({ error: 'Unauthorized' });
    }
});

// Your API routes
app.get('/protected', (req, res) => {
    // This route is protected and will only be accessible if the session is validated
    res.json({ message: 'Welcome to protected route' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
