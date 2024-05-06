const axios = require("axios").default;
const databaseConn = require("./databaseConn.js");

async function getEmailFromUserID(userID) {
    try {
        const emailResult = await databaseConn.getUserID(userID);
        if (emailResult.success) {
            return emailResult.email;
        } else {
            // If no email is found for the provided user ID, throw an error
            throw new Error(emailResult.message);
        }
    } catch (error) {
        // Handle any errors
        throw new Error("Error retrieving email from userID: " + error.message);
    }
}

async function sendMagicLink(email) {
    try {
        const options = {
            method: 'POST',
            url: 'https://dev-we3vguqrc7tyu1mr.us.auth0.com/passwordless/start',
            headers: {'content-type': 'application/json'},
            data: {
                client_id: 'hoOItk2NH5DGxQDSaxiGcXiH48rlcGh3',
                connection: 'email',
                email: email,
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
