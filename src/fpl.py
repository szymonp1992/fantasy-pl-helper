
import requests
import json

# base url for all FPL API endpoints
base_url = 'https://fantasy.premierleague.com/api/'

# get data from bootstrap-static endpoint
# r = requests.get(base_url+'bootstrap-static/').json()
fpl = json.dumps(requests.get(base_url+'bootstrap-static/').json())

# script that opens / creates data.json file and writes all fetched data from Premier League API to this file
file = open("fpl.json", "w")
file.write(str(fpl))

