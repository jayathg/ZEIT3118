const express = require('express');
const path = require('path');
// Import DescopeClient if needed
const DescopeClient = require('@descope/node-sdk');

const app = express();
const port = 3000;

// Serve static files from the React build directory
const frontendBuildPath = path.join(__dirname, '..', 'Frontend', 'build');
app.use(express.static(frontendBuildPath));


// Initialize Descope client if needed
// const descopeClient = DescopeClient({ projectId: 'P2dhhp4gMs2Mj5dMPCiMTnsQ0sTG' });

// Session validation route
app.get('/validate-session', async (req, res) => {
    const sessionToken = req.headers.authorization.replace('Bearer ', ''); // Extract session token from Authorization header
    try {
        // Validate the session token
        const authInfo = await descopeClient.validateSession(sessionToken);
        // Mock authInfo for now
        //const authInfo = { userId: 123, username: 'example' };
        res.json({ success: true, authInfo });
    } catch (error) {
        res.status(401).json({ success: false, error: 'Session validation failed' });
    }
});

// Serve the React application for all other routes
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
