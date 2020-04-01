# sound-chaser
A very work-in-progress tool for exporting and migrating playlists to and from Spotify. Currently uses node.js to retrieve an access token, and then provides a Python command line tool to export all 
playlists, and the metadata of songs in them, to a JSON file.

This is an excercise in learning some node.js and getting used to OAuth, and eventually doing some Electron and React.

**Future work:**
- Stop using Python and package the entire thing as an electron app
- Add a basic playlist-browsing interface and the option to only export certain playlists

**How to run:**
- [nvm](https://github.com/nvm-sh/nvm) `install` to get the right version of node
- [pyenv](https://github.com/pyenv/pyenv) `install` to get the right version of python
- `pip install -U pipenv "setuptools<45"` (working around [virtualenv issues](https://github.com/pypa/virtualenv/issues/1493)) to get pipenv
- `pipenv install` to install dependent packages
- `npm install` to install node packages
- Populate config.json with :
..- Your Spotify Developer client ID and client secret
..- Your Spotify user ID
..- Your desired callback URL (if running locally, http://localhost:8888/callback is fine)
- Start the OAuth component with `node login.js`
- Navigate to localhost:8888 and log in with your Spotify credentials (at this point, a Spotify API 
access token will be added to config.json)
- Run the Python script with `pipenv run python dump-playlists.py`
- Enjoy your huge JSON file


Node.js authorization code modified from code samples from:

https://github.com/spotify/web-api-auth-examples

https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
