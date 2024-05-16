const axios = require("axios").default;
const { redirect } = require("react-router-dom");
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
              client_secret: '-fumUNmMgoiPjVDC7dOo7rtMT-kM7QDkosQvDUdCxai5CfBYhASFEsv64R7R4FCO',
              connection: 'email',
              email: (email),
              send: 'link',
              authParams: {
                redirect_uri: 'https://techsecuretaskforce.azurewebsites.net/HomeAdminPage'
                }
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

async function testLogin() {
    const userID = '2';
    console.log("Getting email for userID:", userID);
    try {
        const email = await getEmailFromUserID(userID);
        console.log("Email retrieved:", email);
    } catch (error) {
        console.error("Error retrieving email:", error.message);
    }
    
    //console.log("Handling login...");
    
}

testLogin();
handleLogin('2')