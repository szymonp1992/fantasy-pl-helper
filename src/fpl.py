import requests
import json

# base url for all FPL API endpoints
base_url = 'https://fantasy.premierleague.com/api/'

# get data from bootstrap-static endpoint
data = requests.get(base_url+'bootstrap-static/').json()

# fetch only the elements and teams arrays
fpl = {'elements': data['elements'], 'teams': data['teams']}

# script that opens / creates fpl.json file and writes the selected data to this file
with open("fpl.json", "w") as f:
    json.dump(fpl, f)
