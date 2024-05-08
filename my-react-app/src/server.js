const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { handleLogin } = require('./Components/handleLogin');

const app = express();

// Use cors middleware to allow cross-origin requests
app.use(cors());

app.use(bodyParser.json());

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});