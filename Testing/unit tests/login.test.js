import { getManagementApiToken } from 'C:\\Users\\Chip\\Auth03118\\ZEIT3118\\js\\login.js'; // Update the path to your login.js file

test('getManagementApiToken function should return a valid token', async () => {
    // Act
    const token = await getManagementApiToken();

    // Dont have anything to assert just make sure its returning something kek
    console.log('Management API Token:', token);
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
});


describe('getUserID function', () => {
    test('should retrieve email for user ID 2', async () => {
        // Set up mock response for databaseConn.getUserID
        const expectedEmail = 'chippledipple@proton.me';
        const mockEmailResult = { success: true, email: expectedEmail };
        databaseConn.getUserID.mockResolvedValue(mockEmailResult);

        // Call the getUserID function
        const result = await databaseConn.getUserID('2');

        // Assertions
        expect(result.success).toBe(true);
        expect(result.email).toBe(expectedEmail);
    });
});

describe('login function', () => {
    test('should post email and return response', async () => {
        // Call the login function with the email
        const email = 'chippledipple@proton.me';
        const response = await login(email);
        // I dont know what this should be :)
        console.log(response);
        // Assertions
        expect(response).not.toBeNull(); // Currently only checking not empty
        //<ADD MORE WHEN WE KNOW WHAT THIS SHOULD BE>
    });
});

//skeleton test for magicLink() function 
const axios = require("axios");
const { magicLink } = require("./magicLink");
jest.mock("axios");
describe("magicLink function", () => {
  test("should send magic link successfully", async () => {
    const email = "chippledipple@proton.me";
    const expectedResponse = { /* Mocked response from Auth0 */ };
    // Call the magicLink function
    await magicLink(email);

    // Assertions
    // Add assertions based on the expected behavior
  });
//intentional error
  test("should handle error when sending magic link", async () => {
    const email = "chippledipple@proton.me";
    const expectedError = new Error("Failed to send magic link");
    axios.request.mockRejectedValue(expectedError);
    await magicLink(email);

    // Assertions
    // Add assertions based on the expected error handling
  });
});
