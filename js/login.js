const axios = require("axios").default;
const databaseConn = require("./databaseConn.js"); // Import database connection module
const request = require("request");
//AUTH0 DOMAIN <NAND PRIVATE, NEED TO MOVE TO COLLAB ONE)
const domain = 'dev-we3vguqrc7tyu1mr.us.auth0.com';
// Your Client ID
const clientId = 'xqVy4iVU7SHlzNXBckuHv1oJPanFmXtJ';
// Your Management API token (replace this with your actual token)
const managementApiToken = getManagementApiToken();

async function getManagementApiToken() {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'POST',
        url: 'https://dev-we3vguqrc7tyu1mr.us.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: '{"client_id":"qqCsDQdJujEK19DYBwTADzyPHkaqhxiL","client_secret":"sVkGEeDXKaFzaD9GXTb7ZM7rvHuExGV1fW7lJON3HmY_J12qRlW2_XAq9Gs1_7CT","audience":"https://dev-we3vguqrc7tyu1mr.us.auth0.com/api/v2/","grant_type":"client_credentials"}'
      };
  
      request(options, function (error, response, body) {
        if (error) {
          console.error("Error obtaining management API token:", error);
          reject(error);
        } else {
          const responseBody = JSON.parse(body);
          const token = responseBody.access_token;
          resolve(token);
        }
      });
    });
  }

document.getElementById('login').addEventListener('submit', async function(event) {
    event.preventDefault();
    const userID = document.getElementById('userID').value;
    try {
        // Retrieve email associated with the user ID
        const emailResult = await databaseConn.getUserID(userID);
        if (emailResult.success) {
            const email = emailResult.email;
            await login(email);
        } else {
            // If no email is found for the provided user ID, show an error message
            alert(emailResult.message);
        }
    } catch (error) {
        // Handle any errors that occur during database query
        console.error("Error:", error.message);
        alert("An error occurred during login");
    }
});

async function login(email) {
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        
        // Check if the response indicates a successful login
        if (data && data.success) {
            // Call the magicLink function with the user ID
            magicLink(data.userID);
        } else {
            // Show an alert for invalid login
            alert("Invalid login credentials");
        }
    } catch (err) {
        // Handle errors
        alert("An error occurred during login " + err.message);
    }
}

// Function to send magic link
async function magicLink(email) {
    try {
        const options = {
            method: 'POST',
            url: `https://${domain}/api/v2/passwordless/start`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${managementApiToken}`
            },
            data: {
                client_id: clientId,
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
        alert("An error occurred while sending magic link: " + error.message);
    }
}


