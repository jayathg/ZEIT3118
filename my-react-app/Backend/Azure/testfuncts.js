const axios = require("axios").default;
const sql = require('mssql');

const config = {
    //gunners please alter this
    user: '???',
    password: '???',
    server: 'techsecuretaskforce.database.windows.net',
    port: 1111,
    database: 'zeit3118',
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
};

module.exports = async function (context, req) {
    if (req.method === "POST") {
        try {
            const userID = req.body.userID;
            const email = await getEmailFromUserID(userID);
            await sendMagicLink(email);
            context.res = {
                status: 200,
                body: "Magic link sent successfully"
            };
        } catch (error) {
            context.res = {
                status: 500,
                body: "Error: " + error.message
            };
        }
    } else {
        context.res = {
            status: 405,
            body: "Method not allowed"
        };
    }
};

async function getEmailFromUserID(userID) {
    try {
        // I do not know if this is correct
        await sql.connect(config);
        // I think this is right??!?!
        const request = new sql.Request();
        request.input('userID', sql.Int, userID);
        const result = await request.query(`SELECT email FROM ZEIT3118.[User] WHERE employeeID = @userID`);
        
        if (result.recordset.length === 0) {
            throw new Error("Invalid UserID");
        } else {
            return result.recordset[0].email;
        }
    } catch (error) {
        throw new Error("Error retrieving email from userID: " + error.message);
    } finally {
        await sql.close();
    }
}

async function sendMagicLink(email) {
    try {
        // migrated from login.js
        const options = {
            method: 'POST',
            url: 'https://dev-we3vguqrc7tyu1mr.us.auth0.com/passwordless/start',
            headers: {'content-type': 'application/json'},
            data: {
                client_id: '1nzOnOcVNNFCtzB7CxXV87MpTL6IGb97',
                client_secret: '-fumUNmMgoiPjVDC7dOo7rtMT-kM7QDkosQvDUdCxai5CfBYhASFEsv64R7R4FCO',
                connection: 'email',
                email: email,
                send: 'link',
                authParams: {
                    redirect_uri: 'https://techsecuretaskforce.azurewebsites.net/HomeAdminPage'
                }
            }
        };

        // Send the magic link
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
        throw new Error("Error sending magic link: " + error.message);
    }
}
