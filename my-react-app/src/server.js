const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { handleLogin } = require('./Components/handleLogin');

const app = express();

// Setup CORS
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed methods here
  origin: '*'  // Adjust in production to only include specific origins
}));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Parse JSON bodies
app.use(bodyParser.json());

// Route for handling login
app.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const userID = req.body.userID;
    const result = await handleLogin(userID);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error); // Log error information for debugging
  res.status(500).send({ error: 'Internal Server Error' }); // Generic error message
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
