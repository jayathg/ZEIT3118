const sql = require('mssql');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors({
    origin: 'http://localhost:3000'
}));

const config = {
    user: 'webapp',
    password: '-Q^5vS5;djD.W5/',
    server: 'techsecuretaskforce.database.windows.net',
    port: 1433,
    database: 'zeit3118',
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

console.log("Starting...");
connectDB();
async function connectDB() {
    try {
        await sql.connect(config);
        await createTable();
        
        //await addUser("firstName", "lastName", "bob@gmail.com", true);
        
    } catch (err) {
        console.error(err.message);
    }
}

async function createTable() {
    const createTables = [
        `IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'ZEIT3118')
        BEGIN
            EXEC('CREATE SCHEMA ZEIT3118');
        END`,

        `IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'User' AND schema_id = SCHEMA_ID('ZEIT3118'))
        BEGIN
            CREATE TABLE ZEIT3118.[User] (
                employeeID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
                firstName NVARCHAR(50),
                lastName NVARCHAR(50),
                email NVARCHAR(50) CHECK (email LIKE '%_@_%.__%'),
                accessLevel BIT
            );
        END`
    ];

    for (let tableQuery of createTables) {
        if (tableQuery.trim() !== "") {
            await sql.query(tableQuery);
        }
    }
}

async function addUser(firstName, lastName, email, accessLevel) {
    try {
        await sql.connect(config);

        const addUserQuery = `INSERT INTO ZEIT3118.[User] (firstName, lastName, email, accessLevel) VALUES (@firstName, @lastName, @email, @accessLevel); SELECT SCOPE_IDENTITY() AS employeeID;`;
        const request = new sql.Request();
        request.input('firstName', sql.NVarChar(50), firstName);
        request.input('lastName', sql.NVarChar(50), lastName);
        request.input('email', sql.NVarChar(50), email);
        request.input('accessLevel', sql.Bit, accessLevel);
        const result = await request.query(addUserQuery);
        const userID = result.recordset[0].employeeID;
        console.log("User added successfully with ID: " + userID);
        return { success: true, message: "User added successfully", userID: userID };
    } catch (err) {
        console.error("Unable to add user: " + err.message);
        return { success: false, message: "Unable to add user: " + err.message };
    }
}



async function verifyLogin(userID) {
    try {
        await sql.connect(config);

        const verifyLogin = `SELECT * FROM ZEIT3118.[User] WHERE employeeID = @userID`;
        const request = new sql.Request();
        request.input('userID', sql.Int, userID);
        const result = await request.query(verifyLogin);
        if (result.recordset.length === 0) {
            return { success: false, message: "Invalid UserID" };
        } else {
            return { success: true, message: "Login verified", user:result.recordset.employeeID, email: result.recordset[0].email };
        }
    } catch (err) {
        return { success: false, message: "Unable to verify login: " + err.message };
    }
}

async function getUserID(email) {
    try {
        await sql.connect(config);

        const getUserID = `SELECT employeeID FROM ZEIT3118.[User] WHERE email = @email`;
        const request = new sql.Request();
        request.input('email', sql.NVarChar(50), email);
        const result = await request.query(getUserID);
        if (result.recordset.length === 0) {
            console.log(result)
            return { success: false, message: "Invalid email" };
        } else {
            await sql.close();
            return { success: true, message: "User ID found", userID: result.recordset[0].employeeID };
        }
    } catch (err) {
        return { success: false, message: "Unable to get user ID: " + err.message };
    }
}

async function editUser(userID, firstName, lastName, email, accessLevel) {
    try {
        await sql.connect(config);

        const request = new sql.Request();
        request.input('userID', sql.Int, userID);

        const getUserDetails = `SELECT * FROM ZEIT3118.[User] WHERE employeeID = @userID`;
        const userDetailsResult = await request.query(getUserDetails);
        if (userDetailsResult.recordset.length === 0) {
            return { success: false, message: "User not found" };
        }
        const userDetails = userDetailsResult.recordset[0];
        firstName = firstName || userDetails.firstName;
        lastName = lastName || userDetails.lastName;
        email = email || userDetails.email;
        accessLevel = accessLevel !== undefined ? accessLevel : userDetails.accessLevel;

        request.input('firstName', sql.NVarChar(50), firstName);
        request.input('lastName', sql.NVarChar(50), lastName);
        request.input('email', sql.NVarChar(50), email);
        request.input('accessLevel', sql.Bit, accessLevel);

        const editUserQuery = `UPDATE ZEIT3118.[User] SET firstName = @firstName, lastName = @lastName, email = @email, accessLevel = @accessLevel WHERE employeeID = @userID`;
        await request.query(editUserQuery);
        return { success: true, message: "User edited successfully" };
    } catch (err) {
        return { success: false, message: "Unable to edit user: " + err.message };
    }
}


async function deleteUser(userID) {
    try {
        const deleteUserQuery = `DELETE FROM ZEIT3118.[User] WHERE employeeID = @userID`;
        const request = new sql.Request();
        request.input('userID', sql.Int, userID);
        await request.query(deleteUserQuery);
        return { success: true, message: "User deleted successfully" };
    } catch (err) {
        return { success: false, message: "Unable to delete user: " + err.message };
    }
}

module.exports = {
    addUser,
    verifyLogin,
    getUserID,
    editUser,
    deleteUser
};