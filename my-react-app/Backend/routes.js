const express = require('express');
const login = require('./login');


router.post('/login', async (req, res) => {
    try {
        const userID = req.body.userID; 
        await login.handleLogin(userID);
        res.json({ success: true });
    } catch (error) {
        console.error('Error handling login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const router = express.Router();

// Existing code
router.post('/login', async (req, res) => {
    try {
        const userID = req.body.userID; 
        await login.handleLogin(userID);
        res.json({ success: true });
    } catch (error) {
        console.error('Error handling login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;