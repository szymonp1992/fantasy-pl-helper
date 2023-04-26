from understatapi import UnderstatClient
import json

understat = UnderstatClient()
# get data for every league match involving Manchester United in 2019/20

team_match_data = json.dumps(understat.league(league="EPL").get_team_data(season="2023"))

file = open("understat.json", "w")
file.write(str(team_match_data))