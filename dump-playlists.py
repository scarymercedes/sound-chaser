#!/usr/bin/env python3 -u

from pconf import Pconf
import json
import spotipy
import spotipy.util as util




# Get the config file for user ID and access token
Pconf.file('config.json', encoding='json')
config = Pconf.get()
userId = config['spotify']['userId']
token = config['spotify']['accessToken']

if token:
        sp = spotipy.Spotify(auth=token)
else:
        print("Can't get token for " + userId + "!")

def main():

        playlists = get_playlists()

        describe_playlists(playlists)

def get_playlists():
        results = sp.user_playlists(userId)
        playlists = results['items']
        while results['next']:
                results = sp.next(results)
                playlists.extend(results['items'])
        

        with open('playlists.json', 'w') as outfile:
                json.dump(playlists, outfile)
        print(json.dumps(playlists, sort_keys=True, indent=4))

        return playlists

def describe_playlists(playlists):
        for playlist in playlists:
                playlist['tracks'] = []
                results = sp.user_playlist(userId, playlist['id'],
                        fields="tracks,next")
                tracks = results['tracks']
                playlist['tracks'].append(tracks)
                while tracks['next']:
                        tracks = sp.next(tracks)
                        playlist['tracks'].append(tracks)

        with open('playlistsfull.json', 'w') as outfile:
                json.dump(playlists, outfile)
        print(json.dumps(playlists, sort_keys=True, indent=4))

        return playlists

def show_tracks(tracks, playlist):
    for i, item in enumerate(tracks['items']):
        track = item['track']
        print "   %d %32.32s %s" % (i, track['artists'][0]['name'],
            track['name'])

if __name__ == "__main__":
        # execute only if run as a script
        main()