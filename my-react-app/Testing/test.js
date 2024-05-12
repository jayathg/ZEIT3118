import('chai').then(chai => {
        const assert = chai.assert;
        const expect = chai.expect;
        const should = chai.should();

        const databaseConn = require('../../Backend/js/databaseConn.js');
        const { login, magicLink, getUserID } = require('../../Backend/js/login.js'); // Added import statement for getUserID

        describe('getManagementApiToken', () => {
            it('should return a valid token', async () => {
                const token = await getManagementApiToken();
                console.log('Token:', token);
                expect(token).to.be.a('string');
                expect(token).to.have.lengthOf.above(0);
            });
        });

        describe('getUserID function', () => {
            it('should retrieve email for user ID 2', async () => {
                const expectedEmail = 'chippledipple@proton.me';
                const mockEmailResult = { success: true, email: expectedEmail };
                const result = await databaseConn.getUserID('2');
                console.log('Result from getUserID:', result);
                assert.strictEqual(result.success, true);
                assert.strictEqual(result.email, expectedEmail);
            });
        });

        describe('login function', () => {
            it('should post email and return response', async () => {
                const email = 'chippledipple@proton.me';
                const response = await login(email);
                console.log('Response from login:', response);
                assert.ok(response !== null); // Currently only checking not empty
                //<ADD MORE WHEN WE KNOW WHAT THIS SHOULD BE>
            });
        });

        describe('magicLink function', () => {
            it('should send magic link successfully', async () => {
                const email = "chippledipple@proton.me";
                const expectedResponse = { /* Mocked response from Auth0 */ };
                // Call the magicLink function
                await magicLink(email);

                // Add more logging or assertions here
            });
        });
});

