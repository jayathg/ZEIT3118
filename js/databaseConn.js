const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors({
    origin: 'http://localhost:3000'
}));

//Default creds, will need to be changed when we migrate to Azure
const conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
});

conn.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    };
    createTable();
    addUser("firstName", "lastName", "bob@gmail.com", true)
    console.log("Connected!");
});

function createTable(){
        const createTables = ["CREATE TABLE IF NOT EXISTS ZEIT3118.User(employeeID INT NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT, firstName NVARCHAR(50), lastName NVARCHAR(50), email NVARCHAR(50) CHECK (email LIKE '%_@_%.__%'), accessLevel BOOL)",
    "ALTER TABLE ZEIT3118.User AUTO_INCREMENT = 0"];

    createTables.forEach((tableQuery) => {
        if (tableQuery.trim() !== "") {
            conn.query(tableQuery, function (err) {
                if (err) throw err;
            });
        }
    });
}

function addUser(firstName, lastName, email, accessLevel){
    return new Promise((resolve, reject) => {
        const addUser = "INSERT INTO ZEIT3118.User (firstName, lastName, email, accessLevel) VALUES (?, ?, ?, ?)";
        conn.query(addUser, [firstName, lastName, email, accessLevel], function(err, result){
            if(err){
                resolve({success: false,  message: "Unable to add user" + err.message});
            }else{
                const getUserID = "SELECT employeeID FROM ZEIT3118.User WHERE firstName = ? AND lastName = ? AND email = ? AND accessLevel = ?";
                conn.query(getUserID, [firstName, lastName, email, accessLevel], function(err, result){
                    if(err){
                        resolve({success: false, message: "Unable to get user ID" + err.message});
                    }else{
                        resolve({success: true, message: "User added successfully", userID: result[0].employeeID});
                    }
                });
            }
        });
    })
}

function verifyLogin(userID){
    return new Promise((resolve, reject) => {
        const verifyLogin = "SELECT * FROM ZEIT3118.User WHERE employeeID = ?";
        conn.query(verifyLogin, [userID], function(err, result){
            if(err){
                resolve({success: false, message: "Unable to verify login" + err.message});
            }else if(result.length === 0){
                resolve({success: false, message: "Invalid UserID"});
            }else{
                resolve({success: true, message: "Login verified", user: result[0]});
            }
        });
    })
}

function getUserID(email){
    return new Promise((resolve, reject) => {
        const getUserID = "SELECT employeeID FROM ZEIT3118.User WHERE email = ?";
        conn.query(getUserID, [email], function(err, result){
            if(err){
                resolve({success: false, message: "Unable to get user ID" + err.message});
            }else if(result.length === 0){
                resolve({success: false, message: "Invalid email"});
            }else{
                resolve({success: true, message: "User ID found", userID: result[0].employeeID});
            }
        });
    })
}

function editUser(userID, firstName, lastName, email, accessLevel){
    return new Promise((resolve, reject) => {
        const editUser = "UPDATE ZEIT3118.User SET firstName = ?, lastName = ?, email = ?, accessLevel = ? WHERE employeeID = ?";
        const getUserDetails = "SELECT * FROM ZEIT3118.User WHERE employeeID = ?";
        conn.query(getUserDetails, [userID], function(err, result){
            if(err) reject(err);
            const userDetails = results[0];

            if(!firstName){firstName = userDetails.firstName;}
            if(!lastName){lastName = userDetails.lastName;}
            if(!email){email = userDetails.email;}
            if(!accessLevel){accessLevel = userDetails.accessLevel;}
            conn.query(editUser, [firstName, lastName, email, accessLevel, userID], function(err, result){
                if(err){
                    resolve({success: false, message: "Unable to edit user" + err.message});
                }else{
                    resolve({success: true, message: "User edited successfully"});
                }
            });
        });
    });
}

function deleteUser(userID){
    return new Promise((resolve, reject) => {
        const deleteUser = "DELETE ZEIT3118.User WHERE employeeID = ?";
        conn.query(deleteUser, [userID], function(err, result){
            if(err){
                resolve({success: false, message: "Unable to delete user" + err.message});
            }else{
                resolve({success: true, message: "User deleted successfully"});
            }
        });
    });
}

module.exports = {
    addUser,
    verifyLogin,
    getUserID,
    editUser,
    deleteUser
};