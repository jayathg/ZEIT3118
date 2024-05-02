import { getManagementApiToken } from 'C:\\Users\\Chip\\Auth03118\\ZEIT3118\\js\\login.js'; // Update the path to your login.js file

test('getManagementApiToken function should return a valid token', async () => {
    // Act
    const token = await getManagementApiToken();

    // Dont have anything to assert just make sure its returning something kek
    console.log('Management API Token:', token);
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
});
