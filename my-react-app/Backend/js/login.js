const axios = require("axios").default;
const databaseConn = require("./databaseConn.js");

async function getEmailFromUserID(userID) {
    try {
        const emailResult = await databaseConn.verifyLogin(userID);
        if (emailResult.success) {
            return emailResult.email;
        } else {
            throw new Error(emailResult.message);
        }
    } catch (error) {
        // Handle any errors
        throw new Error("Error retrieving email from userID: " + error.message);
    }
}

async function sendMagicLink(email) {
    try {
        var options = {
            method: 'POST',
            url: 'https://dev-we3vguqrc7tyu1mr.us.auth0.com/passwordless/start',
            headers: {'content-type': 'application/json'},
            data: {
              client_id: '1nzOnOcVNNFCtzB7CxXV87MpTL6IGb97',
              connection: 'email',
              email: 'USER_EMAIL',
              send: 'link'
            }
        };

        const response = await axios.request(options);
        console.log(response.data);
        // Handle response data as needed
    } catch (error) {
        console.error(error);
        // Handle errors
    }
}

async function handleLogin(userID) {
    try {
        const email = await getEmailFromUserID(userID);
        await sendMagicLink(email);
    } catch (error) {
        console.error("Error:", error.message);
        // Handle any errors
    }
}

// Example usage
const userID = '2';
console.log(getEmailFromUserID(userID));
handleLogin(userID);
