const express = require('express');
const DescopeClient = require('@descope/node-sdk');

const app = express();
const port = 3000;



// Example route for session validation
app.get('/validate-session', async (req, res) => {
    const sessionToken = req.headers.authorization.replace('Bearer ', ''); // Extract session token from Authorization header
    try {
        // Validate the session token
        const authInfo = await descopeClient.validateSession(sessionToken);
        res.json({ success: true, authInfo });
    } catch (error) {
        res.status(401).json({ success: false, error: 'Session validation failed' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
