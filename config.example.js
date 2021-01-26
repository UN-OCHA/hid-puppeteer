/**
 * Config object for testing HID Auth.
 */
module.exports = {
  // Point to your local HID API
  baseUrl: 'http://api.hid.vm',

  // Populate with a test user
  userName: '1@example.com',
  userPass: '123456789aA!',

  // Feel free to create this client in your local API, or use one that exists.
  response_type: 'token',
  client_id: 'test-client-id',
  client_secret: '0123456789abcdefghijklmnopqrstuvwxyz',
  redirect_uri: 'http://simple.test/login/callback',
  state: '12345',
};
