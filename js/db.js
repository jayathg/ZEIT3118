const mysql = require('mysql');

// Create MySQL connection
const conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "ZEIT3118" 
});

// Function to create user table and add test entry
function createTableAndAddTestEntry() {
    const createTables = [
        "CREATE TABLE IF NOT EXISTS ZEIT3118.User(employeeID INT NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT, firstName NVARCHAR(50), lastName NVARCHAR(50), email NVARCHAR(50) CHECK (email LIKE '%_@_%.__%'), accessLevel BOOL)",
        "ALTER TABLE ZEIT3118.User AUTO_INCREMENT = 0"
    ];

    const testData = {
        employeeID: "1234",
        firstName: "aaa",
        lastName: "bbbb",
        email: "chippledipple@proton.me",
        accessLevel: true
    };

    createTables.forEach((tableQuery, index) => {
        if (tableQuery.trim() !== "") {
            conn.query(tableQuery, function (err) {
                if (err) throw err;
                if (index === createTables.length - 1) {
                    addUser(testData.firstName, testData.lastName, testData.email, testData.accessLevel)
                        .then((result) => {
                            console.log(result);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            });
        }
    });
}

// Function to add a user to the database
function addUser(firstName, lastName, email, accessLevel) {
    return new Promise((resolve, reject) => {
        const addUserQuery = "INSERT INTO User (firstName, lastName, email, accessLevel) VALUES (?, ?, ?, ?)";
        conn.query(addUserQuery, [firstName, lastName, email, accessLevel], function(err, result) {
            if (err) {
                resolve({ success: false, message: "Unable to add user" + err.message });
            } else {
                resolve({ success: true, message: "User added successfully" });
            }
        });
    });
}

module.exports = {
    createTableAndAddTestEntry
};
