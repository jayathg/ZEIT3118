const express = require('express');
const mysql = require('mysql');
const descope = require('@descope/web-js-sdk');
const { createTableAndAddTestEntry } = require('./db'); // Import the createTableAndAddTestEntry function from db.js

const app = express();
app.use(express.json()); // Parse JSON requests

const conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "ZEIT3118" 
});

const descopeClient = new descope.Client('P2dhhp4gMs2Mj5dMPCiMTnsQ0sTG');

conn.connect(function(err) {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    };
    createTableAndAddTestEntry(); // Call the createTableAndAddTestEntry function
    console.log("Connected to database!");
});

// Function to validate session token
async function validateSessionToken(sessionToken) {
    try {
        const authInfo = await descopeClient.validateSession(sessionToken);
        console.log("Successfully validated user session:");
        console.log(authInfo);
        return authInfo;
    } catch (error) {
        console.log("Could not validate user session " + error);
        throw error;
    }
}

// Callback route
app.get('/auth/callback', async (req, res) => {
    const authCode = req.query.code;
    const sessionToken = req.headers.authorization; // Assuming the session token is passed in the Authorization header

    try {
        // Validate the session token
        await validateSessionToken(sessionToken);

        // Your logic here

        // Redirect
        res.redirect('/dashboard.html');
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ error: 'Failed to authenticate' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
