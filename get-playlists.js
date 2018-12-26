// get the credentials
var nconf = require('nconf')
nconf.file({ file: 'config.json' });

// create a Spotify client
var SpotifyWebApi = require('spotify-web-api-node');


// var spotifyApi = new SpotifyWebApi({
//   clientId: nconf.get('spotify:clientId'),
//   clientSecret: nconf.get('spotify:clientSecret')
// });

// Start a little local server that can receive Spotify's callback with the auth token
  /* Load the HTTP library */
  var http = require("http");

  /* Create an HTTP server to handle responses */

  http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }).listen(8888);

var spotifyApi = new SpotifyWebApi({
  redirectUri: ' http://localhost:8888/callback',
  clientId: nconf.get('spotify:clientId')
});

var scopes = ['user-read-private', 'user-read-email', 'playlist-read-private']


// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, 'get-playlists');

// log the URL
console.log(authorizeURL);

spotifyApi.clientCredentialsGrant().then(
  function (data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  function (err) {
    console.log('Something went wrong when retrieving an access token', err);
  }
);



// Get a user's playlists
spotifyApi.getUserPlaylists(nconf.get('spotify:userId'))
  .then(function (data) {
    console.log('Retrieved playlists', data.body);
  }, function (err) {
    console.log('Something went wrong!', err);
  });