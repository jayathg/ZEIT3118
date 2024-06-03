import { assert } from 'chai';
import { getUserID, verifyLogin } from '../Backend/js/databaseConn.js';
import { getEmailFromUserID, sendMagicLink } from '../Backend/js/login.js';

describe('databaseConn functions', () => {
    describe('getUserID function', () => {
        it('should retrieve user ID for email chippledipple@proton.me', async () => {
            const expectedEmail = 'chippledipple@proton.me';
            const expectedUserID = 2;
            const result = await getUserID(expectedEmail);
            console.log('Result from getUserID:', result);

            assert.strictEqual(result.success, true);
            assert.strictEqual(result.userID, expectedUserID);
        });

        it('should return an error message for invalid email', async () => {
            const invalidEmail = 'invalid@proton.me';

            const result = await getUserID(invalidEmail);
            console.log('Result from getUserID:', result);

            assert.strictEqual(result.success, false);
            assert.strictEqual(result.message, 'Invalid email');
        });
    });

    describe('verifyLogin function', () => {
        it('should verify login for user ID 2', async () => {
            const userID = 2;
            const expectedEmail = 'chippledipple@proton.me';

            const result = await verifyLogin(userID);
            console.log('Result from verifyLogin:', result);

            assert.strictEqual(result.success, true);
            assert.strictEqual(result.message, 'Login verified');
        });

        it('should return an error message for invalid user ID', async () => {
            const invalidUserID = 9999; // Use an ID that does not exist

            const result = await verifyLogin(invalidUserID);
            console.log('Result from verifyLogin:', result);

            assert.strictEqual(result.success, false);
            assert.strictEqual(result.message, 'Invalid UserID');
        });
    });
});

describe('login.js functions', () => {
    describe('getEmailFromUserID function', () => {
        it('should return email for valid userID', async () => {
            const userID = 2;
            const expectedEmail = 'chippledipple@proton.me';

            const email = await getEmailFromUserID(userID);
            console.log(`Returned email for userID ${userID}: ${email}`);
            assert.strictEqual(email, expectedEmail);
        });

        it('should throw error for invalid userID', async () => {
            const invalidUserID = 9999;

            try {
                const email = await getEmailFromUserID(invalidUserID);
                console.log(`Returned email for invalid userID ${invalidUserID}: ${email}`);
                assert.fail('Expected error was not thrown');
            } catch (error) {
                console.log(`Error message for invalid userID ${invalidUserID}: ${error.message}`);
                assert.strictEqual(error.message, 'Error retrieving email from userID: Invalid UserID');
            }
        });
    });
});