const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('html'));
const cors = require('cors');
const bodyParser = require('body-parser');
const {
  addUser,
  verifyLogin,
  getUserID,
  editUser,
  deleteUser
} = require('./js/databaseConn.js');

var corsOptions = {
  origin: 'http://localhost:3000', // Change to Azure URL
  credentials: true,
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });

// Will be updated to integrate with descope at a later date
app.post('/login', bodyParser.json(), async (req, res) => {
  const { userID } = req.body;

  const loginResult = await verifyLogIn(userID);

  if (loginResult.success) {

      // Include necessary data in response body
      res.json({ success: true });

  } else {

      res.json({ success: false, message: 'Invalid username or password' });
  }
});

app.post('/addUser', bodyParser.json(), async (req, res) => {
  const { firstName, lastName, email, accessLevel } = req.body;

  const addUserResult = await addUser(firstName, lastName, email, accessLevel);

  if (addUserResult.success) {
      res.json({ success: true, message: 'User added successfully', userID: addUserResult.userID });
  } else {
      res.json({ success: false, message: addUserResult.message });
  }
});

app.post('/getUserID', bodyParser.json(), async (req, res) => {
  const {email} = req.body;
  const getUserIDResult = await getUserID(email);
  if(getUserIDResult.success){
      res.json({success: true, message: "User ID retrieved successfully", userID: getUserIDResult.userID});
  }else {
      res.json({success: false, message: getUserIDResult.message});
  }
});

app.post('/editUser', bodyParser.json(), async (req, res) => {
  const {userID, firstName, lastName, email, accessLevel} = req.body;
  const editUserResult = await editUser(userID, firstName, lastName, email, accessLevel);
  if(editUserResult.success){
      res.json({success: true, message: "User edited successfully"});
  }else{
      res.json({success: false, message: editUserResult.message});
  }
});

app.post('/deleteUser', bodyParser.json(), async (req, res) => {
  const {userID} = req.body;
  const deleteUserResult = await deleteUser(userID);
  if(deleteUserResult.success){
      res.json({success: true, message: "User deleted successfully"});
  }else{
      res.json({success: false, message: deleteUserResult.message});
  }
});