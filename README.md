# sound-chaser
A very work-in-progress tool for exporting and migrating playlists to and from Spotify. Currently uses node.js to retrieve an access token, and then provides a Python command line tool to export all 
playlists, and the songs in them, to a JSON file.

This is an excercise in learning some node.js, as well as building an application out of loosely coupled microsevices. 

Future work:
-Add RabbitMQ as a broker between the express interface and the Python scripts
-Store exported playlist info in MongoDB
-Create a docker-compose template and Dockerfiles for the node.js/express interface and the Python service


How to run:

-Populate config.json with :
    -Your Spotify Developer client ID and client secret
    -Your Spotify user ID
    -Your desired callback URL (if running locally, http://localhost:8888/callback is fine)

-Start the OAuth component with node login.js
-Navigate to localhost:8888 and log in with your Spotify credentials (at this point, a Spotify API 
access token will be added to config.json)
-Run the Python script with python dump-playlists.py
-Enjoy your huge JSON file

Node.js authorization code modified from code samples from:
https://github.com/spotify/web-api-auth-examples
https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow